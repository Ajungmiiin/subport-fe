import EditIcon from '@/assets/icons/edit-icon.svg?react';
import DeleteIcon from '@/assets/icons/delete-icon.svg?react';
import type { PlanItem } from '@/domains/subscription/plans/types/api';

type CustomPlanEditCardProps = {
  plan: PlanItem;
  onEdit: () => void;
  onDelete: () => void;
};

function CustomPlanEditCard({
  plan,
  onDelete,
  onEdit,
}: CustomPlanEditCardProps) {
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
            <button
              onClick={onEdit}
              className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
            >
              <span>수정하기</span>
              <EditIcon className="fill-icon-default size-5" />
            </button>
            <button
              onClick={onDelete}
              className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
            >
              <span>삭제하기</span>

              <DeleteIcon className="fill-icon-default size-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomPlanEditCard;
