import { queryClient } from '@/shared/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation } from '@tanstack/react-query';
import { addCustomService } from '../../api/services';

function useAddCustomServiceMutate(
  callbacks?: useMutationCallbacks<{ id: number }>,
) {
  return useMutation({
    mutationFn: addCustomService,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY.services.all });
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useAddCustomServiceMutate;
