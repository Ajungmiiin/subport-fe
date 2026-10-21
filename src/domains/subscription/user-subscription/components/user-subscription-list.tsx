import type { UserSubscriptionSection } from '../types/view';
import type { UserSubscriptionItem } from '../types/api';
import { Link } from 'react-router-dom';
import { cn, formatKRWInput } from '@/shared/lib/utils';
import SubscribeFallbackImage from '@/assets/subscribe-fallback-image.svg';

interface UserSubscriptionListProps {
  active?: boolean;
  sections: UserSubscriptionSection[];
}

function UserSubscriptionList({
  sections,
  active = true,
}: UserSubscriptionListProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, idx) => (
        <div key={section.title || `subscription-list-${idx}`}>
          <>
            {section.title && (
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold">{section.title}</p>
                <span>{`${section.items.length}건`}</span>
              </div>
            )}

            <ul className="flex flex-col gap-4">
              {section.items.map((item) => (
                <li key={item.id}>
                  <UserSubscriptionCard
                    subscribeInfo={item}
                    unActive={!active}
                  />
                </li>
              ))}
            </ul>
          </>
        </div>
      ))}
    </div>
  );
}

function UserSubscriptionCard({
  subscribeInfo,
  unActive = false,
}: {
  subscribeInfo: UserSubscriptionItem;
  unActive?: boolean;
}) {
  return (
    <Link
      to={`/user-subscription/${subscribeInfo.id}`}
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
              {`d-${subscribeInfo.daysUntilPayment === 0 ? 'day' : subscribeInfo.daysUntilPayment}`}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default UserSubscriptionList;
