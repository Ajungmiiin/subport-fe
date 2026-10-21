import { client } from '@/shared/api/client';
import type {
  MyAccountRes,
  MyProfileRes,
  ReminderSettingsRes,
} from '../types/api';
import type { EditAccountValues } from '../schemas/edit-account-schema';

export const getMyProfile = async () => {
  const response = await client.get<MyProfileRes>('/api/members/me/profile');

  return response.data;
};

export const getMyAccount = async () => {
  const response = await client.get<MyAccountRes>('/api/members/me');

  return response.data;
};

export const updatedMyAccount = async (updatedAccount: EditAccountValues) => {
  const response = await client.put<MyAccountRes>(
    '/api/members/me',
    updatedAccount,
  );

  return response.data;
};

export const deleteProfile = async () => {
  const response = await client.delete('/api/members/me');

  return response.data;
};

type ReminderReqType =
  | {
      paymentReminderEnabled: true;
      reminderDaysBefore: number;
    }
  | {
      paymentReminderEnabled: false;
    };

export const getReminderSettings = async () => {
  const response = await client.get<ReminderSettingsRes>(
    '/api/members/me/reminder-settings',
  );

  return response.data;
};

export const updatedReminderSettings = async (
  reminderSettings: ReminderReqType,
) => {
  const response = await client.put<ReminderSettingsRes>(
    '/api/members/me/reminder-settings',
    reminderSettings,
  );

  return response.data;
};
