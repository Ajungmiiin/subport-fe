import type { PlanItem } from './api';

export type PlanSelectionItem = Pick<PlanItem, 'id' | 'name' | 'amountUnit'> & {
  price?: number;
};
