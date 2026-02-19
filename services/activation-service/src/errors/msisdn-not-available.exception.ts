import { ConflictException } from '@nestjs/common';

export class MsisdnNotAvailableException extends ConflictException {
  constructor(dddCode: string) {
    super(`No MSISDN available for DDD ${dddCode}`);
  }
}
