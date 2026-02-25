import type { PlanItem } from '@/types/plan';
import { useState } from 'react';
import EditIcon from '@/assets/icons/edit-icon.svg?react';
import DeleteIcon from '@/assets/icons/delete-icon.svg?react';
import { Link } from 'react-router-dom';
import ConfirmModal from '../modal/confirm-modal';
import useDeletePlanMutate from '@/hooks/mutations/use-delete-plan-mutate';
import { toast } from 'sonner';

type PlanEditCardProps = {
  plan: PlanItem;
  subscribeId: string;
};

function PlanEditCard({ plan, subscribeId }: PlanEditCardProps) {
  const [modal, setModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handleCloseModal = () => {
    setModal(false);
  };

  const { mutate: deletePlan } = useDeletePlanMutate({
    onSuccess: () => {
      toast.success('멤버십이 삭제되었습니다', { position: 'bottom-center' });
      setModal(false);
    },
  });

  return (
    <>
      <div key={plan.id}>
        <div className="bg-box-black flex flex-col gap-4 rounded-2xl p-5">
          <div>
            <p className="text-lg font-semibold">{plan.name}</p>
            <span className="text-sub-font-black text-sm">
              {`${plan.durationMonths > 1 ? `${plan.durationMonths}개월` : '월'} ${Number(plan.amount).toLocaleString()}${plan.amountUnit === 'KRW' ? '₩' : '$'}`}
            </span>
          </div>
          <div className="text-sub-font-black flex items-center gap-2">
            <Link
              to={`/subscribe/${subscribeId}/plan/edit/${plan.id}`}
              className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
            >
              <span>수정하기</span>
              <EditIcon className="size-5" />
            </Link>
            <button
              onClick={() => {
                setModal(true);
                setSelectedPlanId(plan.id);
              }}
              className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
            >
              <span>삭제하기</span>

              <DeleteIcon className="size-5" />
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <ConfirmModal
          onConfirm={() => {
            if (!selectedPlanId) return;

            deletePlan({
              planId: selectedPlanId,
              subscribeId: Number(subscribeId),
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

export default PlanEditCard;
