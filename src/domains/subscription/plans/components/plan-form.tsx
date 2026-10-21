import { Controller, useForm, useFormState, useWatch } from 'react-hook-form';
import FieldWrapper from '../../../../components/ui/field-wrapper';
import ErrorMessage from '../../../../components/ui/error-message';
import { cn, formatKRWInput, formatUSDInput } from '@/shared/lib/utils';
import { useState } from 'react';
import Picker from 'react-mobile-picker';
import PickerScrollGuard from '../../../../components/ui/picker-scroll-guard';
import { Button } from '../../../../components/ui/button';
import { ChevronUp } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  planFormSchema,
  type PlanFormValues,
} from '../schemas/plan-form-schema';

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

type PlanFormProps = {
  onSubmit: (formData: PlanFormValues) => void;
  disabled?: boolean;
} & Partial<PlanFormValues>;

function PlanForm({
  onSubmit,
  amount,
  amountUnit,
  durationMonths,
  name,
  disabled,
}: PlanFormProps) {
  const defaultValues: PlanFormValues = {
    name: name ?? '',
    amount: amount ?? '0',
    amountUnit: amountUnit ?? 'KRW',
    durationMonths: durationMonths ?? '1',
  };
  const [openPicker, setOpenPicker] = useState(false);

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    mode: 'onChange',
    defaultValues,
  });

  const amountUnitValue = useWatch({
    control: form.control,
    name: 'amountUnit',
  });

  const { isDirty, isValid, isValidating } = useFormState({
    control: form.control,
  });

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
                        if (amountUnitValue === 'KRW') {
                          if (e.target.value.length > 8) return;

                          field.onChange(formatKRWInput(e.target.value));
                        }

                        if (amountUnitValue === 'USD') {
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
                        {amountUnitValue === 'KRW' ? '원' : '달러'}
                      </div>
                      <ChevronUp
                        className={cn(
                          'stroke-sub-font-black size-5 rotate-180 transition-all',
                          openPicker && 'rotate-0',
                        )}
                      />
                    </div>
                  </div>

                  <Controller
                    control={form.control}
                    name="amountUnit"
                    render={({ field }) => (
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
                            value={{ amountUnit: field.value }}
                            onChange={(nextValue) => {
                              field.onChange(nextValue.amountUnit);
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
                                <Picker.Item
                                  value={unit.value}
                                  key={unit.value}
                                >
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
                    )}
                  />
                </div>
              </FieldWrapper>
              {fieldState.error && (
                <ErrorMessage message={fieldState.error.message!} />
              )}
            </div>
          )}
        />

        <Controller
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
                    id="durationMonths"
                    className="min-w-0 flex-1 text-right text-xl outline-none"
                    onChange={(e) => {
                      field.onChange(e.target.value);
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
        disabled={disabled || !isValid || !isDirty || isValidating}
      >
        저장하기
      </Button>
    </>
  );
}

export default PlanForm;
