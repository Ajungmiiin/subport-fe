import type { UserSubscriptionItem } from './api';

export type UserSubscriptionSection = {
  title?: string;
  items: UserSubscriptionItem[];
};

export type UserSubscriptionListView = {
  isEmpty: boolean;
  sections: UserSubscriptionSection[];
};
