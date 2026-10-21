import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { UserSubscriptionSort } from '@/domains/subscription/user-subscription/types/api';
import { SUBSCRIPTION_SORT_OPTIONS } from '../constants';

interface SubscriptionSortSelectProps {
  changeSortBy: (sortBy: UserSubscriptionSort) => void;
  sortBy: UserSubscriptionSort;
}

function SubscriptionSortSelect({
  changeSortBy,
  sortBy,
}: SubscriptionSortSelectProps) {
  return (
    <Select
      onValueChange={(sortBy: UserSubscriptionSort) => changeSortBy(sortBy)}
      defaultValue={sortBy}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent defaultValue={sortBy} position="popper">
        {SUBSCRIPTION_SORT_OPTIONS.map((sort) => (
          <SelectItem key={sort.value} value={sort.value}>
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SubscriptionSortSelect;
