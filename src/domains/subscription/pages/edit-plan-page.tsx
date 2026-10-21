import PlanForm from '@/domains/subscription/plans/components/plan-form';
import { Spinner } from '@/components/ui/spinner';
import useUpdatePlanMutate from '@/domains/subscription/plans/hooks/mutate/use-update-plan-mutate';
import useGetPlan from '@/domains/subscription/plans/hooks/queries/use-get-plan';
import {
  deleteComma,
  formatKRWInput,
  formatUSDInput,
} from '@/shared/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import type { PlanFormValues } from '@/domains/subscription/plans/schemas/plan-form-schema';
import PageTitle from '@/components/ui/page-title';

function EditPlanPage() {
  const navigate = useNavigate();
  const { subscribeId, planId } = useParams();

  const { data: plan, isPending: isGetPlanDataPending } = useGetPlan(planId!);
  const { mutate: updatePlan } = useUpdatePlanMutate({
    onSuccess: () => {
      toast.success('멤버십이 수정되었습니다', { position: 'bottom-center' });

      if (window.history.state?.idx > 0) {
        navigate(-1);
      } else {
        navigate(`/service/${subscribeId}/plan/edit`, { replace: true });
      }
    },
  });

  const onSubmit = (formData: PlanFormValues) => {
    updatePlan({
      ...formData,
      planId: Number(planId),
      subscriptionId: Number(subscribeId),
      amount: Number(deleteComma(formData.amount)),
      durationMonths: Number(formData.durationMonths),
    });
  };

  if (isGetPlanDataPending)
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );

  if (!plan) return <div>멤버십 정보를 불러오지 못했습니다.</div>;

  return (
    <>
      <PageTitle>
        멤버십 정보를 <br /> 입력해주세요
      </PageTitle>
      <PlanForm
        amount={
          plan.amountUnit === 'KRW'
            ? formatKRWInput(plan.amount.toString())
            : formatUSDInput(plan.amount.toString())
        }
        amountUnit={plan.amountUnit as 'KRW' | 'USD'}
        durationMonths={plan.durationMonths.toString()}
        name={plan.name}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default EditPlanPage;
