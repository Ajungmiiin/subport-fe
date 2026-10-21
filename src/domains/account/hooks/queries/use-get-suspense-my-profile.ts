import { QUERY_KEY } from '@/shared/constants/query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getMyProfile } from '../../api/account';

function useGetSuspenseMyProfile() {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.my.profile,
    queryFn: getMyProfile,
  });
}

export default useGetSuspenseMyProfile;
