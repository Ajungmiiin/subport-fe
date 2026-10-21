import FieldWrapper from '../../../../components/ui/field-wrapper';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';
import { Checkbox } from '../../../../components/ui/checkbox';
import { cn, formatKRWInput } from '@/shared/lib/utils';
import { Button } from '../../../../components/ui/button';

import DatePicker from '../../../../shared/form/date-picker';
import { addMonths, format } from 'date-fns';
import {
  addUserSubscriptionSchema,
  type AddUserSubscriptionDefaultValues,
  type AddUserSubscriptionValues,
} from '../schemas/add-user-subscription-schema';
import type { AddUserSubscriptionReq } from '../types/api';
import PlanListBottomModal from '../../plans/components/select-plan-bottom-modal';
import type { PlanSelectionItem } from '../../plans/types/view';

interface SelectPlanBottomModalProps {
  id: string;
  serviceName: string;
  onSubmit: (subscribeInfo: AddUserSubscriptionReq) => void;
  defaultValues?: AddUserSubscriptionDefaultValues;
  minDate?: Date;
}

function SelectPlanBottomModal({
  id,
  onSubmit,
  defaultValues,
  minDate,
  serviceName,
}: SelectPlanBottomModalProps) {
  const [plan, setPlan] = useState(false);
  const [selectPlan, setSelctPlan] = useState<PlanSelectionItem | null>(null);

  const form = useForm<AddUserSubscriptionValues>({
    resolver: zodResolver(addUserSubscriptionSchema),
    defaultValues: {
      dutchPay: defaultValues?.dutchPay ?? false,
      dutchPayAmount: defaultValues?.dutchPayAmount ?? '0',
      memo: defaultValues?.memo ?? '',
      startDate: defaultValues?.startDate ?? format(new Date(), 'yyyy-MM-dd'),
      ...(defaultValues?.planId !== undefined && {
        planId: defaultValues.planId,
      }),
    },
  });

  const dutchPay = useWatch({ control: form.control, name: 'dutchPay' });
  const dutchPayAmount = useWatch({
    control: form.control,
    name: 'dutchPayAmount',
  });
  const planId = useWatch({ control: form.control, name: 'planId' });

  const onSelectPlan = (plan: PlanSelectionItem) => {
    form.setValue('planId', Number(plan.id), { shouldValidate: true });
    setSelctPlan(plan);
  };

  useEffect(() => {
    if (!dutchPay) {
      form.setValue('dutchPayAmount', '0', { shouldValidate: true });
    }
  }, [dutchPay, form]);

  const handleSubmit = (formData: AddUserSubscriptionValues) => {
    onSubmit({
      subscriptionId: Number(id),
      dutchPay: formData.dutchPay,
      dutchPayAmount: formData.dutchPay ? formData.dutchPayAmount : null,
      planId: formData.planId,
      memo: formData.memo,
      startDate: formData.startDate,
      price: formData.dutchPay
        ? formData.dutchPayAmount!
        : String(selectPlan!.price),
      amountUnit: selectPlan!.amountUnit,
    });
  };

  return (
    <>
      <form
        id="add-subscribe-form"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="scrollbar-hide flex-1 overflow-scroll"
      >
        <div className="mb-10 space-y-4">
          <FieldWrapper label="서비스 이름" id="service-name">
            <div className="text-lg">{serviceName}</div>
          </FieldWrapper>

          <Controller
            name="planId"
            control={form.control}
            render={() => (
              <FieldWrapper label="멤버십 종류" id="planId">
                <div
                  className={cn(
                    'w-full cursor-pointer text-lg',
                    selectPlan?.name ? 'text-white' : 'text-sub-font-black',
                  )}
                  onClick={() => setPlan(true)}
                >
                  {selectPlan?.name || '멤버십을 선택해주세요'}
                </div>
              </FieldWrapper>
            )}
          />

          <PlanListBottomModal
            serviceId={id}
            open={plan}
            onClose={() => setPlan(false)}
            onSelect={onSelectPlan}
            defaultValue={planId ? planId.toString() : undefined}
          />

          <Controller
            name="dutchPay"
            control={form.control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="dutchPay"
                  checked={field.value}
                  onClick={() => {
                    field.onChange(!field.value);
                  }}
                  className="data-[state=checked]:bg-primary"
                />
                <label htmlFor="dutchPay" className="cursor-pointer">
                  다른 사람과 함께 이용중이에요
                </label>
              </div>
            )}
          />

          {dutchPay && (
            <Controller
              name="dutchPayAmount"
              control={form.control}
              render={({ field }) => (
                <FieldWrapper label="직접 입력" id="dutchPayAmount">
                  <div className="flex w-full items-center gap-2">
                    <input
                      {...field}
                      type="text"
                      inputMode="numeric"
                      id="dutchPayAmount"
                      className="w-full text-right text-xl outline-none"
                      onChange={(e) => {
                        if (e.target.value.length > 8) return;
                        field.onChange(formatKRWInput(e.target.value));
                      }}
                      value={field.value ?? '0'}
                    />
                    <div className="text-sub-font-black text-lg">원</div>
                  </div>
                </FieldWrapper>
              )}
            />
          )}
          <Controller
            name="startDate"
            control={form.control}
            render={() => (
              <FieldWrapper label="결제 시작일" id="startDate">
                <DatePicker
                  minDate={minDate || addMonths(new Date(), -12)}
                  maxDate={new Date()}
                  onChange={({ year, month, day }) => {
                    const startDate = new Date(
                      Number(year),
                      Number(month) - 1,
                      Number(day),
                    );

                    form.setValue(
                      'startDate',
                      format(startDate, 'yyyy-MM-dd'),
                      {
                        shouldValidate: true,
                      },
                    );
                  }}
                />
              </FieldWrapper>
            )}
          />

          <Controller
            name="memo"
            control={form.control}
            render={({ field }) => (
              <FieldWrapper label="메모" id="memo">
                <textarea
                  name="memo"
                  id="memo"
                  className="scrollbar-hide w-full resize-none text-lg outline-none"
                  placeholder="메모 남기기"
                  value={field.value}
                  onChange={field.onChange}
                />
              </FieldWrapper>
            )}
          />
        </div>
      </form>

      <div>
        <div className="flex items-center justify-between py-5">
          <span className="text-sub-font-black">지출금액</span>
          <span className="text-2xl font-semibold">
            {dutchPay
              ? `${dutchPayAmount} 원`
              : `${Number(selectPlan?.price || 0).toLocaleString()} ${selectPlan?.amountUnit === 'KRW' ? '원' : '$'}`}
          </span>
        </div>

        <Button
          form="add-subscribe-form"
          type="submit"
          disabled={!form.formState.isValid || !selectPlan}
          className="w-full self-end"
        >
          저장하기
        </Button>
      </div>
    </>
  );
}

export default SelectPlanBottomModal;
