export class ServiceLineResponseDto {
  id!: string;
  subscriptionId!: string;
  customerId!: string;
  msisdn!: string;
  iccid!: string;
  simType!: string;
  role!: string;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class FamilyMemberResponseDto {
  id!: string;
  familyGroupId!: string;
  customerId!: string;
  lineId!: string | null;
  role!: string;
  status!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class FamilyGroupResponseDto {
  id!: string;
  subscriptionId!: string;
  titularCustomerId!: string;
  maxMembers!: number;
  members!: FamilyMemberResponseDto[];
  createdAt!: Date;
  updatedAt!: Date;
}

export class SubscriptionResponseDto {
  id!: string;
  customerId!: string;
  planId!: string;
  offerId!: string;
  planType!: string;
  status!: string;
  paymentMethodId!: string | null;
  monthlyAmountCents!: number;
  currency!: string;
  lines!: ServiceLineResponseDto[];
  familyGroup!: FamilyGroupResponseDto | null;
  createdAt!: Date;
  updatedAt!: Date;
}
