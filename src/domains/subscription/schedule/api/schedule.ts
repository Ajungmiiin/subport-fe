import { format } from 'date-fns';
import { client } from '../../../../shared/api/client';
import type {
  SubscriptionRecordsResponse,
  SubscriptionSummaryRes,
} from '../types/api';

export const getSpendingRecords = async (yearMonth: Date) => {
  const yearMonthDate = format(yearMonth, 'yyyy-MM');
  const response = await client.get<SubscriptionSummaryRes>(
    `/api/spending-records/summary?yearMonth=${yearMonthDate}`,
  );

  return response.data;
};

export const getSpendingRecordByDate = async (date: Date) => {
  const localeDate = format(date, 'yyyy-MM-dd');

  const response = await client.get<SubscriptionRecordsResponse>(
    `/api/spending-records?date=${localeDate}`,
  );

  return response.data;
};

export const deleteSpendingRecord = async (recordId: string) => {
  const response = await client.delete(`/api/spending-records/${recordId}`);

  return response.data;
};
