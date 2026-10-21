import { cn } from '@/shared/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';
import useDebounce from '@/hooks/use-debunce';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useAddUserSubscriptionMutate } from '@/domains/subscription/user-subscription/hooks/use-add-user-subscription';
import useGetSubscriptionServices from '@/domains/subscription/services/hooks/queries/use-get-subscription-services';
import SubscriptionServiceListSearchInput from './components/subscription-service-list-search-input';
import SubscriptionServiceSelectableCard from './components/subscription-service-selectable-card';
import UserSubscriptionListSkeleton from '@/domains/subscription/user-subscription/components/ui/subscribe-list-skeleton';
import { useUserSubscriptionSelection } from '../../user-subscription/store/use-user-subscription-selection-store';

function SubscriptionServiceListPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedValue = useDebounce(searchTerm, 250);

  const { data: subscriptions, isPending: isGetSubscriptionsPending } =
    useGetSubscriptionServices(debouncedValue);

  const { addSubscriptions, resetSubscribe } = useUserSubscriptionSelection();

  const { mutateAsync: addSubscribe, isPending: isAddSubscribePending } =
    useAddUserSubscriptionMutate();

  const selectedSubscriptionMap = useMemo(() => {
    return new Map(
      addSubscriptions.map((subscription) => [
        subscription.subscriptionId,
        subscription,
      ]),
    );
  }, [addSubscriptions]);

  const sortedSubscriptions = useMemo(() => {
    const serviceList = subscriptions ?? [];
    const selectedIds = new Set(
      addSubscriptions.map((subscription) => subscription.subscriptionId),
    );

    if (selectedIds.size === 0) {
      return serviceList;
    }

    return [...serviceList].sort((a, b) => {
      const aSel = selectedIds.has(a.id) ? 0 : 1;
      const bSel = selectedIds.has(b.id) ? 0 : 1;
      return aSel - bSel;
    });
  }, [subscriptions, addSubscriptions]);

  const onAddSubscribe = async () => {
    try {
      await Promise.all(
        addSubscriptions.map((subscribe) => addSubscribe(subscribe)),
      );

      navigate('/', { replace: true });
      resetSubscribe();
    } catch (error) {
      console.log(error);
      toast.error('등록을 실패했습니다', { position: 'bottom-center' });
    }
  };

  return (
    <div className="relative flex h-full flex-col gap-4">
      <SubscriptionServiceListSearchInput
        searchTerm={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="scrollbar-hide flex flex-1 justify-center overflow-scroll">
        {isGetSubscriptionsPending && <UserSubscriptionListSkeleton />}

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
              {sortedSubscriptions.map((subscription) => {
                const selectedSubscription = selectedSubscriptionMap.get(
                  subscription.id,
                );
                const isSelected = !!selectedSubscription;

                return (
                  <SubscriptionServiceSelectableCard
                    key={subscription.id}
                    subscription={subscription}
                    selectedSubscription={selectedSubscription}
                    isSelected={isSelected}
                  />
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

      {addSubscriptions.length === 0 && (
        <Link
          to="/service/add/custom"
          className={cn(
            'bg-primary absolute right-1 bottom-1 z-999 flex cursor-pointer items-center justify-center rounded-xl p-4 transition-opacity hover:opacity-80',
          )}
        >
          <Plus strokeWidth={4} stroke="#242429" />
        </Link>
      )}
    </div>
  );
}

export default SubscriptionServiceListPage;
