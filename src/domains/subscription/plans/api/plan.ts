import { client } from '@/shared/api/client';
import type { AddPlanReq, PlanItem, PlanList } from '../types/api';

export const getPlans = async (planId: string) => {
  const response = await client.get<PlanList>(
    `/api/subscriptions/${planId}/plans`,
  );

  return response.data;
};

export const getPlan = async (planId: string) => {
  const response = await client.get<PlanItem>(`/api/plans/${planId}`);

  return response.data;
};

export const addPlan = async ({
  amount,
  amountUnit,
  durationMonths,
  name,
  subscriptionId,
}: AddPlanReq & { subscriptionId: number }) => {
  const response = await client.post<{ id: number }>(
    `/api/subscriptions/${subscriptionId}/plans`,
    { amount: Number(amount), amountUnit, durationMonths, name },
  );

  return response.data;
};

export const updatePlan = async ({
  amount,
  amountUnit,
  durationMonths,
  name,
  planId,
}: AddPlanReq & { planId: number; subscriptionId: number }) => {
  const response = await client.put(`/api/plans/${planId}`, {
    amount: Number(amount),
    amountUnit,
    durationMonths,
    name,
  });

  return response.data;
};

export const deletePlan = async (ids: {
  planId: number;
  subscriptionId: number;
}) => {
  const response = await client.delete(`/api/plans/${ids.planId}`);

  return response;
};
