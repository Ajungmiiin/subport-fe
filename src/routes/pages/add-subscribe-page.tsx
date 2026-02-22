import { cn, formatKRWInput } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import useGetSubscriptions from '@/hooks/queries/use-get-subscriptions';
import { Button } from '@/components/ui/button';
import { useSubScribe } from '@/store/use-subscribe-store';
import SubscribeListFallback from '@/components/ui/fallback/subscribe-list-fallback';
import { useAddSubscribeMutate } from '@/hooks/mutations/use-add-subscribe-mutate';
import SearchIcon from '@/assets/icons/search-icon.svg?react';
import { useState } from 'react';
import useDebounce from '@/hooks/use-debunce';
import SubscribeFallbackImage from '@/assets/subscribe-fallback-image.svg';

function AddSubscribePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 250);
  const navigate = useNavigate();
  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetSubscriptions(debouncedValue);

  const { removeSubscribe, addSubscriptions, resetSubscribe } = useSubScribe();

  const { mutate: addSubscribe, isPending: isAddSubscribePending } =
    useAddSubscribeMutate({
      onSuccess: () => {
        navigate('/', { replace: true });
        resetSubscribe();
      },
    });

  const selectedIds = new Set(addSubscriptions.map((s) => s.subscriptionId));

  const getSelectSubscribe = (id: number) => {
    const selectSubscribe = addSubscriptions.filter(
      (subscribe) => subscribe.subscriptionId === id,
    );

    console.log(selectSubscribe);
    return selectSubscribe[0];
  };

  const sortedSubscriptions =
    selectedIds.size > 0
      ? [...subscriptions!].sort((a, b) => {
          // 선택 된 구독 항목 정렬
          const aSel = selectedIds.has(a.id) ? 0 : 1;
          const bSel = selectedIds.has(b.id) ? 0 : 1;
          return aSel - bSel;
        })
      : subscriptions;

  const onAddSubscribe = async () => {
    const response = await Promise.all(
      addSubscriptions.map((subscribe) =>
        addSubscribe({
          dutchPay: subscribe.dutchPay,
          dutchPayAmount: subscribe.dutchPayAmount,
          memo: subscribe.memo,
          planId: subscribe.planId,
          startDate: subscribe.startDate,
          subscriptionId: subscribe.subscriptionId,
        }),
      ),
    );

    console.log(response);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="relative">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-box-black w-full rounded-full px-4 py-3 outline-none"
        />
        <SearchIcon
          aria-hidden
          className="absolute top-1/2 right-4 size-6 -translate-y-1/2"
        />
      </div>
      <div className="scrollbar-hide flex flex-1 justify-center overflow-scroll">
        {isGetSubscriptionsPending && <SubscribeListFallback />}
        {searchTerm &&
          sortedSubscriptions &&
          sortedSubscriptions!.length <= 0 && (
            <p className="text-sub-font-black flex items-center justify-center">
              검색 결과가 없습니다
            </p>
          )}

        {!isGetSubscriptionsPending &&
          sortedSubscriptions &&
          sortedSubscriptions.length > 0 && (
            <ul className="w-full space-y-4">
              {sortedSubscriptions.map((subscribe) => {
                const selectSubscribe = selectedIds.has(subscribe.id);

                return (
                  <div
                    key={subscribe.id}
                    onClick={() => {
                      if (selectSubscribe) {
                        removeSubscribe(subscribe.id);
                        return;
                      }

                      navigate(`/subscribe/add/${subscribe.id}`);
                    }}
                    className={cn(
                      'flex cursor-pointer items-center justify-between rounded-xl p-4 text-sm transition-all',
                      selectSubscribe
                        ? 'bg-primary text-background-black py-5'
                        : 'bg-box-black',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          subscribe.defaultProvided === false &&
                            'flex size-10 items-center justify-center rounded-lg p-2',

                          'bg-background-black rounded-lg',
                        )}
                      >
                        <img
                          src={subscribe.logoImageUrl || SubscribeFallbackImage}
                          className={cn(
                            selectSubscribe ? 'size-11' : 'size-10',
                            'rounded-lg object-contain',
                          )}
                          alt={`${subscribe.name} 로고 이미지`}
                        />
                      </div>
                      <div className="flex flex-col font-semibold">
                        <p>{subscribe.name}</p>
                        {selectSubscribe && (
                          <span>{`${formatKRWInput(getSelectSubscribe(subscribe.id).price.toString())}${getSelectSubscribe(subscribe.id).amountUnit === 'KRW' ? '원' : '$'}`}</span>
                        )}
                      </div>
                    </div>
                    <Checkbox checked={selectSubscribe} />
                  </div>
                );
              })}
            </ul>
          )}
      </div>
      {addSubscriptions.length > 0 && (
        <Button
          disabled={isAddSubscribePending}
          onClick={onAddSubscribe}
          className="w-full"
        >
          다음으로
        </Button>
      )}
    </div>
  );
}

export default AddSubscribePage;
