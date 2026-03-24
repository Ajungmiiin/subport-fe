import { sendUserFeedback } from '@/api/subport';
import type { useMutationCallbacks } from '@/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useSendFeedBacksMutate(callbacks?: useMutationCallbacks) {
  return useMutation({
    mutationFn: sendUserFeedback,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useSendFeedBacksMutate;
