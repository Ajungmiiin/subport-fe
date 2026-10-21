import type { ApiErrorRes } from '@/shared/types/error';
import { isAxiosError } from 'axios';

export const getApiErrorRes = (error: unknown) => {
  if (isAxiosError<ApiErrorRes>(error)) {
    return error.response?.data;
  }

  return undefined;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = '요청 중 문제가 발생했습니다.',
) => {
  if (isAxiosError<ApiErrorRes>(error)) {
    return error.response?.data.message ?? fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
