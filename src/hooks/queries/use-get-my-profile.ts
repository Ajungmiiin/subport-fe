import { getMyProfile } from '@/api/profile';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetMyProfile() {
  return useQuery({
    queryKey: QUERY_KEY.my.profile,
    queryFn: getMyProfile,
  });
}

export default useGetMyProfile;
