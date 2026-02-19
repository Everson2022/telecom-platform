export const ACTIVATION_EVENTS = {
  MSISDN_RESERVED: 'activation.msisdn.reserved',
  MSISDN_RESERVATION_FAILED: 'activation.msisdn.reservation-failed',
  MSISDN_RELEASED: 'activation.msisdn.released',
  LINE_ACTIVATED: 'activation.line.activated',
  LINE_ACTIVATION_FAILED: 'activation.line.activation-failed',
  LINE_DEACTIVATED: 'activation.line.deactivated',
  LINE_SUSPENDED: 'activation.line.suspended',
  LINE_REACTIVATED: 'activation.line.reactivated',
} as const;
