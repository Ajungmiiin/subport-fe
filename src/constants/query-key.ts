import type { MemberSubscriptionsParams } from '@/types/subscribe';

export const QUERY_KEY = {
  subscriptions: {
    all: ['subscribe'],
    search: (searchTerm: string) => ['subscribe', searchTerm],
    byId: (id: string) => ['subscribe', id],
    types: ['subscribe', 'type'],
  },

  plans: {
    list: (subscribeId: string) => ['plan', 'list', subscribeId],
    byId: (planId: string) => ['plan', planId],
  },

  memberSubscriptions: {
    all: (params: MemberSubscriptionsParams) => [
      'member-subscriptions',
      params,
    ],
    byId: (subscribeId: string) => ['member-subscriptions', subscribeId],
  },

  my: {
    profile: ['my', 'profile'],
    account: ['my', 'account'],
    reminderSettings: ['my', 'reminder-settings'],
  },
};
