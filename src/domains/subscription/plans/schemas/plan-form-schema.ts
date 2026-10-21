import { deleteComma } from '@/shared/lib/utils';
import { z } from 'zod';

export const planFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, '멤버십 이름은 최소 1글자 이상입니다')
      .max(10, '멤버십 이름은 최대 10글자 이하입니다'),
    amount: z.string().min(1, '멤버십 가격을 입력해주세요'),
    durationMonths: z.string().min(1, '결제 주기를 입력해주세요'),
    amountUnit: z.enum(['KRW', 'USD']),
  })
  .superRefine((values, ctx) => {
    if (values.amount) {
      const normalizedAmount = Number(deleteComma(values.amount));

      if (
        !normalizedAmount ||
        Number.isNaN(normalizedAmount) ||
        normalizedAmount <= 0
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['amount'],
          message: '멤버십 가격은 최소 1원 이상입니다',
        });
      }
    }

    if (values.durationMonths) {
      const normalizedDurationMonths = Number(values.durationMonths);
      if (
        Number.isNaN(normalizedDurationMonths) ||
        normalizedDurationMonths <= 0
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['durationMonths'],
          message: '결제 주기는 최소 1개월 이상입니다',
        });
      } else if (normalizedDurationMonths > 18) {
        ctx.addIssue({
          code: 'custom',
          path: ['durationMonths'],
          message: '결제 주기는 최대 18개월 입니다',
        });
      }
    }
  });

export type PlanFormValues = z.infer<typeof planFormSchema>;
