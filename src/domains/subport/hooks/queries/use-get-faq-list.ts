import { getFaqList } from '@/domains/subport/api/subport';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetFaqList() {
  return useQuery({
    queryKey: QUERY_KEY.faq.all,
    queryFn: getFaqList,
  });
}

export default useGetFaqList;
