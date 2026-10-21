import { z } from 'zod';

export const addUserSubscriptionSchema = z
  .object({
    startDate: z.string().min(1, '결제 시작일을 선택해주세요'),
    dutchPay: z.boolean(),
    dutchPayAmount: z.string().nullable(),
    planId: z.number({ error: '멤버십을 선택해주세요.' }),
    memo: z.string(),
  })
  .superRefine((values, ctx) => {
    if (!values.dutchPay) return;
    if (values.dutchPay) {
      const amount = values.dutchPayAmount?.replaceAll(',', '').trim();

      if (!amount || Number(amount) < 1) {
        ctx.addIssue({
          code: 'custom',
          path: ['dutchPayAmount'],
          message: '금액을 입력해주세요.',
        });
      }
    }
  });

export type AddUserSubscriptionValues = z.infer<
  typeof addUserSubscriptionSchema
>;
export type AddUserSubscriptionDefaultValues =
  Partial<AddUserSubscriptionValues>;
