import { addCustomSubscribe } from '@/api/subscribe';
import { queryClient } from '@/components/providers/query-provider';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useAddCustomSubscribeMutate(
  callbacks?: useMutationCallbacks<{ id: number }>,
) {
  return useMutation({
    mutationFn: addCustomSubscribe,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.subscriptions.all });
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useAddCustomSubscribeMutate;
