import type {
  FlatUserSubscriptionRes,
  GroupedUserSubscriptionRes,
  UserSubscriptionParams,
} from '../types/api';
import type {
  UserSubscriptionListView,
  UserSubscriptionSection,
} from '../types/view';

function mappingUserSubscriptionList(
  params: UserSubscriptionParams,
  response: GroupedUserSubscriptionRes | FlatUserSubscriptionRes,
): UserSubscriptionListView {
  if (params.active && params.sortBy === 'type') {
    const groupedList = response as GroupedUserSubscriptionRes;
    const sections: UserSubscriptionSection[] = Object.entries(
      groupedList.subscriptions,
    ).map(([title, items]) => ({
      title,
      items,
    }));

    return {
      isEmpty: sections.length === 0,
      sections,
    };
  }

  const flatList = response as FlatUserSubscriptionRes;
  const sections: UserSubscriptionSection[] = [
    { items: flatList.subscriptions },
  ];

  return {
    isEmpty: flatList.subscriptions.length === 0,
    sections,
  };
}

export default mappingUserSubscriptionList;
