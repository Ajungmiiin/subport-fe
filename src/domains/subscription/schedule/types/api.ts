export type PaymentDates = Record<number, DailyPaymentStatus>;
export interface SubscriptionSummaryRes {
  totalAmount: number;
  amountDiffFromPreviousMonth: number;
  paymentDates: Record<number, DailyPaymentStatus>;
}

export interface DailyPaymentStatus {
  hasSpending: boolean;
  hasSubscription: boolean;
}

export interface SubscriptionRecordsResponse {
  completedRecords: CompletedRecord[];
  ongoingRecords: OngoingRecord[];
}

export interface SubscriptionRecord {
  subscriptionName: string;
  subscriptionLogoImageUrl: string;
  amount: number;
  period: number;
}

export type CompletedRecord = SubscriptionRecord & {
  spendingRecordId: number;
  memberSubscriptionId: null;
};

export type OngoingRecord = SubscriptionRecord & {
  spendingRecordId: null;
  memberSubscriptionId: number;
};
