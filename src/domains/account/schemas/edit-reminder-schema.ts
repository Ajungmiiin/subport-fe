import z from 'zod';

export const editReminderSchema = z.object({
  paymentReminderEnabled: z.boolean(),
  reminderDaysBefore: z.number(),
});

export type EditReminderFormValues = z.infer<typeof editReminderSchema>;
