import type { UserCommentFormPayload } from '@/schema/user-comment-schema';
import { client } from './client';

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
