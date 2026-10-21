import z from 'zod';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const customServicesSchema = z.object({
  type: z.string(),
  name: z
    .string('서비스 이름을 입력해주세요')
    .trim()
    .min(1, '서비스 이름은 최소 1글자 이상입니다')
    .max(10, '서비스 이름은 최대 10글자 입니다'),
  image: z
    .instanceof(File)
    .nullable()
    .refine(
      (file) => !file || file.size <= MAX_IMAGE_SIZE,
      '이미지 파일의 크기는 5MB를 초과할 수 없습니다',
    ),
  defaultImageName: z.string().nullable(),
});

export type AddCustomServicesReq = z.infer<typeof customServicesSchema>;
