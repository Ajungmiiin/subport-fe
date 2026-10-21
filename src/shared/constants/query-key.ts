import type { UserSubscriptionParams } from '@/domains/subscription/user-subscription/types/api';

export const QUERY_KEY = {
  services: {
    all: ['services'],
    lists: ['services', 'list'],
    search: (searchTerm: string) => ['services', 'list', searchTerm],
    byId: (id: string) => ['services', 'detail', id],
    types: ['services-type'],
  },

  plans: {
    list: (subscribeId: string) => ['plan', 'list', subscribeId],
    byId: (planId: string) => ['plan', planId],
  },

  userSubscription: {
    all: ['subscription', 'user-subscription'],
    lists: ['subscription', 'user-subscription', 'list'],
    list: (params: UserSubscriptionParams) => [
      'subscription',
      'user-subscription',
      'list',
      params,
    ],

    byId: (subscribeId: string) => [
      'subscription',
      'user-subscription',
      'detail',
      subscribeId,
    ],
    monthlySummary: ['subscription', 'user-subscription', 'monthly-summary'],
  },

  my: {
    profile: ['my', 'profile'],
    account: ['my', 'account'],
    reminderSettings: ['my', 'reminder-settings'],
  },

  spendingRecords: {
    all: ['spending-records'],
    yearMonth: (yearMonth: string) => ['spending-records', yearMonth],
    byDate: (date: string) => ['spending-records', 'by-date', date],
  },

  faq: {
    all: ['faq', 'all'],
  },
};
