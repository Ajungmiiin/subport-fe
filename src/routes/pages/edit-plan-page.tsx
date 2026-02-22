import PlanForm, { type PlanFormValues } from '@/components/plan/plan-form';
import { Spinner } from '@/components/ui/spinner';
import useUpdatePlanMutate from '@/hooks/mutations/use-update-plan-mutate';
import useGetPlan from '@/hooks/queries/use-get-plan';
import { deleteComma, formatKRWInput, formatUSDInput } from '@/lib/utils';
import { useNavigate, useParams } from 'react-router-dom';

function EditPlanPage() {
  const navigate = useNavigate();
  const { subscribeId, planId } = useParams();

  const { data: plan, isPending: isGetPlanDataPending } = useGetPlan(planId!);
  const { mutate: updatePlan } = useUpdatePlanMutate({
    onSuccess: () => {
      if (window.history.state?.idx > 0) {
        navigate(-1);
      } else {
        navigate(`/subscribe/${subscribeId}/plan/edit`, { replace: true });
      }
    },
  });

  const onSubmit = (formData: PlanFormValues) => {
    updatePlan({
      ...formData,
      planId: Number(planId),
      subscribeId: Number(subscribeId),
      amount: Number(deleteComma(formData.amount)),
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
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        멤버십 정보를 입력해주세요
      </p>
      <PlanForm
        amount={
          plan.amountUnit === 'KRW'
            ? formatKRWInput(plan.amount.toString())
            : formatUSDInput(plan.amount.toString())
        }
        amountUnit={plan.amountUnit as 'KRW' | 'USD'}
        durationMonths={plan.durationMonths}
        name={plan.name}
        onSubmit={onSubmit}
      />
    </>
  );
}

export default EditPlanPage;
