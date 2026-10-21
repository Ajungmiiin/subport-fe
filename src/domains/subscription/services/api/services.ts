import type { AddCustomServicesReq } from '../schemas/custom-services-schema';
import { client } from '@/shared/api/client';
import type {
  SubscriptionServiceByIdRes,
  SubscriptionServiceItem,
  SubscriptionServicesRes,
} from '../types/api';
import { buildCustomServiceFormData } from '@/shared/lib/utils';

export const getSubscriptionServices = async (searchTerm?: string) => {
  const response = await client.get<SubscriptionServicesRes>(
    `/api/subscriptions`,
    {
      params: searchTerm ? { name: searchTerm } : undefined,
    },
  );

  return response.data.subscriptions;
};

export const addCustomService = async (serviceInfo: AddCustomServicesReq) => {
  const formData = buildCustomServiceFormData(serviceInfo);

  const response = await client.post<{ id: number }>(
    '/api/subscriptions',
    formData,
  );
  return response.data;
};

export const getServiceById = async (id: string) => {
  const response = await client.get<SubscriptionServiceByIdRes>(
    `/api/subscriptions/${id}`,
  );

  return response.data;
};

export const updatedCustomService = async ({
  serviceInfo,
  serviceId,
}: {
  serviceInfo: AddCustomServicesReq;
  serviceId: string;
}) => {
  const formData = buildCustomServiceFormData(serviceInfo);

  const response = await client.put<SubscriptionServiceItem>(
    `/api/subscriptions/${serviceId}`,
    formData,
  );

  return response.data;
};

export const deleteCustomSubscriptionService = async (serviceId: string) => {
  const response = await client.delete(`/api/subscriptions/${serviceId}`);

  return response;
};

export const getSubscriptionServiceTypes = async () => {
  const response = await client.get<string[]>('/api/subscriptions/types');

  return response.data;
};
