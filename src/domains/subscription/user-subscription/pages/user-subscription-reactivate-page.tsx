import AddUserSubscriptionForm from '@/domains/subscription/user-subscription/components/add-user-subscription-form';

import { deleteComma } from '@/shared/lib/utils';
import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import useActivateUserSubscriptionMutate from '@/domains/subscription/user-subscription/hooks/mutations/use-activate-user-subscription-mutate';
import useGetUserSubscriptionById from '@/domains/subscription/user-subscription/hooks/queries/use-get-user-subscription-by-id';
import UserSubscriptionDateForm from '@/domains/subscription/user-subscription/components/user-subscription-date-form';

const VALID_REUSE = new Set(['previous', 'custom'] as const);
type ReuseMode = 'previous' | 'custom';

function UserSubscriptionReactivatePage() {
  const [startDate, setStartDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { userSubscribeId } = useParams();

  const reuse = searchParams.get('reuse');
  const isValidReuse = reuse !== null && VALID_REUSE.has(reuse as ReuseMode);

  const { data: subscribe, isPending: isGetUserSubscriptionPending } =
    useGetUserSubscriptionById(userSubscribeId!);

  const { mutate: activateUserSubscription } =
    useActivateUserSubscriptionMutate({
      onSuccess: () => {
        navigate(-1);
        toast.success('구독이 다시 활성화 되었습니다', {
          position: 'bottom-center',
        });
      },
    });

  useEffect(() => {
    if (!isValidReuse) navigate(`/user-subscription/${userSubscribeId}`);
  }, [isValidReuse, navigate, userSubscribeId]);

  if (!isValidReuse) return null;
  if (isGetUserSubscriptionPending) return null;
  if (!subscribe) return null;

  const onChangeStartDate = (selectDate: Date) => {
    setStartDate(format(selectDate, 'yyyy-MM-dd'));
  };

  const onSubmitReactivateCustom = (
    formData: {
      startDate: string;
      memo: string;
      dutchPay: boolean;
      dutchPayAmount: string | null;
      planId: number;
    } & {
      subscriptionId: number;
      price: string;
      amountUnit: 'KRW' | 'USD';
    },
  ) => {
    activateUserSubscription({
      userSubscriptionId: userSubscribeId!,
      userSubscriptionInfo: {
        reusePreviousInfo: false,
        ...formData,
        dutchPayAmount: formData.dutchPay
          ? Number(deleteComma(formData.dutchPayAmount as string))
          : null,
      },
    });
  };

  const onSubmitReactivatePrevious = () => {
    activateUserSubscription({
      userSubscriptionId: userSubscribeId!,
      userSubscriptionInfo: {
        reusePreviousInfo: true,
        startDate,
      },
    });
  };
  return (
    <div className="flex h-full flex-col">
      <p className="mr-auto mb-5 w-[50%] text-xl/relaxed font-semibold break-keep">
        {reuse === 'custom'
          ? '구독 서비스 정보를 입력해주세요'
          : '결제 시작을 설정해 주세요'}
      </p>

      {reuse === 'custom' && (
        <AddUserSubscriptionForm
          serviceName={subscribe.name}
          minDate={parse(
            subscribe.paymentDate.toString(),
            'yyyy-MM-dd',
            new Date(),
          )}
          id={subscribe.subscriptionId.toString()}
          onSubmit={onSubmitReactivateCustom}
        />
      )}

      {reuse === 'previous' && (
        <div className="flex h-full flex-col justify-between">
          <UserSubscriptionDateForm
            lastPaymentDate={parse(
              subscribe.paymentDate.toString(),
              'yyyy-MM-dd',
              new Date(),
            )}
            onChange={onChangeStartDate}
            onSubmit={onSubmitReactivatePrevious}
          />
        </div>
      )}
    </div>
  );
}

export default UserSubscriptionReactivatePage;
