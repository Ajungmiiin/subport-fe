import { updatedMyAccount } from '@/domains/account/api/account';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { MyAccountRes, MyProfileRes } from '../../types/api';

function useUpdatedMyAccountMutate(
  callbacks?: useMutationCallbacks<MyAccountRes>,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatedMyAccount,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY.my.account, data);

      const prevMyProfile = queryClient.getQueryData<MyProfileRes>(
        QUERY_KEY.my.profile,
      );

      if (prevMyProfile) {
        queryClient.setQueryData<MyProfileRes>(QUERY_KEY.my.profile, {
          ...prevMyProfile,
          nickname: data.nickname,
        });
      }

      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdatedMyAccountMutate;
