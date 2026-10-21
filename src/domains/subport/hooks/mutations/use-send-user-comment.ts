import { sendUserComment } from '@/domains/subport/api/subport';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useSendUserComment(callbacks?: useMutationCallbacks) {
  return useMutation({
    mutationFn: sendUserComment,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
    },
  });
}

export default useSendUserComment;
