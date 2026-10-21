import { sendUserFeedback } from '@/domains/subport/api/subport';
import type { useMutationCallbacks } from '@/shared/types/mutate';
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
