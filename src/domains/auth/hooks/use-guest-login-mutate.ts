import { guestLogin } from '@/domains/auth/api/auth';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation } from '@tanstack/react-query';

function useGuestLoginMutate(
  callbacks?: useMutationCallbacks<{ accessToken: string }>,
) {
  return useMutation({
    mutationFn: guestLogin,
    onSuccess: (data) => {
      callbacks?.onSuccess?.(data);
    },
    onError: () => {
      console.log('error');
    },
  });
}

export default useGuestLoginMutate;
