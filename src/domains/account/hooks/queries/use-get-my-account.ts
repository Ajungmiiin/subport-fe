import { getMyAccount } from '@/domains/account/api/account';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetMyAccount() {
  return useQuery({
    queryKey: QUERY_KEY.my.account,
    queryFn: getMyAccount,
  });
}

export default useGetMyAccount;
