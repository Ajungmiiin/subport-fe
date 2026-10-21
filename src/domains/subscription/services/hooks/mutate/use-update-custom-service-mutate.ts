import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatedCustomService } from '../../api/services';

function useUpdateCustomServiceMutate(callbacks?: useMutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatedCustomService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.services.lists,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.services.byId(data.id.toString()),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEY.userSubscription.lists,
      });

      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdateCustomServiceMutate;
