import { queryClient } from '@/shared/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation } from '@tanstack/react-query';
import { addUserSubscription } from '../api/user-subscription';

export const useAddUserSubscriptionMutate = (
  callbacks?: useMutationCallbacks,
) => {
  return useMutation({
    mutationFn: addUserSubscription,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.spendingRecords.all,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.lists,
      });
      callbacks?.onSuccess?.(data);
    },
  });
};
