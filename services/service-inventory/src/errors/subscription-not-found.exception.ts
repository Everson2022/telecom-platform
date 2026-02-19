import { NotFoundException } from '@nestjs/common';

export class SubscriptionNotFoundException extends NotFoundException {
  constructor(identifier: string) {
    super(`Subscription not found: ${identifier}`);
  }
}
