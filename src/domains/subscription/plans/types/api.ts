export type PlanItem = {
  id: number;
  name: string;
  amount: number;
  amountUnit: 'KRW' | 'USD';
  durationMonths: number;
  defaultProvided: boolean;
};

export type PlanList = {
  planUrl: string | null;
  plans: PlanItem[];
};

export type AddPlanReq = {
  name: string;
  amount: number;
  amountUnit: 'KRW' | 'USD';
  durationMonths: number;
};
