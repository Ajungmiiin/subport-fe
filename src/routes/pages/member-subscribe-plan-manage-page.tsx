import PlanEditCard from '@/components/plan/plan-edit-card';
import useGetMemberSubscribeById from '@/hooks/queries/use-get-member-subscribe-by-id';
import useGetPlanList from '@/hooks/queries/use-get-plan-list';
import { useParams } from 'react-router-dom';

function MemberSubscribePlanManagePage() {
  const { memberSubscribeId, subscribeId } = useParams();

  const { data: subscribe, isPending: isGetMemberSubscribePending } =
    useGetMemberSubscribeById(memberSubscribeId!);

  const { data: plans, isPending: isGetPlansPending } = useGetPlanList(
    subscribeId!,
  );

  if (isGetMemberSubscribePending || isGetPlansPending) return <p>Loading</p>;
  if (!subscribe || !plans) return <p>데이터 없음</p>;

  const customPlans = plans.plans.filter(
    (plan) => plan.defaultProvided === false,
  );

  return (
    <>
      {customPlans.length <= 0 && (
        <p className="text-sub-font-black flex h-full flex-1 items-center justify-center">
          수정 가능한 멤버십이 존재하지 않습니다
        </p>
      )}
      {customPlans.length > 0 && (
        <ul className="space-y-4 pt-4">
          {customPlans.map((plan) => (
            <li key={plan.id}>
              <PlanEditCard plan={plan} subscribeId={subscribeId!} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MemberSubscribePlanManagePage;
