import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getUserSubscriptionMonthlySummary } from '../api/user-subscription';

function useGetUserSubscriptionMonthlySummary() {
  return useQuery({
    queryKey: QUERY_KEY.userSubscription.monthlySummary,
    queryFn: getUserSubscriptionMonthlySummary,
  });
}

export default useGetUserSubscriptionMonthlySummary;
