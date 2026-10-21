import { Outlet, useParams } from 'react-router-dom';
import useGetUserSubscriptionById from '../../hooks/queries/use-get-user-subscription-by-id';
import PageLoader from '@/components/ui/page-loader';

function UserSubscriptionEditLayout() {
  const { userSubscribeId } = useParams();
  const { data: userSubscription, isPending } = useGetUserSubscriptionById(
    userSubscribeId!,
  );

  if (isPending) return <PageLoader label="구독 정보를 불러오는 중..." />;

  if (!userSubscription) return <p>데이터 없음</p>;
  return <Outlet context={{ userSubscription }} />;
}

export default UserSubscriptionEditLayout;
