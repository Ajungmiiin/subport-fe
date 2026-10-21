import { getSpendingRecords } from '@/domains/subscription/schedule/api/schedule';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

function useGetSpendingRecords(yearMonth: Date) {
  return useQuery({
    queryKey: QUERY_KEY.spendingRecords.yearMonth(format(yearMonth, 'yyyy-MM')),
    queryFn: () => getSpendingRecords(yearMonth),
    placeholderData: (prev) => prev,
  });
}

export default useGetSpendingRecords;
