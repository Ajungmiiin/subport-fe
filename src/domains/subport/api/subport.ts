import { client } from '@/shared/api/client';
import type { FaqRes } from '../types/api';
import type { UserCommentFormPayload } from '../schemas/user-comment-schema';

export const getFaqList = async () => {
  const response = await client.get<FaqRes>('/api/faqs');

  return response.data;
};

export const sendUserComment = async (payload: UserCommentFormPayload) => {
  const response = await client.post('/api/feedbacks', payload);

  return response.data;
};

export const sendUserFeedback = async (payload: {
  overall: string | null;
  featureRequest: string | null;
}) => {
  const response = await client.post('/api/test-feedbacks', payload);

  return response.data;
};
