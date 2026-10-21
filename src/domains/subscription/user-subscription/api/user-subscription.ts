import { client } from '@/shared/api/client';
import type {
  UserSubscribeSummary,
  UserSubscriptionActivateReq,
  UserSubscriptionByIdItem,
  UserSubscriptionParams,
  UserSubscriptionRes,
} from '../types/api';
import { deleteComma } from '@/shared/lib/utils';
import type { AddUserSubscriptionValues } from '../schemas/add-user-subscription-schema';

export const addUserSubscription = async (
  subscribeInfo: AddUserSubscriptionValues & { subscriptionId: number },
) => {
  const response = await client.post<{ id: number }>(
    '/api/member-subscriptions',
    {
      ...subscribeInfo,
      dutchPayAmount: subscribeInfo.dutchPay
        ? Number(deleteComma(subscribeInfo.dutchPayAmount as string))
        : null,
    },
  );

  return response.data;
};

export const getUserSubscriptionMonthlySummary = async () => {
  const response = await client.get<UserSubscribeSummary>(
    '/api/member-subscriptions/monthly-summary',
  );

  return response.data;
};

export const getUserSubscriptions = async <P extends UserSubscriptionParams>(
  params: P,
) => {
  const sortBy = params.active ? params.sortBy : ('name' as const);

  const response = await client.get<UserSubscriptionRes<typeof sortBy>>(
    `/api/member-subscriptions?active=${encodeURIComponent(params.active)}&sortBy=${sortBy}`,
  );

  return response.data;
};

export const getUserSubscriptionById = async (userSubscribeId: string) => {
  const response = await client.get<UserSubscriptionByIdItem>(
    `/api/member-subscriptions/${userSubscribeId}`,
  );
  return response.data;
};

export const updateUserSubscriptionMemo = async ({
  userSubscriptionId,
  updatedMemo,
}: {
  userSubscriptionId: string;
  updatedMemo: string;
}) => {
  const response = await client.put<UserSubscriptionByIdItem>(
    `/api/member-subscriptions/${userSubscriptionId}/memo`,
    { memo: updatedMemo },
  );

  return response.data;
};

export const deleteUserSubscription = async ({
  userSubscriptionId,
}: {
  userSubscriptionId: string;
}) => {
  const response = await client.delete(
    `/api/member-subscriptions/${userSubscriptionId}`,
  );

  return response.data;
};

export const updatedUserSubscriptionDutchPay = async ({
  userSubscribeId,
  dutchPay,
  dutchPayAmount,
}: {
  userSubscribeId: string;
  dutchPay: boolean;
  dutchPayAmount: number | null;
}) => {
  const response = await client.put<UserSubscriptionByIdItem>(
    `/api/member-subscriptions/${userSubscribeId}/dutch-pay`,
    { dutchPay, dutchPayAmount },
  );

  return response.data;
};

export const updatedUserSubscriptionPlan = async ({
  subscriptionId,
  planId,
}: {
  subscriptionId: string;
  planId: string;
}) => {
  const response = await client.put<UserSubscriptionByIdItem>(
    `/api/member-subscriptions/${subscriptionId}/plan`,
    { planId: Number(planId) },
  );

  return response.data;
};

export const deactivateUserSubscription = async ({
  userSubscriptionId,
}: {
  userSubscriptionId: string;
}) => {
  const response = await client.put<UserSubscriptionByIdItem>(
    `/api/member-subscriptions/${userSubscriptionId}/deactivate`,
  );

  return response.data;
};

export const activateUserSubscription = async ({
  userSubscriptionId,
  userSubscriptionInfo,
}: {
  userSubscriptionId: string;
  userSubscriptionInfo: UserSubscriptionActivateReq;
}) => {
  const response = await client.put<UserSubscriptionByIdItem>(
    `/api/member-subscriptions/${userSubscriptionId}/activate`,
    userSubscriptionInfo,
  );

  return response.data;
};
