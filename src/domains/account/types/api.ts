export type MyProfileRes = {
  nickname: string;
  joinedDays: number;
};

export type MyAccountRes = {
  id: number;
  nickname: string;
  email: string;
};

export type ReminderSettingsRes = {
  paymentReminderEnabled: boolean;
  reminderDaysBefore: number;
};
