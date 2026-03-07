import { deleteCustomSubscribe } from '@/api/subscribe';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { type subscribeItem } from '@/types/subscribe';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

function useDeleteCustomSubscribeMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomSubscribe,
    onSuccess: (_, variables) => {
      callbacks?.onSuccess?.(_);

      const prevSubscriptions = queryClient.getQueryData<subscribeItem[]>(
        QUERY_KEY.subscriptions.all,
      );

      if (!prevSubscriptions)
        throw new Error('구독 목록을 불러오지 못했습니다');

      queryClient.removeQueries({
        queryKey: QUERY_KEY.subscriptions.byId(variables),
      });

      queryClient.setQueryData(QUERY_KEY.subscriptions.all, () => {
        return prevSubscriptions.filter(
          (subscribe) => subscribe.id !== Number(variables),
        );
      });
    },

    onError: (error) => {
      if (isAxiosError(error)) {
        callbacks?.onError?.(error);
      }
    },
  });
}

export default useDeleteCustomSubscribeMutate;
