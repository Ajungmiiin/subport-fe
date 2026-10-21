import PlanForm from '@/domains/subscription/plans/components/plan-form';
import PageTitle from '@/components/ui/page-title';

import { deleteComma } from '@/shared/lib/utils';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import type { PlanFormValues } from '../plans/schemas/plan-form-schema';
import useAddCustomPlan from '@/domains/subscription/plans/hooks/mutate/use-add-custom-plan-mutate';

function AddPlanPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { mutate: addPlan, isPending: isAddPlanPending } = useAddCustomPlan({
    onSuccess: () => {
      toast.success('멤버십이 등록되었습니다', { position: 'bottom-center' });
      navigate(-1);
    },
  });

  const onSubmit = (formData: PlanFormValues) => {
    addPlan({
      ...formData,
      subscriptionId: Number(serviceId),
      amount: Number(deleteComma(formData.amount)),
      durationMonths: Number(formData.durationMonths),
    });
  };

  return (
    <>
      <PageTitle>
        멤버십 정보를 <br />
        입력해주세요
      </PageTitle>
      <PlanForm onSubmit={onSubmit} disabled={isAddPlanPending} />
    </>
  );
}

export default AddPlanPage;
