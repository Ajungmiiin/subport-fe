export type ApiErrorRes = {
  code: string;
  error: string;
  fieldErrors: string | null;
  message: string;
  status: number;
};
