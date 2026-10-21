import PlanSelectionList from '@/domains/subscription/plans/components/plan-selection-list';
import { Button } from '@/components/ui/button';
import useGetPlanList from '@/domains/subscription/plans/hooks/queries/use-get-plan-list';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import useUpdatedUserSubscriptionPlanMutate from '@/domains/subscription/user-subscription/hooks/mutations/use-updated-user-subscription-plan-mutate';

function EditUserSubscriptionPlanForm({
  subscribeId,
  prevPlanId,
}: {
  subscribeId: string;
  prevPlanId?: string;
}) {
  const { data: plans, isPending: isGetPlansPending } =
    useGetPlanList(subscribeId);

  const navigate = useNavigate();

  const [currentPlan, setCurrentPlan] = useState(prevPlanId);
  const { userSubscribeId } = useParams();
  const [disabled, setDisabled] = useState(true);

  const { mutate: updatePlan } = useUpdatedUserSubscriptionPlanMutate({
    onSuccess: () => {
      navigate(-1);

      toast.success('멤버십이 수정되었습니다.', {
        position: 'bottom-center',
      });
    },
  });

  const handleSelect = (selectPlanId: string) => {
    if (selectPlanId !== prevPlanId) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    setCurrentPlan(selectPlanId);
  };

  const handleClick = () => {
    if (currentPlan && userSubscribeId) {
      updatePlan({
        subscriptionId: userSubscribeId.toString(),
        planId: currentPlan,
      });
    }
  };

  return (
    <>
      <div className="scrollbar-hide flex-1 overflow-scroll">
        {!isGetPlansPending && plans && (
          <PlanSelectionList
            plans={plans.plans}
            value={currentPlan || prevPlanId}
            serviceId={subscribeId!}
            onSelect={(selectPlan) => handleSelect(selectPlan.id.toString())}
          />
        )}
      </div>
      <div className="rounded-t-2xl pt-4">
        <Button onClick={handleClick} disabled={disabled} className="w-full">
          저장하기
        </Button>
      </div>
    </>
  );
}

export default EditUserSubscriptionPlanForm;
