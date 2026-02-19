export const SIM_EVENTS = {
  BATCH_IMPORTED: 'sim.batch.imported',
  ALLOCATED: 'sim.allocated',
  ALLOCATION_FAILED: 'sim.allocation-failed',
  DEALLOCATED: 'sim.deallocated',
  ACTIVATED: 'sim.activated',
  DEACTIVATED: 'sim.deactivated',
  SWAP_REQUESTED: 'sim.swap.requested',
  SWAP_COMPLETED: 'sim.swap.completed',
  SWAP_FAILED: 'sim.swap.failed',
} as const;

export interface SimBatchImportedPayload {
  batchId: string;
  supplier: string;
  fileName: string;
  simType: string;
  totalRecords: number;
  successCount: number;
  errorCount: number;
}

export interface SimAllocatedPayload {
  simCardId: string;
  iccid: string;
  orderId: string;
  customerId: string;
  simType: string;
}

export interface SimAllocationFailedPayload {
  orderId: string;
  customerId: string;
  simType: string;
  reason: string;
}

export interface SimDeallocatedPayload {
  simCardId: string;
  iccid: string;
}

export interface SimActivatedPayload {
  simCardId: string;
  iccid: string;
}

export interface SimDeactivatedPayload {
  simCardId: string;
  iccid: string;
}

export interface SimSwapRequestedPayload {
  swapRequestId: string;
  customerId: string;
  msisdn: string;
  oldSimId: string;
  newSimId: string;
  swapType: string;
  reason: string;
  orderId: string;
}

export interface SimSwapCompletedPayload {
  swapRequestId: string;
  customerId: string;
  msisdn: string;
  oldSimId: string;
  newSimId: string;
}
