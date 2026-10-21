import type { UserSubscriptionByIdItem } from '@/domains/subscription/user-subscription/types/api';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatedUserSubscriptionPlan } from '../../api/user-subscription';

function useUpdatedUserSubscriptionPlanMutate(
  callbacks?: useMutationCallbacks<UserSubscriptionByIdItem>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatedUserSubscriptionPlan,
    onSuccess: (data) => {
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
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdatedUserSubscriptionPlanMutate;
