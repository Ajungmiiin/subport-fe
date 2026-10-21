import { deleteCustomSubscriptionService } from '@/domains/subscription/services/api/services';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { SubscriptionServiceItem } from '../../types/api';

function useDeleteCustomServiceMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomSubscriptionService,
    onSuccess: (_, variables) => {
      callbacks?.onSuccess?.(_);

      const prevSubscriptionServices = queryClient.getQueryData<
        SubscriptionServiceItem[]
      >(QUERY_KEY.services.lists);

      if (!prevSubscriptionServices)
        throw new Error('구독 목록을 불러오지 못했습니다');

      queryClient.removeQueries({
        queryKey: QUERY_KEY.services.byId(variables),
      });

      queryClient.setQueryData(QUERY_KEY.services.lists, () => {
        return prevSubscriptionServices.filter(
          (service) => service.id !== Number(variables),
        );
      });
    },

    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}

export default useDeleteCustomServiceMutate;
