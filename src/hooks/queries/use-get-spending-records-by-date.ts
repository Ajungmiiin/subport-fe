import { getSpendingRecordByDate } from '@/api/calender';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

const useGetSpendingRecordsByDate = (selectedDate: Date | undefined) => {
  const dateKey = selectedDate && format(selectedDate, 'yyyy-MM-dd');
  return useQuery({
    queryKey: dateKey
      ? QUERY_KEY.spendingRecords.byDate(dateKey)
      : ['spending-records', 'by-date', 'none'],
    queryFn: () => getSpendingRecordByDate(selectedDate!),

    enabled: !!dateKey,
  });
};

export default useGetSpendingRecordsByDate;
