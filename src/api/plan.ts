import type { PlanItem, AddPlanReq, PlanList } from '@/types/plan';
import { client } from './client';

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
  subscribeId,
}: AddPlanReq & { subscribeId: number }) => {
  const response = await client.post<{ id: number }>(
    `/api/subscriptions/${subscribeId}/plans`,
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
}: AddPlanReq & { planId: number; subscribeId: number }) => {
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
  subscribeId: number;
}) => {
  const response = await client.delete(`/api/plans/${ids.planId}`);

  return response;
};
