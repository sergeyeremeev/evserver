import AsyncTaskManager from '../../async-task/AsyncTaskManager';
import SchedulerTask from '../SchedulerTask';
import { TaskConfig } from '../../types/TaskConfig';

export default class AsyncTaskCheckTask extends SchedulerTask {
  public async run(name: string, config: TaskConfig): Promise<void> {
    // Check Async Manager
    await AsyncTaskManager.handleAsyncTasks();
  }
}
