import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation } from '@tanstack/react-query';
import { deleteProfile } from '../../api/account';

function useDeleteProfileMutate(callbacks?: useMutationCallbacks) {
  return useMutation({
    mutationFn: deleteProfile,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useDeleteProfileMutate;
