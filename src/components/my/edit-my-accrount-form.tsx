import { Controller, useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import FieldWrapper from '../ui/field-wrapper';
import {
  type MyAccountReqType,
  myAccountSchema,
} from '@/schema/my-account-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorMessage from '../ui/error-message';
import { cn } from '@/lib/utils';
import useGetMyAccount from '@/hooks/queries/use-get-my-account';
import useUpdatedMyAccountMutate from '@/hooks/mutations/use-updated-my-account-mutate';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

function EditMyAccountForm() {
  const navigate = useNavigate();
  const [emailDropdown, setEmailDropdown] = useState(false);
  const { data: account, isPending: isGetMyAccountPending } = useGetMyAccount();
  const { mutate: updatedAccount, isPending: isUpdatedAccountPending } =
    useUpdatedMyAccountMutate({
      onSuccess: () => {
        navigate(-1);
        toast.success('정보가 수정 되었습니다', { position: 'bottom-center' });
      },
    });

  const form = useForm<MyAccountReqType>({
    mode: 'all',
    resolver: zodResolver(myAccountSchema),
    defaultValues: {
      email: account?.email ?? '',
      nickname: account?.nickname ?? '',
    },
  });

  const handleSubmit = (formData: MyAccountReqType) => {
    updatedAccount(formData);
  };

  const nicknameValue = form.watch('nickname');
  const emailValue = form.watch('email');

  const isUnchanged =
    nicknameValue === account?.nickname && emailValue === account?.email;
  if (isGetMyAccountPending || !account) return <p>로딩</p>;

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <p className="mb-4 text-xl font-semibold">
          정보를 <br />
          입력해주세요
        </p>

        <form
          id="updatedAccount"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <Controller
            control={form.control}
            name="nickname"
            render={({ field, fieldState }) => (
              <div>
                <FieldWrapper
                  label="이름"
                  id="nickname"
                  error={!!fieldState.error}
                  className={cn(fieldState.error && 'mb-2')}
                >
                  <input
                    className="w-full outline-none"
                    placeholder="이름을 입력해주세요."
                    {...field}
                  />
                </FieldWrapper>
                {fieldState.error && (
                  <ErrorMessage message={fieldState.error.message!} />
                )}
              </div>
            )}
          />

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => {
              const value = field.value ?? '';
              const { local, domain, hasAt } = splitEmail(value);

              const suggestions = () => {
                if (!local) return [];

                const filteredEmail = hasAt
                  ? FrequencyEmails.filter((value) =>
                      value.toLowerCase().startsWith(domain.toLowerCase()),
                    )
                  : FrequencyEmails;

                return filteredEmail.map((value) => `${local}@${value}`);
              };
              const selectEmail = (email: string) => {
                field.onChange(email);
                setEmailDropdown(false);
              };

              return (
                <div>
                  <FieldWrapper
                    label="이메일"
                    id="email"
                    error={!!fieldState.error}
                    className={cn(fieldState.error && 'mb-2')}
                  >
                    <input
                      className="w-full outline-none"
                      placeholder="이메일을 입력해주세요."
                      {...field}
                      onChange={(e) => {
                        setEmailDropdown(true);
                        field.onChange(e);
                      }}
                    />
                    {emailDropdown && suggestions().length > 0 && (
                      <ul className="text-sub-font-black border-background-black w-full space-y-2 border-t pt-2">
                        {suggestions().map((suggestion) => (
                          <li key={suggestion} className="w-full">
                            <button
                              className="w-full cursor-pointer text-start transition-colors hover:text-white"
                              onClick={() => selectEmail(suggestion)}
                            >
                              {suggestion}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </FieldWrapper>
                  {fieldState.error && (
                    <ErrorMessage message={fieldState.error.message!} />
                  )}
                </div>
              );
            }}
          />
        </form>
      </div>

      <Button
        form="updatedAccount"
        disabled={
          !form.formState.isValid || isUpdatedAccountPending || isUnchanged
        }
      >
        저장하기
      </Button>
    </div>
  );
}

export default EditMyAccountForm;
