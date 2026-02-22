import type { PlanFormValues } from '@/components/plan/plan-form';
import PlanForm from '@/components/plan/plan-form';

import useAddPlanMutate from '@/hooks/mutations/use-add-plan-mutate';
import { deleteComma } from '@/lib/utils';

import { useNavigate, useParams } from 'react-router-dom';

function AddPlanPage() {
  const { subscribeId } = useParams();
  const navigate = useNavigate();
  const { mutate: addPlan, isPending: isAddPlanPending } = useAddPlanMutate({
    onSuccess: () => {
      navigate(-1);
    },
  });

  const onSubmit = (formData: PlanFormValues) => {
    addPlan({
      ...formData,
      subscribeId: Number(subscribeId),
      amount: Number(deleteComma(formData.amount)),
    });
  };

  return (
    <>
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        멤버십 정보를 입력해주세요
      </p>
      <PlanForm onSubmit={onSubmit} disabled={isAddPlanPending} />
    </>
  );
}

export default AddPlanPage;
