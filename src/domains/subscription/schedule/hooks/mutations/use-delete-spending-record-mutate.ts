import { deleteSpendingRecord } from '@/domains/subscription/schedule/api/schedule';
import { queryClient } from '@/shared/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';

type DeleteSpendingRecordMutateType = {
  recordId: string;
  date: Date;
};

function useDeleteSpendingRecordMutate() {
  return useMutation({
    mutationFn: ({ recordId }: DeleteSpendingRecordMutateType) =>
      deleteSpendingRecord(recordId),
    onSuccess: (_, variables) => {
      const dateKey = format(variables.date, 'yyyy-MM-dd');
      const monthKey = format(variables.date, 'yyyy-MM');

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.spendingRecords.byDate(dateKey),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.spendingRecords.yearMonth(monthKey),
      });
    },
  });
}

export default useDeleteSpendingRecordMutate;
