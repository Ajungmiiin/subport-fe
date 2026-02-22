import { z } from 'zod';

export const addSubscribeSchema = z.object({
  startDate: z.string(),
  memo: z.string(),
  dutchPay: z.boolean(),
  dutchPayAmount: z.string().nullable(),
  planId: z.number(),
});

export const addSubscribeRequestSchema = addSubscribeSchema.extend({
  subscriptionId: z.number(),
});

export type AddSubscribeType = z.infer<typeof addSubscribeSchema>;
export type AddSubscribeRequestType = z.infer<typeof addSubscribeRequestSchema>;
