import EditIcon from '@/assets/icons/edit-icon.svg?react';
import DeleteIcon from '@/assets/icons/delete-icon.svg?react';
import SubscribeFallbackImage from '@/assets/subscribe-fallback-image.svg';
import type { SubscriptionServiceItem } from '@/domains/subscription/services/types/api';

interface CustomServiceEditCardProps {
  subscriptionService: SubscriptionServiceItem;
  onEdit: () => void;
  onDelete: () => void;
}

function CustomServiceEditCard({
  subscriptionService,
  onEdit,
  onDelete,
}: CustomServiceEditCardProps) {
  return (
    <li key={subscriptionService.id}>
      <div className="bg-box-black flex flex-col gap-4 rounded-2xl p-5">
        <div className="flex items-center gap-4">
          <div className="bg-background-black flex size-10 items-center justify-center rounded-lg p-2">
            <img
              src={subscriptionService.logoImageUrl || SubscribeFallbackImage}
              className="inline-flex items-center justify-center object-contain"
              alt={`${subscriptionService.name} 이미지`}
            />
          </div>
          <p className="text-lg font-semibold">{subscriptionService.name}</p>
        </div>

        <div className="text-sub-font-black flex items-center gap-2">
          <button
            onClick={onEdit}
            className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
          >
            <span>수정하기</span>
            <EditIcon className="fill-sub-font-black size-5" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="bg-background-black flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-4"
          >
            <span>삭제하기</span>

            <DeleteIcon className="fill-sub-font-black size-5" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default CustomServiceEditCard;
