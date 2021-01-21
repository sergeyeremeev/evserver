import { OICPPushEvseStatusTaskConfig, TaskConfig } from '../../../types/TaskConfig';

import Constants from '../../../utils/Constants';
import LockingHelper from '../../../locking/LockingHelper';
import LockingManager from '../../../locking/LockingManager';
import Logging from '../../../utils/Logging';
import OICPClientFactory from '../../../client/oicp/OICPClientFactory';
import OICPEndpoint from '../../../types/oicp/OICPEndpoint';
import OICPEndpointStorage from '../../../storage/mongodb/OICPEndpointStorage';
import { OICPRegistrationStatus } from '../../../types/oicp/OICPRegistrationStatus';
import { OICPRole } from '../../../types/oicp/OICPRole';
import SchedulerTask from '../../SchedulerTask';
import { ServerAction } from '../../../types/Server';
import Tenant from '../../../types/Tenant';
import TenantComponents from '../../../types/TenantComponents';
import Utils from '../../../utils/Utils';

const MODULE_NAME = 'OICPPushEvseStatusTask';

export default class OICPPushEvseStatusTask extends SchedulerTask {

  async processTenant(tenant: Tenant, config: TaskConfig): Promise<void> {
    try {
      // Check if OICP component is active
      if (Utils.isTenantComponentActive(tenant, TenantComponents.OICP)) {
        // Get all available endpoints
        const oicpEndpoints = await OICPEndpointStorage.getOicpEndpoints(tenant.id, { role: OICPRole.CPO }, Constants.DB_PARAMS_MAX_LIMIT);
        for (const oicpEndpoint of oicpEndpoints.result) {
          await this.processOICPEndpoint(tenant, oicpEndpoint, config);
        }
      }
    } catch (error) {
      // Log error
      Logging.logActionExceptionMessage(tenant.id, ServerAction.OICP_PUSH_EVSE_STATUSES, error);
    }
  }

  private async processOICPEndpoint(tenant: Tenant, oicpEndpoint: OICPEndpoint, config: OICPPushEvseStatusTaskConfig): Promise<void> {
    // Get the lock
    const oicpLock = await LockingHelper.createOICPPatchCpoEvseStatusesLock(tenant.id, oicpEndpoint);
    if (oicpLock) {
      try {
        // Check if OICP endpoint is registered
        if (oicpEndpoint.status !== OICPRegistrationStatus.REGISTERED) {
          Logging.logDebug({
            tenantID: tenant.id,
            module: MODULE_NAME, method: 'processOICPEndpoint',
            action: ServerAction.OICP_PUSH_EVSE_STATUSES,
            message: `The OICP Endpoint ${oicpEndpoint.name} is not registered. Skipping the oicpendpoint.`
          });
          return;
        }
        if (!oicpEndpoint.backgroundPatchJob) {
          Logging.logDebug({
            tenantID: tenant.id,
            module: MODULE_NAME, method: 'processOICPEndpoint',
            action: ServerAction.OICP_PUSH_EVSE_STATUSES,
            message: `The OICP Background Job for Endpoint ${oicpEndpoint.name} is inactive.`
          });
          return;
        }
        Logging.logInfo({
          tenantID: tenant.id,
          module: MODULE_NAME, method: 'processOICPEndpoint',
          action: ServerAction.OICP_PUSH_EVSE_STATUSES,
          message: `The push EVSE Statuses process for endpoint ${oicpEndpoint.name} is being processed`
        });
        // Build OICP Client
        const oicpClient = await OICPClientFactory.getCpoOicpClient(tenant, oicpEndpoint);
        // Send EVSE statuses
        const sendEVSEStatusResult = await oicpClient.sendEVSEStatuses(!Utils.isUndefined(config.processAllEVSEs) ? config.processAllEVSEs : false);
        Logging.logInfo({
          tenantID: tenant.id,
          module: MODULE_NAME, method: 'processOICPEndpoint',
          action: ServerAction.OICP_PUSH_EVSE_STATUSES,
          message: `The push EVSE Statuses process for endpoint ${oicpEndpoint.name} is completed (Success: ${sendEVSEStatusResult.success}/Failure: ${sendEVSEStatusResult.failure})`
        });
      } catch (error) {
        // Log error
        Logging.logActionExceptionMessage(tenant.id, ServerAction.OICP_PUSH_EVSE_STATUSES, error);
      } finally {
        // Release the lock
        await LockingManager.release(oicpLock);
      }
    }
  }
}

