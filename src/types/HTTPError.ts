export enum HTTPError {
  GENERAL_ERROR = 500,
  NOT_IMPLEMENTED_ERROR = 501,
  OBJECT_DOES_NOT_EXIST_ERROR = 550,
  FEATURE_NOT_SUPPORTED_ERROR = 585,

  REFUND_SESSION_OTHER_USER_ERROR = 551,
  CONCUR_CITY_UNKNOWN_ERROR = 553,
  CANNOT_DELETED_REFUNDED_SESSION = 555,

  PRICING_REQUEST_INVOICE_ERROR = 561,

  CYPHER_INVALID_SENSITIVE_DATA_ERROR = 555,

  EXISTING_TRANSACTION_ERROR = 570,

  SET_CHARGING_PROFILE_ERROR = 554,
  LIMIT_POWER_ERROR = 556,

  USER_EMAIL_ALREADY_EXIST_ERROR = 510,
  USER_EULA_ERROR = 520,
  USER_TAG_ID_ALREADY_USED_ERROR = 540,
  USER_NO_BADGE_ERROR = 570,

  USER_ACCOUNT_LOCKED_ERROR = 590,
  USER_ACCOUNT_ALREADY_ACTIVE_ERROR = 591,
  USER_ACCOUNT_PENDING_ERROR = 592,
  USER_ACCOUNT_BLOCKED_ERROR = 593,
  USER_ACCOUNT_INACTIVE_ERROR = 594,

  INVALID_CAPTCHA = 530,
  INVALID_TOKEN_ERROR = 540,
  CHARGER_WITH_NO_SITE_AREA_ERROR = 525,
  SITE_AREA_WITH_NO_SITE_ERROR = 525,
  USER_WITH_NO_SITE_ERROR = 525,

  BILLING_DELETE_ERROR = 510,

  CLEAR_CHARGING_PROFILE_NOT_SUCCESSFUL = 537,
  SMART_CHARGING_STILL_ACTIVE_FOR_SITE_AREA = 538,

  CAR_ALREADY_EXIST_ERROR = 591,
  CAR_ALREADY_EXIST_ERROR_DIFFERENT_USER = 592,
  USER_NOT_OWNER_OF_THE_CAR = 593,
  USER_ALREADY_ASSIGNED_TO_CAR = 594,
  NO_CAR_FOR_USER = 595,

  TRANSACTION_NOT_FROM_TENANT = 580,
  TRANSACTION_WITH_NO_OCPI_DATA = 581,
  TRANSACTION_CDR_ALREADY_PUSHED = 582,

  THREE_PHASE_CHARGER_ON_SINGLE_PHASE_SITE_AREA = 539,
}

export enum HTTPAuthError {
  ERROR = 560,
}

