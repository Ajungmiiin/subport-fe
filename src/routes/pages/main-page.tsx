import GroupedSubscribeList from '@/components/subscribe/member-subscribe/grouped-subscribe-list';
import SubscribeList from '@/components/subscribe/member-subscribe/subscribe-list';
import SubscribeListSkeleton from '@/components/subscribe/member-subscribe/subscribe-list-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import useGetMemberSubscriptions from '@/hooks/queries/use-get-member-subscriptions';
import { formatKRWInput } from '@/lib/utils';
import type {
  MemberSubscriptions,
  MemberSubscriptionSort,
  SubscriptionGroupMap,
} from '@/types/subscribe';
import { Link, useSearchParams } from 'react-router-dom';

const SUBSCIRBE_SORTS = [
  { value: 'type', label: '타입순' },
  { value: 'nextPaymentDate', label: '결제 가까운 순' },
  { value: 'createdAt', label: '최신순' },
  { value: 'name', label: '이름순' },
] as const;

const DEFAULT_ACTIVE = true;
const DEFAULT_SORT: MemberSubscriptionSort = 'type';

const SORT_VALUES = new Set(SUBSCIRBE_SORTS.map((s) => s.value));

const parseParams = (sq: URLSearchParams) => {
  const active = sq.get('active') === '0' ? false : DEFAULT_ACTIVE;
  if (!active) return { active: false, sortBy: 'name' as const };

  const rawSort = sq.get('sort');
  const sortBy =
    rawSort && SORT_VALUES.has(rawSort as MemberSubscriptionSort)
      ? (rawSort as MemberSubscriptionSort)
      : DEFAULT_SORT;

  return { active: true, sortBy };
};

function MainPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { active, sortBy } = parseParams(searchParams);
  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetMemberSubscriptions({ active, sortBy });

  const toggleActive = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const nextActive = !(prev.get('active') === '0' ? false : true);

      next.set('active', nextActive ? '1' : '0');

      if (!nextActive) {
        next.delete('sort');
      } else {
        if (!next.get('sort')) {
          next.set('sort', DEFAULT_SORT);
        }
      }

      return next;
    });
  };

  const handleChangeSort = (sortBy: MemberSubscriptionSort) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);

      next.set('active', '1');
      next.set('sort', sortBy);

      return next;
    });
  };

  return (
    <div className="scrollbar-hide flex h-full flex-col gap-6 overflow-scroll">
      <div>
        <Switch
          checked={active}
          onClick={toggleActive}
          className="cursor-pointer"
          variant="label-pill"
          onLabel="활성화"
          offLabel="비활성화"
        />
      </div>

      <div className="flex-1">
        {active && (
          <>
            <p className="mb-2 text-sm">이번 달 결제 예정 금액</p>
            <div className="mb-4 flex items-center justify-between">
              <p className="flex items-end text-lg">
                월
                <span className="mr-0.5 ml-1 text-2xl/tight font-semibold">
                  {formatKRWInput(
                    subscriptions?.currentMonthTotalAmount.toString() || '0',
                  )}
                </span>
                원
              </p>

              <Select
                onValueChange={(sortBy: MemberSubscriptionSort) =>
                  handleChangeSort(sortBy)
                }
                defaultValue={sortBy}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent defaultValue={sortBy} position="popper">
                  {SUBSCIRBE_SORTS.map((sort) => (
                    <SelectItem key={sort.value} value={sort.value}>
                      {sort.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {isGetSubscriptionsPending ? (
          <SubscribeListSkeleton />
        ) : (
          <>
            {active && subscriptions?.subscriptions.length === 0 && (
              <Link
                to="/subscribe/add"
                className="hover:bg-primary/90 bg-primary text-primary-foreground block w-full rounded-2xl py-4.5 text-center text-lg font-bold transition-colors"
              >
                첫 구독 등록하기
              </Link>
            )}

            {!active && subscriptions!.subscriptions.length === 0 && (
              <p className="text-sub-font-black flex h-full items-center justify-center">
                비활성화된 구독 서비스가 존재하지 않습니다.
              </p>
            )}

            {!active && (
              <SubscribeList
                unActive
                subscribeList={
                  subscriptions!.subscriptions as MemberSubscriptions
                }
              />
            )}

            {sortBy === 'type' && (
              <GroupedSubscribeList
                subscribeList={
                  subscriptions!.subscriptions as SubscriptionGroupMap
                }
              />
            )}

            {sortBy !== 'type' && active && (
              <SubscribeList
                subscribeList={
                  subscriptions!.subscriptions as MemberSubscriptions
                }
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MainPage;
