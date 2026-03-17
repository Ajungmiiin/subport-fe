import type { SubscriptionGroupMap } from '@/types/subscribe';
import SubscribeCard from './subscribe-card';

function GroupedSubscribeList({
  subscribeList,
}: {
  subscribeList: SubscriptionGroupMap;
}) {
  Object.entries(subscribeList).map(([group, item]) => {
    console.log(group, item);
  });
  return (
    <ul className="space-y-4">
      {Object.entries(subscribeList).map(([subscribeType, item]) => (
        <li key={subscribeType} className="space-y-4">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-lg font-semibold">{subscribeType}</div>
            <div>{`${item.length}건`}</div>
          </div>

          <ul className="flex flex-col gap-4">
            {item.map((subscribe) => (
              <SubscribeCard key={subscribe.id} subscribeInfo={subscribe} />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default GroupedSubscribeList;
