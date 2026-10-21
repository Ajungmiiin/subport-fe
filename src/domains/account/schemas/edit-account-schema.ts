import { z } from 'zod';

export const editAccountSchema = z.object({
  nickname: z.string().trim().min(1, '닉네임을 입력해주세요'),
  email: z.email('이메일 형식이어야 합니다'),
});

export type EditAccountValues = z.infer<typeof editAccountSchema>;
