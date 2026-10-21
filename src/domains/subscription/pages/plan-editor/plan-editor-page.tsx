import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import ConfirmModal from '@/components/modal/confirm-modal';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/shared/lib/error';
import useGetCustomPlanList from '../../plans/hooks/queries/use-get-custom-plan-list';
import CustomPlanEditCard from '@/domains/subscription/pages/plan-editor/components/custom-plan-edit-card';
import useDeleteCustomPlan from '@/domains/subscription/plans/hooks/mutate/use-delete-custom-plan';
import CustomPlanEditCardSkeleton from './components/custom-plan-edit-card-skeleton';

function PlanEditorPage() {
  const navigate = useNavigate();

  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const { serviceId } = useParams();
  const { data: customPlans, isPending: isGetPlanListPending } =
    useGetCustomPlanList(serviceId as string);

  const { mutate: deletePlan } = useDeleteCustomPlan({
    onSuccess: () => {
      toast.success('멤버십이 삭제되었습니다', { position: 'bottom-center' });
      setModal(false);
    },
    onError: (error) => {
      const errorMessage = getApiErrorMessage(error);

      toast.error(errorMessage, { position: 'bottom-center' });
    },
  });

  if (isGetPlanListPending) return <CustomPlanEditCardSkeleton />;

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      {customPlans && customPlans.length > 0 && (
        <ul className="flex flex-col gap-4">
          {customPlans?.map((plan) => (
            <CustomPlanEditCard
              plan={plan}
              key={plan.id}
              onEdit={() => {
                navigate(`${plan.id}`);
              }}
              onDelete={() => {
                setModal(true);
                setSelectedPlanId(plan.id);
              }}
            />
          ))}
        </ul>
      )}

      {!customPlans ||
        (customPlans.length <= 0 && (
          <p className="text-sub-font-black flex flex-1 items-center justify-center">
            직접 등록한 멤버십이 존재하지 않습니다.
          </p>
        ))}
      {modal && (
        <ConfirmModal
          onConfirm={() => {
            if (!selectedPlanId) return;

            deletePlan({
              planId: selectedPlanId,
              subscriptionId: Number(serviceId),
            });
          }}
          open={modal}
          onOpenChange={handleCloseModal}
          title="정말 삭제하시겠어요?"
          description="멤버십을 삭제하면 저장된 정보가 모두 사라집니다."
          cancelText="아니요"
          confirmText="네"
        />
      )}
    </>
  );
}

export default PlanEditorPage;
