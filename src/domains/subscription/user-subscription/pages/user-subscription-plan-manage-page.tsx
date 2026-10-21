import ConfirmModal from '@/components/modal/confirm-modal';
import CustomPlanEditCard from '@/domains/subscription/pages/plan-editor/components/custom-plan-edit-card';
import useGetCustomPlanList from '@/domains/subscription/plans/hooks/queries/use-get-custom-plan-list';
import useDeleteCustomPlan from '@/domains/subscription/plans/hooks/mutate/use-delete-custom-plan';
import { getApiErrorMessage } from '@/shared/lib/error';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import CustomPlanEditCardSkeleton from '@/domains/subscription/pages/plan-editor/components/custom-plan-edit-card-skeleton';

function UserSubscriptionPlanManagePage() {
  const navigate = useNavigate();
  const { subscribeId } = useParams();
  const [modal, setModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const { data: customPlans, isPending: isGetCustomPlansPending } =
    useGetCustomPlanList(subscribeId!);

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

  if (isGetCustomPlansPending) return <CustomPlanEditCardSkeleton />;
  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      {customPlans && customPlans.length > 0 && (
        <ul className="space-y-4 pt-4">
          {customPlans.map((plan) => (
            <li key={plan.id}>
              <CustomPlanEditCard
                plan={plan}
                key={plan.id}
                onEdit={() => {
                  navigate(`/service/${subscribeId}/plan/edit/${plan.id}`);
                }}
                onDelete={() => {
                  setModal(true);
                  setSelectedPlanId(plan.id);
                }}
              />
            </li>
          ))}
        </ul>
      )}

      {!customPlans ||
        (customPlans.length <= 0 && (
          <p className="text-sub-font-black flex h-full flex-1 items-center justify-center">
            수정 가능한 멤버십이 존재하지 않습니다
          </p>
        ))}

      {modal && (
        <ConfirmModal
          onConfirm={() => {
            if (!selectedPlanId) return;

            deletePlan({
              planId: selectedPlanId,
              subscriptionId: Number(subscribeId),
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

export default UserSubscriptionPlanManagePage;
