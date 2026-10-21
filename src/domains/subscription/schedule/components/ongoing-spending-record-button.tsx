import { EllipsisVertical } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../components/ui/popover';

import EditIcon from '@/assets/icons/edit-icon.svg?react';
import ReloadIcon from '@/assets/icons/reload-icon.svg?react';
import { Link } from 'react-router-dom';
import useDeactivateUserSubscriptionMutate from '@/domains/subscription/user-subscription/hooks/mutations/use-deactivate-user-subscription-mutate';
import { useState } from 'react';
import { queryClient } from '../../../../shared/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import { format } from 'date-fns';
import { toast } from 'sonner';
import ConfirmModal from '../../../../components/modal/confirm-modal';

interface OngoingSpendingRecordButtonProps {
  userSubscribeId: string;
  selectedDate: Date;
}

function OngoingSpendingRecordButton({
  userSubscribeId,
  selectedDate,
}: OngoingSpendingRecordButtonProps) {
  const [modal, setModal] = useState(false);
  const { mutate: deactivateUserSubscription } =
    useDeactivateUserSubscriptionMutate({
      onSuccess: () => {
        const dateKey = format(selectedDate, 'yyyy-MM-dd');
        const monthKey = format(selectedDate, 'yyyy-MM');

        queryClient.invalidateQueries({
          queryKey: QUERY_KEY.spendingRecords.byDate(dateKey),
        });

        queryClient.invalidateQueries({
          queryKey: QUERY_KEY.spendingRecords.yearMonth(monthKey),
        });

        toast.success('구독이 비활성화 되었습니다', {
          position: 'bottom-center',
        });
      },
    });

  return (
    <>
      {
        <Popover>
          <PopoverTrigger asChild>
            <button className="hover:bg-background-black cursor-pointer rounded-full p-3 transition-colors duration-300">
              <EllipsisVertical />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="end"
            className="bg-box-black w-40 overflow-hidden rounded-lg border-none p-0 text-white drop-shadow-xl"
          >
            <Link
              to={`/user-subscription/${userSubscribeId}`}
              className="hover:bg-background-black/50 flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold transition-colors"
            >
              <span>상세보기</span>
              <EditIcon className="fill-white" />
            </Link>
            <button
              type="button"
              onClick={() => setModal(true)}
              className="hover:bg-background-black/50 flex w-full cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold transition-colors"
            >
              <span>비활성화하기</span>
              <ReloadIcon className="stoke-white" />
            </button>
          </PopoverContent>
        </Popover>
      }

      <ConfirmModal
        open={modal}
        onOpenChange={() => setModal(false)}
        cancelText="아니요"
        confirmText="네"
        description="비활성화하면 저장된 구독 정보는 그대로 남아있습니다. 이후 다시 사용 가능합니다."
        onConfirm={() =>
          deactivateUserSubscription({ userSubscriptionId: userSubscribeId })
        }
        title="비활성화 하시겠어요?"
      />
    </>
  );
}

export default OngoingSpendingRecordButton;
