import { getReminderSettings } from '@/api/profile';
import { QUERY_KEY } from '@/constants/query-key';
import { useQuery } from '@tanstack/react-query';

function useGetReminderSettings() {
  return useQuery({
    queryKey: QUERY_KEY.my.reminderSettings,
    queryFn: getReminderSettings,
  });
}

export default useGetReminderSettings;
