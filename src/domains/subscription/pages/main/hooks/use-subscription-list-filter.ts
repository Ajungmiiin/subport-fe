import type { UserSubscriptionSort } from '@/domains/subscription/user-subscription/types/api';
import { useSearchParams } from 'react-router-dom';
import { SUBSCRIPTION_SORT_OPTIONS } from '../constants';

const DEFAULT_SORT_OPTION: UserSubscriptionSort = 'type';
const SORT_OPTIONS = new Set(SUBSCRIPTION_SORT_OPTIONS.map((s) => s.value));

const parseParams = (sq: URLSearchParams) => {
  const active = sq.get('active') === '0' ? false : true;
  if (!active) return { active: false, sortBy: 'name' as const };

  const currentSortBy = sq.get('sort');
  const sortBy =
    currentSortBy && SORT_OPTIONS.has(currentSortBy as UserSubscriptionSort)
      ? (currentSortBy as UserSubscriptionSort)
      : DEFAULT_SORT_OPTION;

  return { active, sortBy };
};

function useSubscriptionListFilter() {
  const [searchParam, setSearchParams] = useSearchParams({
    active: '1',
    sort: 'type',
  });

  const sortOptions = parseParams(searchParam);

  const toggleActiveFilter = () => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      const nextActive = nextParams.get('active') !== '1';

      nextParams.set('active', nextActive ? '1' : '0');

      if (!nextActive) {
        nextParams.delete('sort');
      } else if (!nextParams.get('sort')) {
        nextParams.set('sort', DEFAULT_SORT_OPTION);
      }

      return nextParams;
    });
  };

  const changeSortBy = (sortBy: UserSubscriptionSort) => {
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      const isInactive = nextParams.get('active') !== '1';
      if (isInactive) {
        nextParams.set('active', '1');
      }

      nextParams.set('sort', sortBy);

      return nextParams;
    });
  };
  return {
    ...sortOptions,
    changeSortBy,
    toggleActiveFilter,
  };
}

export default useSubscriptionListFilter;
