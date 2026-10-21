import { Button } from '@/components/ui/button';
import ErrorMessage from '@/components/ui/error-message';
import FieldWrapper from '@/components/ui/field-wrapper';
import useUpdatedUserSubscriptionDutchPayMutate from '@/domains/subscription/user-subscription/hooks/mutations/use-updated-user-subscription-dutch-pay-mutate';
import { deleteComma, formatKRWInput } from '@/shared/lib/utils';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

type EditUserSubscriptionDutchPayFormProps = {
  defaultAmount: string;
  defaultDutchPay?: boolean;
};

function EditUserSubscriptionDutchPayForm({
  defaultAmount,
  defaultDutchPay,
}: EditUserSubscriptionDutchPayFormProps) {
  const navigate = useNavigate();
  const { userSubscribeId } = useParams();

  const [dutchPayAmount, setDutchPayAmount] = useState(
    defaultAmount ? formatKRWInput(defaultAmount) : '0',
  );

  const { mutate: updateDutchPay } = useUpdatedUserSubscriptionDutchPayMutate({
    onSuccess: () => {
      navigate(-1);
      toast.success('수정이 완료되었습니다', { position: 'bottom-center' });
    },
  });

  const handleUpdateNotDutchPay = () => {
    updateDutchPay({
      userSubscribeId: userSubscribeId!,
      dutchPay: false,
      dutchPayAmount: null,
    });
  };

  const handleUpdateDutchPay = () => {
    updateDutchPay({
      userSubscribeId: userSubscribeId!,
      dutchPay: true,
      dutchPayAmount: Number(deleteComma(dutchPayAmount)),
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="h-full flex-1">
        <FieldWrapper
          error={!dutchPayAmount}
          label="직접 입력"
          id="dutchPayAmount"
          className="mb-2"
        >
          <div className="flex w-full items-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              id="dutchPayAmount"
              value={dutchPayAmount}
              className="w-full text-right text-xl outline-none"
              onChange={(e) => {
                if (e.target.value.length > 8) return;
                setDutchPayAmount(formatKRWInput(e.target.value));
              }}
            />
            <div className="text-sub-font-black text-lg">원</div>
          </div>
        </FieldWrapper>
        {!dutchPayAmount && <ErrorMessage message="금액을 입력해주세요." />}
      </div>

      <div>
        <div className="mb-4 flex w-full items-center justify-between font-semibold">
          <span className="text-sub-font-black">지출금액</span>
          <div className="text-2xl">{`${formatKRWInput(dutchPayAmount) || 0}원`}</div>
        </div>
        <div className="flex w-full gap-4">
          <Button
            disabled={!defaultDutchPay}
            className="w-[40%] shrink"
            variant={'secondary'}
            onClick={handleUpdateNotDutchPay}
          >
            더치페이 안하기
          </Button>
          <Button
            disabled={
              !dutchPayAmount ||
              Number(deleteComma(dutchPayAmount)) === 0 ||
              defaultAmount
                ? Number(deleteComma(dutchPayAmount)) ===
                  Number(deleteComma(defaultAmount))
                : false
            }
            className="w-full shrink"
            onClick={handleUpdateDutchPay}
          >
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditUserSubscriptionDutchPayForm;
