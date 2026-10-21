import { useForm, useFormState, useWatch } from 'react-hook-form';
import { Button } from '../../../../../components/ui/button';
import FieldWrapper from '../../../../../components/ui/field-wrapper';

import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../../../../../components/ui/error-message';
import { cn } from '@/shared/lib/utils';
import useGetMyAccount from '@/domains/account/hooks/queries/use-get-my-account';
import useUpdatedMyAccountMutate from '@/domains/account/hooks/mutations/use-updated-my-account-mutate';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  editAccountSchema,
  type EditAccountValues,
} from '@/domains/account/schemas/edit-account-schema';
import PageLoader from '@/components/ui/page-loader';

const FrequencyEmails = [
  'naver.com',
  'gmail.com',
  'hanmail.net',
  'kakao.com',
  'daum.net',
  'nate.com',
];

const splitEmail = (v: string) => {
  const atIndex = v.indexOf('@');
  if (atIndex === -1) return { local: v, domain: '', hasAt: false };

  return {
    local: v.slice(0, atIndex),
    domain: v.slice(atIndex + 1),
    hasAt: true,
  };
};

function EditAccountForm() {
  const navigate = useNavigate();
  const [emailDropdown, setEmailDropdown] = useState(false);
  const { data: account, isPending: isGetMyAccountPending } = useGetMyAccount();

  const { mutate: updatedAccount, isPending: isUpdating } =
    useUpdatedMyAccountMutate({
      onSuccess: () => {
        navigate(-1);
        toast.success('정보가 수정 되었습니다', { position: 'bottom-center' });
      },
    });

  const form = useForm<EditAccountValues>({
    mode: 'all',
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      email: '',
      nickname: '',
    },
  });

  const { errors, isDirty, isValid, isValidating } = useFormState({
    control: form.control,
  });

  const nicknameField = form.register('nickname');

  const emailField = form.register('email');
  const emailValue = useWatch({ control: form.control, name: 'email' });

  const { local, domain, hasAt } = splitEmail(emailValue);

  const suggestions = !local
    ? []
    : (hasAt
        ? FrequencyEmails.filter((value) =>
            value.toLowerCase().startsWith(domain.toLowerCase()),
          )
        : FrequencyEmails
      ).map((value) => `${local}@${value}`);

  useEffect(() => {
    if (!account || isDirty) return;

    form.reset({
      email: account.email,
      nickname: account.nickname,
    });
  }, [account, isDirty, form]);

  const handleSubmit = (formData: EditAccountValues) => {
    updatedAccount(formData);
  };

  if (isGetMyAccountPending || !account)
    return <PageLoader label="계정 정보를 불러오는 중..." />;

  return (
    <>
      <form
        id="updatedAccount"
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex-1 space-y-4"
      >
        <div>
          <FieldWrapper
            label="이름"
            id="nickname"
            error={!!errors.nickname}
            className={cn(errors.nickname && 'mb-2')}
          >
            <input
              className="w-full outline-none"
              placeholder="이름을 입력해주세요."
              {...nicknameField}
            />
          </FieldWrapper>
          {errors.nickname && (
            <ErrorMessage message={errors.nickname.message!} />
          )}
        </div>

        <div>
          <FieldWrapper
            label="이메일"
            id="email"
            error={!!errors.email}
            className={cn(errors.email && 'mb-2')}
          >
            <input
              className="w-full outline-none"
              placeholder="이메일을 입력해주세요."
              {...emailField}
              onChange={(e) => {
                setEmailDropdown(true);
                emailField.onChange(e);
              }}
            />
            {emailDropdown && suggestions.length > 0 && (
              <ul className="text-sub-font-black border-background-black w-full space-y-2 border-t pt-2">
                {suggestions.map((suggestion) => (
                  <li key={suggestion} className="w-full">
                    <button
                      type="button"
                      className="w-full cursor-pointer text-start transition-colors hover:text-white"
                      onClick={() => {
                        form.setValue('email', suggestion, {
                          shouldDirty: true,
                          shouldValidate: true,
                          shouldTouch: true,
                        });
                        setEmailDropdown(false);
                      }}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </FieldWrapper>
          {errors.email && <ErrorMessage message={errors.email.message!} />}
        </div>
      </form>
      <Button
        form="updatedAccount"
        disabled={!isDirty || !isValid || isValidating || isUpdating}
      >
        저장하기
      </Button>
    </>
  );
}

export default EditAccountForm;
