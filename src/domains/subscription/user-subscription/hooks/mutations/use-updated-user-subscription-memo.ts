import { queryClient } from '@/shared/providers/query-provider';
import { updateUserSubscriptionMemo } from '@/domains/subscription/user-subscription/api/user-subscription';
import type { UserSubscriptionByIdItem } from '@/domains/subscription/user-subscription/types/api';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useUpdatedUserSubscriptionMemo(
  callbacks?: useMutationCallbacks<UserSubscriptionByIdItem>,
) {
  return useMutation({
    mutationFn: updateUserSubscriptionMemo,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);

      queryClient.setQueryData(
        QUERY_KEY.userSubscription.byId(data.id.toString()),
        data,
      );
    },
  });
}

export default useUpdatedUserSubscriptionMemo;
