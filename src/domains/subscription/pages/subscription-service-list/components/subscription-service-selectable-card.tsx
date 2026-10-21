import { Checkbox } from '@/components/ui/checkbox';
import type { SubscriptionServiceItem } from '@/domains/subscription/services/types/api';
import { cn, formatKRWInput } from '@/shared/lib/utils';
import { useNavigate } from 'react-router-dom';

import SubscribeFallbackImage from '@/assets/subscribe-fallback-image.svg';
import { useUserSubscriptionSelection } from '@/domains/subscription/user-subscription/store/use-user-subscription-selection-store';

interface SubscriptionServiceSelectableCardProps {
  subscription: SubscriptionServiceItem;
  selectedSubscription?: {
    price: string;
    amountUnit: 'KRW' | 'USD';
  };
  isSelected: boolean;
}

function SubscriptionServiceSelectableCard({
  subscription,
  selectedSubscription,
  isSelected,
}: SubscriptionServiceSelectableCardProps) {
  const { removeSubscribe } = useUserSubscriptionSelection();
  const navigate = useNavigate();

  return (
    <li
      key={subscription.id}
      onClick={() => {
        if (isSelected) {
          removeSubscribe(subscription.id);
          return;
        }

        navigate(`/service/add/${subscription.id}`);
      }}
      className={cn(
        'flex cursor-pointer items-center justify-between rounded-xl p-4 text-sm transition-all',
        isSelected ? 'bg-primary text-background-black py-5' : 'bg-box-black',
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            subscription.defaultProvided === false &&
              'flex size-10 items-center justify-center rounded-lg p-2',

            'bg-background-black rounded-lg',
          )}
        >
          <img
            src={subscription.logoImageUrl || SubscribeFallbackImage}
            className={cn(
              isSelected ? 'size-11' : 'size-10',
              'rounded-lg object-contain',
            )}
            alt={`${subscription.name} 로고 이미지`}
          />
        </div>
        <div className="flex flex-col font-semibold">
          <p>{subscription.name}</p>
          {isSelected && (
            <span>{`${formatKRWInput(selectedSubscription!.price.toString())}${selectedSubscription!.amountUnit === 'KRW' ? '원' : '$'}`}</span>
          )}
        </div>
      </div>
      <Checkbox
        className="data-[state=checked]:bg-primary"
        checked={isSelected}
      />
    </li>
  );
}

export default SubscriptionServiceSelectableCard;
