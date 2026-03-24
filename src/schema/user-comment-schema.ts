import { PEEDBACK_CATEGORIES } from '@/constants/peedback-categories';
import z from 'zod';

export const userCommentSchema = z
  .object({
    category: z.enum(['feature', 'bug-report', 'usability', 'category_other']),
    subCategory: z.string().min(1, '세부 항목을 선택해주세요.'),
    content: z.string(),
  })
  .superRefine((data, ctx) => {
    const isOther =
      data.category === 'category_other' || data.subCategory === 'other';

    if (isOther && data.content.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        path: ['content'],
        message: '내용을 입력해주세요',
      });
    }
  })
  .transform((data) => {
    const selectedCategory = PEEDBACK_CATEGORIES.find(
      (category) => data.category === category.id,
    );

    const selectedSubCategory = selectedCategory?.options?.find(
      (option) => option.id === data.subCategory,
    );

    return {
      category: selectedCategory!.label,
      subCategory:
        selectedCategory!.id === 'category_other'
          ? selectedCategory!.label
          : (selectedSubCategory!.value ?? ''),
      content: data.content.trim() || null,
    };
  });

export type UserCommentFormValues = z.input<typeof userCommentSchema>;
export type UserCommentFormPayload = z.output<typeof userCommentSchema>;
export type UserCommentFormType = z.infer<typeof userCommentSchema>;
