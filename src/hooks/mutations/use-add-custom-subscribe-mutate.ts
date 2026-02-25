import { addCustomSubscribe } from '@/api/subscribe';
import { queryClient } from '@/components/providers/query-provider';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import type { subscribeItem } from '@/types/subscribe';
import { useMutation } from '@tanstack/react-query';

function useAddCustomSubscribeMutate(
  callbacks?: useMutationCallbacks<{ id: number }>,
) {
  return useMutation({
    mutationFn: addCustomSubscribe,
    onSuccess: (data, variables) => {
      const prevSubscriptions = queryClient.getQueryData<subscribeItem[]>(
        QUERY_KEY.subscriptions.all,
      );
      if (!prevSubscriptions) return;

      queryClient.setQueryData<subscribeItem[]>(QUERY_KEY.subscriptions.all, [
        {
          id: data.id,
          name: variables.name,
          logoImageUrl: URL.createObjectURL(variables.image as File),
          defaultProvided: false,
        },
        ...prevSubscriptions,
      ]);
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useAddCustomSubscribeMutate;
