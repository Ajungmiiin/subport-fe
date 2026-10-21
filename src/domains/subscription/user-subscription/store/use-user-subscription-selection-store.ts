import type { AddUserSubscriptionReq } from '@/domains/subscription/user-subscription/types/api';
import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

type AddSubscribeState = AddUserSubscriptionReq;
const initialState = {
  addSubscriptions: [] as AddSubscribeState[],
};

export const useUserSubscriptionSelectionStore = create(
  devtools(
    combine(initialState, (set, get) => ({
      actions: {
        addSubscribe: (subscribe: AddSubscribeState) => {
          const subscribeList = get();
          set({
            addSubscriptions: [...subscribeList.addSubscriptions, subscribe],
          });
        },
        removeSubscribe: (subscribeId: number) => {
          const subscribeList = get();
          set({
            addSubscriptions: subscribeList.addSubscriptions.filter(
              (subscribe) => subscribe.subscriptionId !== subscribeId,
            ),
          });
        },
        resetSubscribe: () => {
          set({ addSubscriptions: [] });
        },
      },
    })),
    { name: 'use-subscribe-store' },
  ),
);

export const useGetSelectedUserSubscription = () => {
  const subscriptions = useUserSubscriptionSelectionStore(
    (state) => state.addSubscriptions,
  );

  return subscriptions;
};

export const useAddUserSubscriptionSelect = () => {
  const addSubscribe = useUserSubscriptionSelectionStore(
    (state) => state.actions.addSubscribe,
  );

  return addSubscribe;
};

export const useUserSubscriptionSelection = () => {
  const {
    actions: { addSubscribe, removeSubscribe, resetSubscribe },
    addSubscriptions,
  } = useUserSubscriptionSelectionStore();

  return {
    removeSubscribe,
    addSubscribe,
    addSubscriptions,
    resetSubscribe,
  };
};
