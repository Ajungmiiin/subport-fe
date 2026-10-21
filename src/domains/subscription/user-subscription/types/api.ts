import type { AddUserSubscriptionValues } from '../schemas/add-user-subscription-schema';

export type UserSubscriptionSort =
  | 'type'
  | 'nextPaymentDate'
  | 'createdAt'
  | 'name';

export type UserSubscriptionParams =
  | { active: false }
  | { active: true; sortBy: UserSubscriptionSort };

export type UserSubscriptionItem = {
  id: number;
  name: string;
  logoImageUrl: string;
  amount: number;
  period: number;
  daysUntilPayment: number;
};

export type GroupUserSubscriptions = Record<string, UserSubscriptionItem[]>;

export type FlatUserSubscriptions = UserSubscriptionItem[];

export type UserSubscribeSummary = {
  currentMonthPaidAmount: number;
  currentMonthTotalAmount: number;
  paymentProgressPercent: number;
};

export type GroupedUserSubscriptionRes = {
  subscriptions: GroupUserSubscriptions;
};

export type FlatUserSubscriptionRes = {
  subscriptions: FlatUserSubscriptions;
};

export type SubscriptionsResBySort = {
  type: GroupedUserSubscriptionRes;
  nextPaymentDate: FlatUserSubscriptionRes;
  createdAt: FlatUserSubscriptionRes;
  name: FlatUserSubscriptionRes;
};

export type UserSubscriptionRes<S extends UserSubscriptionSort> =
  SubscriptionsResBySort[S];

export type AddUserSubscriptionReq = AddUserSubscriptionValues & {
  subscriptionId: number;
  price: string;
  amountUnit: 'KRW' | 'USD';
};

export type UserSubscriptionSpendingRecord = {
  amount: number;
  paymentDate: number;
};

export type UserSubscriptionActivateReq =
  | {
      reusePreviousInfo: true;
      startDate: string;
    }
  | {
      reusePreviousInfo: false;
      planId: number;
      startDate: string;
      memo: string;
      dutchPay: boolean;
      dutchPayAmount: number | null;
    };

export type UserSubscriptionByIdItem = {
  id: number;
  subscriptionId: number;
  name: string;
  logoImageUrl: string;
  planId: number;
  planName: string;
  planAmount: number;
  planAmountUnit: 'KRW' | 'USD';
  durationMonths: number;
  daysUntilPayment: number;
  daysSinceStart: number;
  paymentProgressPercent: number;
  paymentDate: number;
  reminderDaysBefore: number;
  active: boolean;
  dutchPay: boolean;
  actualPayment: number;
  spendingRecords: UserSubscriptionSpendingRecord[];
  memo: string;
};
