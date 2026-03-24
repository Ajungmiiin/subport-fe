import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/text-area';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PEEDBACK_CATEGORIES } from '@/constants/peedback-categories';
import useSendUserComment from '@/hooks/mutations/use-send-user-comment';
import {
  type UserCommentFormPayload,
  type UserCommentFormValues,
  userCommentSchema,
} from '@/schema/user-comment-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function UserCommentPage() {
  const navigate = useNavigate();
  const { mutate: sendUserComment } = useSendUserComment({
    onSuccess: () => {
      navigate('/my', { replace: true });
      toast.success('의견이 성공적으로 전송되었습니다', {
        position: 'bottom-center',
      });
    },
  });

  const form = useForm<UserCommentFormValues, unknown, UserCommentFormPayload>({
    resolver: zodResolver(userCommentSchema),
    defaultValues: {
      category: undefined,
      subCategory: undefined,
      content: '',
    },
  });

  const selectCategory = useWatch({
    control: form.control,
    name: 'category',
  });

  const selectSubCategory = useWatch({
    control: form.control,
    name: 'subCategory',
  });

  const selectedCategory = useMemo(
    () =>
      PEEDBACK_CATEGORIES.find((category) => category.id === selectCategory),
    [selectCategory],
  );

  return (
    <section className="flex h-full flex-col justify-between">
      <p className="mb-6 text-xl font-semibold">
        사용하면서 느낀 점을 <br /> 자유롭게 들려주세요
      </p>

      <form
        id="user-comment-form"
        onSubmit={form.handleSubmit((payload) => {
          sendUserComment(payload);
        })}
        className="flex h-full flex-1 flex-col justify-between pb-4"
      >
        <div className="flex-1">
          <div className="space-y-6">
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <ToggleGroup
                  type="single"
                  spacing={2}
                  className="scrollbar-hide w-full overflow-x-scroll"
                  value={field.value || ''}
                  onValueChange={(value) => {
                    field.onChange(value);

                    if (value === 'category_other') {
                      form.setValue('subCategory', '기타', {
                        shouldValidate: true,
                      });
                    } else {
                      form.setValue('subCategory', '', {
                        shouldValidate: true,
                      });
                    }
                  }}
                >
                  {PEEDBACK_CATEGORIES.map((cateogry) => (
                    <ToggleGroupItem
                      key={cateogry.id}
                      className="min-w-15"
                      value={cateogry.id}
                      id={cateogry.id}
                      onClick={() => {
                        if (selectCategory === cateogry.id) {
                          field.onChange('');
                        }
                      }}
                    >
                      {cateogry.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              )}
            />

            {selectedCategory?.options && (
              <Controller
                name="subCategory"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value || ''}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    className="h-full space-y-3"
                  >
                    {selectedCategory.options.map((option) => (
                      <div key={option.id} className="flex items-center gap-2">
                        <RadioGroupItem
                          variant="dot"
                          value={option.id}
                          id={option.id}
                          onClick={() => {
                            if (selectSubCategory === option.id) {
                              field.onChange('');
                            }
                          }}
                        />
                        <label className="text-sm" htmlFor={option.id}>
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            )}
          </div>
        </div>

        <Controller
          control={form.control}
          name="content"
          render={({ field }) => (
            <Textarea
              placeholder="구체적인 의견을 적어주시면 개선에 큰 도움이 돼요"
              maxLength={300}
              showCount
              {...field}
            />
          )}
        />
      </form>

      <Button
        form="user-comment-form"
        type="submit"
        disabled={!form.formState.isValid}
      >
        제출하기
      </Button>
    </section>
  );
}

export default UserCommentPage;
