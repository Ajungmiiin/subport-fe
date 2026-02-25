import { updatedReminderSettings } from '@/api/profile';
import { queryClient } from '@/components/providers/query-provider';
import { QUERY_KEY } from '@/constants/query-key';
import type { useMutationCallbacks } from '@/types/mutate';
import type { ReminderSettingsRes } from '@/types/profile';
import { useMutation } from '@tanstack/react-query';

function useUpdatedReminderSettings(
  callbacks?: useMutationCallbacks<ReminderSettingsRes>,
) {
  return useMutation({
    mutationFn: updatedReminderSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEY.my.reminderSettings, data);

      callbacks?.onSuccess?.(data);
    },
  });
}

export default useUpdatedReminderSettings;
