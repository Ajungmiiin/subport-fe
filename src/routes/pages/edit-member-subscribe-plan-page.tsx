import EditMemberSubscribePlanForm from '@/components/subscribe/member-subscribe/edit-member-subscribe-plan-form';
import useGetMemberSubscribeById from '@/hooks/queries/use-get-member-subscribe-by-id';
import { useParams } from 'react-router-dom';

function EditMemberSubscribePlanPage() {
  const { memberSubscribeId } = useParams();

  const { data: subscribe, isPending: isGetMemberSubscribePending } =
    useGetMemberSubscribeById(memberSubscribeId!);

  if (isGetMemberSubscribePending) return <p>Loading</p>;
  if (!subscribe) return <p>데이터 없음</p>;

  return (
    <EditMemberSubscribePlanForm
      subscribeId={subscribe.subscriptionId.toString()}
      prevPlanId={subscribe.planId.toString()}
    />
  );
}

export default EditMemberSubscribePlanPage;
