import { Controller, useForm } from 'react-hook-form';
import FieldWrapper from '../ui/field-wrapper';
import ErrorMessage from '../ui/error-message';
import { cn, deleteComma, formatKRWInput, formatUSDInput } from '@/lib/utils';
import { useState } from 'react';
import Picker from 'react-mobile-picker';
import PickerScrollGuard from '../ui/picker-scroll-guard';
import { Button } from '../ui/button';
import { ChevronUp } from 'lucide-react';

export type PlanFormValues = {
  name: string;
  amount: string;
  amountUnit: 'KRW' | 'USD';
  durationMonths: number;
};

const AMOUNT_UNITS = [
  {
    label: '원',
    value: 'KRW' as const,
  },
  {
    label: '달러',
    value: 'USD' as const,
  },
];

type AmountUnitState = {
  amountUnit: 'KRW' | 'USD';
};

type PlanFormProps = {
  onSubmit: (formData: PlanFormValues) => void;
  disabled?: boolean;
} & Partial<PlanFormValues>;

function PlanForm({
  onSubmit,
  disabled,
  amount,
  amountUnit,
  durationMonths,
  name,
}: PlanFormProps) {
  const defaultValues: PlanFormValues = {
    name: name ?? '',
    amount: amount ?? '0',
    amountUnit: amountUnit ?? 'KRW',
    durationMonths: durationMonths ?? 1,
  };
  const [openPicker, setOpenPicker] = useState(false);
  const [selectAmountUnit, setSelectAmountUnit] = useState<AmountUnitState>({
    amountUnit: defaultValues.amountUnit,
  });

  const form = useForm<PlanFormValues>({
    mode: 'onChange',
    defaultValues,
  });

  const watchedName = form.watch('name');
  const watchedAmount = form.watch('amount');
  const watchedAmountUnit = form.watch('amountUnit');
  const watchedDurationMonths = form.watch('durationMonths');

  const isUnchanged =
    watchedName === defaultValues.name &&
    watchedAmount === defaultValues.amount &&
    watchedAmountUnit === defaultValues.amountUnit &&
    watchedDurationMonths === defaultValues.durationMonths;

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="plan-form"
        className="h-full flex-1 space-y-4"
      >
        <Controller
          control={form.control}
          name="name"
          rules={{
            validate: (v) =>
              v.trim().length > 0 || '서비스 이름은 최소 1글자 이상입니다.',
            required: {
              value: true,
              message: '서비스 이름을 입력해주세요',
            },
            maxLength: {
              value: 10,
              message: '서비스 이름은 최대 10글자 입니다',
            },
            minLength: {
              value: 1,
              message: '서비스 이름은 최소 1글자 이상입니다',
            },
          }}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <FieldWrapper
                label="멤버십 이름"
                id="name"
                error={!!fieldState.error}
              >
                <input
                  className="w-full text-lg outline-none"
                  placeholder="멤버십 이름을 입력해주세요"
                  {...field}
                  onFocus={() => {
                    if (fieldState.error) {
                      form.clearErrors('name');
                    }
                  }}
                />
              </FieldWrapper>
              {fieldState.error && (
                <ErrorMessage message={fieldState.error!.message!} />
              )}
            </div>
          )}
        />

        <Controller
          control={form.control}
          name="amount"
          rules={{
            validate: (v) =>
              Number(deleteComma(v)) > 0 || '멤버십 가격을 입력해주세요',
          }}
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <FieldWrapper label="가격" id="amount" error={!!fieldState.error}>
                <div className="w-full">
                  <div className="flex w-full items-center gap-2">
                    <input
                      inputMode="decimal"
                      min={0}
                      type="text"
                      id="amount"
                      name="amount"
                      className="min-w-0 flex-1 text-right text-xl outline-none"
                      value={field.value ?? ''}
                      onChange={(e) => {
                        if (selectAmountUnit.amountUnit === 'KRW') {
                          if (e.target.value.length > 8) return;

                          field.onChange(formatKRWInput(e.target.value));
                        }

                        if (selectAmountUnit.amountUnit === 'USD') {
                          if (e.target.value.length > 6) return;

                          field.onChange(formatUSDInput(e.target.value));
                        }
                      }}
                    />
                    <div
                      onClick={() => setOpenPicker((prev) => !prev)}
                      className="flex cursor-pointer items-center gap-1"
                    >
                      <div className="text-sub-font-black text-lg">
                        {selectAmountUnit.amountUnit === 'KRW' ? '원' : '달러'}
                      </div>
                      <ChevronUp
                        className={cn(
                          'stroke-sub-font-black size-5 rotate-180 transition-all',
                          openPicker && 'rotate-0',
                        )}
                      />
                    </div>
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
                      value={selectAmountUnit}
                      onChange={(nextValue) => {
                        setSelectAmountUnit(nextValue);
                        form.setValue('amountUnit', nextValue.amountUnit, {
                          shouldDirty: true,
                        });
                        form.setValue('amount', '0', {
                          shouldValidate: true,
                          shouldDirty: true,
                        });
                      }}
                      style={{
                        maskImage: 'none',
                        WebkitMaskImage: 'none',
                      }}
                      className="transition-all [&>div:last-child]:rounded-sm [&>div:last-child]:bg-[#B1DFDA] [&>div:last-child>div]:hidden"
                    >
                      <Picker.Column name="amountUnit" className="z-10">
                        {AMOUNT_UNITS.map((unit) => (
                          <Picker.Item value={unit.value} key={unit.value}>
                            {({ selected }) => (
                              <div
                                className={cn(
                                  selected
                                    ? 'text-background-black'
                                    : 'text-sub-font-black',
                                  'w-full px-4 text-right text-lg',
                                )}
                              >
                                {unit.label}
                              </div>
                            )}
                          </Picker.Item>
                        ))}
                      </Picker.Column>
                      </Picker>
                    </PickerScrollGuard>
                  </div>
                </div>
              </FieldWrapper>
              {fieldState.error && (
                <ErrorMessage message={fieldState.error.message!} />
              )}
            </div>
          )}
        />

        <Controller
          rules={{
            required: { value: true, message: '결제주기를 입력해주세요.' },
          }}
          control={form.control}
          name="durationMonths"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <FieldWrapper
                error={!!fieldState.error}
                label="결제주기"
                id="durationMonths"
              >
                <div className="flex w-full items-center gap-2">
                  <input
                    value={field.value || ''}
                    inputMode="numeric"
                    min={0}
                    type="number"
                    id="reminderDaysBeforeEnd"
                    className="min-w-0 flex-1 text-right text-xl outline-none"
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      if (raw === '') {
                        field.onChange('');
                        form.setError('durationMonths', {
                          message: '결제주기는 최소 1개월 이상 입니다.',
                        });
                        return;
                      }
                      const next = Number(raw);
                      if (next < 1 || next > 60) return;
                      form.clearErrors('durationMonths');
                      field.onChange(next);
                    }}
                    onBlur={() => {
                      if (!field.value || field.value === 0) {
                        form.setError('durationMonths', {
                          message: '결제주기를 입력해주세요',
                        });
                      }
                    }}
                    onFocus={() => {
                      if (fieldState.error) {
                        form.clearErrors('durationMonths');
                      }
                    }}
                  />
                  <div className="text-sub-font-black text-lg">개월</div>
                </div>
              </FieldWrapper>
              {fieldState.error && (
                <ErrorMessage message={fieldState.error!.message!} />
              )}
            </div>
          )}
        />
      </form>

      <Button
        form="plan-form"
        disabled={!form.formState.isValid || isUnchanged || disabled}
      >
        저장하기
      </Button>
    </>
  );
}

export default PlanForm;
