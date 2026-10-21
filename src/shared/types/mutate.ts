export type useMutationCallbacks<TData = unknown> = {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
};
