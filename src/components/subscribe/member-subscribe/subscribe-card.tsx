import type { MemberSubscriptionsItem } from '@/types/subscribe';
import { Link } from 'react-router-dom';
import SubscribeFallbackImage from '@/assets/subscribe-fallback-image.svg';
import { cn, formatKRWInput } from '@/lib/utils';

function SubscribeCard({
  subscribeInfo,
  unActive = false,
}: {
  subscribeInfo: MemberSubscriptionsItem;
  unActive?: boolean;
}) {
  return (
    <Link
      to={`/member-subscribe/${subscribeInfo.id}`}
      className="bg-box-black block rounded-xl p-5"
    >
      <div className="flex items-center gap-3">
        <img
          className="aspect-square w-12.5 overflow-hidden rounded-lg"
          src={subscribeInfo.logoImageUrl || SubscribeFallbackImage}
          alt={`${subscribeInfo.name} 이미지`}
        />

        <div className="flex w-full items-center justify-between">
          <div className="text-sm font-medium">
            <p>{subscribeInfo.name}</p>
            {!unActive && (
              <span>
                {`${formatKRWInput(subscribeInfo.amount.toString())}원/${subscribeInfo.period}개월`}
              </span>
            )}
          </div>

          {!unActive && (
            <div
              className={cn(
                subscribeInfo.daysUntilPayment <= 7
                  ? 'bg-d-day-color-7day'
                  : 'bg-d-day-color-default',
                'flex w-13 items-center justify-center rounded-sm py-1 text-sm',
              )}
            >
              {`d-${subscribeInfo.daysUntilPayment}`}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default SubscribeCard;
