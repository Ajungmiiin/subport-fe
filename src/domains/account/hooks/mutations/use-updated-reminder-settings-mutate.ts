import { queryClient } from '@/shared/providers/query-provider';
import { QUERY_KEY } from '@/shared/constants/query-key';
import type { useMutationCallbacks } from '@/shared/types/mutate';
import { useMutation } from '@tanstack/react-query';
import { updatedReminderSettings } from '../../api/account';
import type { ReminderSettingsRes } from '../../types/api';

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
