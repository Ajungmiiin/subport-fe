import useGetPlanList from '@/hooks/queries/use-get-plan-list';
import EditIcon from '@/assets/icons/edit-icon.svg?react';
import DeleteIcon from '@/assets/icons/delete-icon.svg?react';
import { Link, useParams } from 'react-router-dom';
import useDeletePlanMutate from '@/hooks/mutations/use-delete-plan-mutate';
import { useState } from 'react';

import ConfirmModal from '@/components/modal/confirm-modal';

function PlanEditorPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const { subscribeId } = useParams();
  const { data: plans, isPending: isGetPlanListPending } = useGetPlanList(
    subscribeId as string,
  );

  const { mutate: deletePlan } = useDeletePlanMutate({
    onSuccess: () => {
      setModal(false);
    },
  });

  if (isGetPlanListPending) return <div></div>;

  const customPlans = plans?.plans.filter(
    (plan) => plan.defaultProvided === false,
  );

  const handleCloseModal = () => {
    setModal(false);
  };

  return (
    <>
      {customPlans && customPlans.length > 0 && (
        <ul className="flex flex-col gap-4">
          {customPlans?.map((plan) => (
            <li key={plan.id}>
              <div className="bg-box-black flex flex-col gap-4 rounded-2xl p-5">
                <div>
                  <p className="text-lg font-semibold">{plan.name}</p>
                  <span className="text-sub-font-black text-sm">
                    {`${plan.durationMonths > 1 ? `${plan.durationMonths}개월` : '월'} ${Number(plan.amount).toLocaleString()}${plan.amountUnit === 'KRW' ? '₩' : '$'}`}
                  </span>
                </div>
                <div className="text-sub-font-black flex items-center gap-2">
                  <Link
                    to={`${plan.id}`}
                    className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
                  >
                    <span>수정하기</span>
                    <EditIcon className="fill-sub-font-black size-5" />
                  </Link>
                  <button
                    onClick={() => {
                      setModal(true);
                      setSelectedPlanId(plan.id);
                    }}
                    className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
                  >
                    <span>삭제하기</span>

                    <DeleteIcon className="fill-sub-font-black size-5" />
                  </button>
                </div>
              </div>
            </li>
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

export default PlanEditorPage;
