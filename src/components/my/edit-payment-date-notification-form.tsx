import { useState } from 'react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import Picker from 'react-mobile-picker';
import { ChevronUp } from 'lucide-react';
import FieldWrapper from '../ui/field-wrapper';
import { cn } from '@/lib/utils';
import useGetReminderSettings from '@/hooks/queries/use-get-reminder-settings';
import useUpdatedReminderSettings from '@/hooks/mutations/use-updated-reminder-settings-mutate';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const REMINDER_DAY = [
  {
    label: '1일전',
    value: 1,
  },
  {
    label: '3일전',
    value: 3,
  },
];

type ReminderDayState = {
  reminderDay: number;
};

function EditPayMentDateNotificationForm() {
  const navigate = useNavigate();
  const { data: reminderSettings, isPending: isGetReminderSettingsPending } =
    useGetReminderSettings();

  const {
    mutate: updatedReminderSettings,
    isPending: isUpdatedReminderSettingsPending,
  } = useUpdatedReminderSettings({
    onSuccess: () => {
      navigate(-1);
      toast.success('알람이 설정되었습니다', { position: 'bottom-center' });
    },
  });
  const [notification, setNotification] = useState(
    reminderSettings?.paymentReminderEnabled ?? true,
  );
  const [openPicker, setOpenPicker] = useState(false);
  const [selectReminderDay, setSelectReminderDay] = useState<ReminderDayState>({
    reminderDay: reminderSettings?.reminderDaysBefore ?? 3,
  });

  const onSubmit = () => {
    if (notification) {
      updatedReminderSettings({
        paymentReminderEnabled: true,
        reminderDaysBefore: selectReminderDay.reminderDay,
      });
    } else {
      updatedReminderSettings({ paymentReminderEnabled: false });
    }
  };

  if (isGetReminderSettingsPending) return <p>로딩</p>;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex-1">
        <p className="mb-4 w-1/3 text-xl font-semibold">
          이메일 알림을 설정해 주세요
        </p>

        <div className="bg-box-black mb-4 flex justify-between rounded-lg p-3">
          <div className="flex flex-col">
            <span className="font-semibold">결제일 알림</span>
            <span className="text-sub-font-black text-xs">
              결제 전, 설정한 날짜에 이메일을 보내드려요
            </span>
          </div>
          <Switch
            checked={notification}
            onClick={() => setNotification((prev) => !prev)}
            variant="dot"
          />
        </div>

        {notification && (
          <FieldWrapper label="알림 시점" id="type">
            <div className="w-full">
              <div
                className="flex cursor-pointer items-center justify-between"
                onClick={() => setOpenPicker((prev) => !prev)}
              >
                <span className="text-lg">{`${selectReminderDay.reminderDay}일전`}</span>
                <ChevronUp
                  className={cn(
                    'transition-all',
                    openPicker ? '' : 'rotate-180',
                  )}
                />
              </div>

              <div
                className={cn(
                  openPicker
                    ? 'border-background-black mt-2 border-t pt-2'
                    : '',
                  'w-full',
                )}
              >
                <Picker
                  height={openPicker ? 65 : 0}
                  wheelMode="natural"
                  value={selectReminderDay}
                  onChange={(nextValue) => {
                    setSelectReminderDay(nextValue);
                  }}
                  className="transition-all [&>div:last-child]:rounded-sm [&>div:last-child]:bg-[#B1DFDA] [&>div:last-child>div]:hidden"
                >
                  <Picker.Column name="reminderDay" className="z-10">
                    {REMINDER_DAY?.map((data) => (
                      <Picker.Item value={data.value} key={data.value}>
                        {({ selected }) => (
                          <div
                            className={cn(
                              selected
                                ? 'text-background-black'
                                : 'text-sub-font-black',
                              'w-full pl-4 text-start',
                            )}
                          >
                            {data.label}
                          </div>
                        )}
                      </Picker.Item>
                    ))}
                  </Picker.Column>
                </Picker>
              </div>
            </div>
          </FieldWrapper>
        )}
      </div>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isUpdatedReminderSettingsPending}
      >
        저장하기
      </Button>
    </div>
  );
}

export default EditPayMentDateNotificationForm;
