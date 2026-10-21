import DeleteIcon from '@/assets/icons/delete-icon.svg?react';
import useDeleteSpendingRecordMutate from '@/domains/subscription/schedule/hooks/mutations/use-delete-spending-record-mutate';
import { useState } from 'react';
import ConfirmModal from '../../../../components/modal/confirm-modal';

interface DeleteSpendingRecordsButtonProps {
  selectedDate: Date;
  recordId: string;
}

function DeleteSpendingRecordsButton({
  selectedDate,
  recordId,
}: DeleteSpendingRecordsButtonProps) {
  const [modal, setModal] = useState(false);

  const { mutate: deleteSpendingReocrd } = useDeleteSpendingRecordMutate();

  return (
    <>
      <button
        className="hover:bg-background-black cursor-pointer rounded-full p-3 transition-colors duration-300"
        onClick={() => setModal(true)}
      >
        <DeleteIcon className="size-5 fill-[#E9ECEF]" />
      </button>

      <ConfirmModal
        cancelText="아니요"
        confirmText="네"
        description="삭제된 내역은 복구 할 수 없습니다"
        onOpenChange={() => setModal(false)}
        open={modal}
        title="구독 내역을 삭제하시겠어요?"
        onConfirm={() => deleteSpendingReocrd({ date: selectedDate, recordId })}
      />
    </>
  );
}

export default DeleteSpendingRecordsButton;
