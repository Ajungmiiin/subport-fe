import { QUERY_KEY } from '@/shared/constants/query-key';
import { useQuery } from '@tanstack/react-query';
import { getReminderSettings } from '../../api/account';

function useGetReminderSettings() {
  return useQuery({
    queryKey: QUERY_KEY.my.reminderSettings,
    queryFn: getReminderSettings,
  });
}

export default useGetReminderSettings;
