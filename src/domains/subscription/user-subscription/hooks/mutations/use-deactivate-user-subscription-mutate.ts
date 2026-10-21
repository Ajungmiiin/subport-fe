import { deactivateUserSubscription } from '@/domains/subscription/user-subscription/api/user-subscription';
import type { UserSubscriptionByIdItem } from '@/domains/subscription/user-subscription/types/api';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function useDeactivateUserSubscriptionMutate(
  callbacks?: useMutationCallbacks<UserSubscriptionByIdItem>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deactivateUserSubscription,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
      queryClient.setQueryData(
        QUERY_KEY.userSubscription.byId(data.id.toString()),
        data,
      );
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.lists,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.spendingRecords.all,
      });

      queryClient.invalidateQueries({
        queryKey : QUERY_KEY.userSubscription.monthlySummary
      })
    },
  });
}

export default useDeactivateUserSubscriptionMutate;
