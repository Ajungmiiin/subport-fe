export type SubscriptionServiceItem = {
  id: number;
  name: string;
  logoImageUrl: string;
  defaultProvided: boolean;
};

export type SubscriptionServicesRes = {
  subscriptions: SubscriptionServiceItem[];
};

export type SubscriptionServiceByIdRes = {
  type: string;
  id: number;
  name: string;
  logoImageUrl: string;
};
