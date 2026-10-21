import { Button } from '../../../../../components/ui/button';
import { Switch } from '../../../../../components/ui/switch';
import Picker from 'react-mobile-picker';
import { ChevronUp } from 'lucide-react';
import FieldWrapper from '../../../../../components/ui/field-wrapper';
import PickerScrollGuard from '../../../../../components/ui/picker-scroll-guard';
import { cn } from '@/shared/lib/utils';
import useGetReminderSettings from '@/domains/account/hooks/queries/use-get-reminder-settings';
import useUpdatedReminderSettings from '@/domains/account/hooks/mutations/use-updated-reminder-settings-mutate';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type EditReminderFormValues,
  editReminderSchema,
} from '@/domains/account/schemas/edit-reminder-schema';
import PageLoader from '@/components/ui/page-loader';

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

function EditReminderForm() {
  const [openPicker, setOpenPicker] = useState(false);
  const form = useForm<EditReminderFormValues>({
    resolver: zodResolver(editReminderSchema),
    mode: 'onChange',
  });
  const navigate = useNavigate();
  const { data: reminderSettings, isPending: isGetReminderSettingsPending } =
    useGetReminderSettings();

  const { mutate: updatedReminderSettings } = useUpdatedReminderSettings({
    onSuccess: () => {
      navigate(-1);
      toast.success('알람이 설정되었습니다', { position: 'bottom-center' });
    },
  });

  const paymentReminderEnabledValue = useWatch({
    control: form.control,
    name: 'paymentReminderEnabled',
  });
  const reminderDaysBeforeValue = useWatch({
    control: form.control,
    name: 'reminderDaysBefore',
  });

  const { isDirty, isSubmitting, isValid } = useFormState({
    control: form.control,
  });

  useEffect(() => {
    if (!reminderSettings) return;

    form.reset({
      paymentReminderEnabled: reminderSettings.paymentReminderEnabled,
      reminderDaysBefore: reminderSettings.reminderDaysBefore,
    });
  }, [reminderSettings, form]);

  const handleSubmit = () => {
    if (paymentReminderEnabledValue) {
      updatedReminderSettings({
        paymentReminderEnabled: true,
        reminderDaysBefore: reminderDaysBeforeValue,
      });
    } else {
      updatedReminderSettings({ paymentReminderEnabled: false });
    }
  };

  if (isGetReminderSettingsPending || !reminderSettings)
    return <PageLoader label="알림 설정을 불러오는 중..." />;

  return (
    <div className="flex h-full flex-col justify-between">
      <form
        id="reminder"
        className="flex-1"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="bg-box-black mb-4 flex justify-between rounded-lg p-3">
          <div className="flex flex-col">
            <span className="font-semibold">결제일 알림</span>
            <span className="text-sub-font-black text-xs">
              결제 전, 설정한 날짜에 이메일을 보내드려요
            </span>
          </div>
          <Controller
            control={form.control}
            name="paymentReminderEnabled"
            render={({ field }) => (
              <Switch
                variant="dot"
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
              />
            )}
          />
        </div>

        {paymentReminderEnabledValue && (
          <FieldWrapper label="알림 시점" id="type">
            <Controller
              control={form.control}
              name="reminderDaysBefore"
              render={({ field }) => (
                <div className="w-full">
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => setOpenPicker((prev) => !prev)}
                  >
                    <span className="text-lg">{`${field.value}일전`}</span>
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
                    <PickerScrollGuard enabled={openPicker}>
                      <Picker
                        height={openPicker ? 110 : 0}
                        wheelMode="natural"
                        value={{ reminderDaysBefore: field.value }}
                        onChange={(nextValue) => {
                          field.onChange(nextValue.reminderDaysBefore);
                        }}
                        style={{
                          maskImage: 'none',
                          WebkitMaskImage: 'none',
                        }}
                        className="transition-all [&>div:last-child]:rounded-sm [&>div:last-child]:bg-[#B1DFDA] [&>div:last-child>div]:hidden"
                      >
                        <Picker.Column
                          name="reminderDaysBefore"
                          className="z-10"
                        >
                          {REMINDER_DAY.map((data) => (
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
                    </PickerScrollGuard>
                  </div>
                </div>
              )}
            />
          </FieldWrapper>
        )}
      </form>
      <Button form="reminder" disabled={!isDirty || !isValid || isSubmitting}>
        저장하기
      </Button>
    </div>
  );
}

export default EditReminderForm;
