import AddSubscribeForm from '@/components/subscribe/add-subscribe-form';
import MemberSubscribeDateForm from '@/components/subscribe/member-subscribe/member-subscribe-date-form';

import useMemberSubscribeActivateMutate from '@/hooks/mutations/use-member-subscribe-activate-mutate';
import useGetMemberSubscribeById from '@/hooks/queries/use-get-member-subscribe-by-id';
import { deleteComma } from '@/lib/utils';
import { format, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const VALID_REUSE = new Set(['previous', 'custom'] as const);
type ReuseMode = 'previous' | 'custom';

function MemberSubscribeReactivatePage() {
  const [date, setDate] = useState(format(new Date(), ' yyyy-MM-dd'));
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { memberSubscribeId } = useParams();

  const reuse = searchParams.get('reuse');
  const isValidReuse = reuse !== null && VALID_REUSE.has(reuse as ReuseMode);

  const { data: subscribe, isPending: isGetMemberSubscribePending } =
    useGetMemberSubscribeById(memberSubscribeId!);

  const { mutate: activateMemberSubscribe } = useMemberSubscribeActivateMutate({
    onSuccess: () => {
      navigate(-1);
      toast.success('구독이 다시 활성화 되었습니다', {
        position: 'bottom-center',
      });
    },
  });

  useEffect(() => {
    if (!isValidReuse) navigate(-1);
  }, [isValidReuse, navigate, memberSubscribeId]);

  if (!isValidReuse) return null;
  if (isGetMemberSubscribePending) return <p>로딩</p>;

  const onChangeStartDate = (selectDate: Date) => {
    setDate(format(selectDate, 'yyyy-MM-dd'));
  };

  console.log(date);
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
    activateMemberSubscribe({
      memberSubscribeId: memberSubscribeId!,
      memberSubscribeInfo: {
        reusePreviousInfo: false,
        ...formData,
        dutchPayAmount: formData.dutchPay
          ? Number(deleteComma(formData.dutchPayAmount as string))
          : null,
      },
    });
  };

  const onSubmitReactivatePrevious = () => {
    activateMemberSubscribe({
      memberSubscribeId: memberSubscribeId!,
      memberSubscribeInfo: {
        reusePreviousInfo: true,
        startDate: format(date, 'yyyy-MM-dd'),
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
        <AddSubscribeForm
          minDate={parse(
            subscribe!.paymentDate.toString(),
            'yyyy-MM-dd',
            new Date(),
          )}
          id={subscribe!.subscriptionId.toString()}
          onSubmit={onSubmitReactivateCustom}
        />
      )}
      {reuse === 'previous' && (
        <div className="flex h-full flex-col justify-between">
          <MemberSubscribeDateForm
            lastPaymentDate={parse(
              subscribe!.paymentDate.toString(),
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

export default MemberSubscribeReactivatePage;
