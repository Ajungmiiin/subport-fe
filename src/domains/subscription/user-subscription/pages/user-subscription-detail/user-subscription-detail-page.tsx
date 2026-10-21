import { Button } from '@/components/ui/button';
import { formatKRWInput, formatUSDInput } from '@/shared/lib/utils';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProccessBarCoin from '@/assets/icons/progressbar-icon.png';

import SettingsIcon from '@/assets/icons/settings-icon.svg?react';
import WalletIcon from '@/assets/icons/wallet.png';
import ConfirmModal from '@/components/modal/confirm-modal';
import { ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import useGetUserSubscriptionById from '@/domains/subscription/user-subscription/hooks/queries/use-get-user-subscription-by-id';
import UserSubscriptionDetailMemo from '@/domains/subscription/user-subscription/pages/user-subscription-detail/components/user-subscription-detail-memo';
import useDeleteUserSubscriptionMutate from '@/domains/subscription/user-subscription/hooks/mutations/use-delete-user-subscription-mutate';
import type { UserSubscriptionSpendingRecord } from '../../types/api';
import UserSubscriptionDetailSkeleton from '@/domains/subscription/user-subscription/components/ui/user-subscription-detail-skeleton';

const formatDateKorean = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-');

  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
};

function UserSubscriptionDetailPage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<'reactivate' | 'delete' | null>(null);
  const { userSubscribeId } = useParams();

  const {
    data: subscribe,
    isPending: isGetUserSubscriptionPending,
    refetch,
  } = useGetUserSubscriptionById(userSubscribeId!);

  const { mutate: deleteUserSubscription } = useDeleteUserSubscriptionMutate({
    onSuccess: () => {
      navigate('/');
      toast.success('정상적으로 삭제되었습니다', { position: 'bottom-center' });
    },
  });

  if (isGetUserSubscriptionPending) return <UserSubscriptionDetailSkeleton />;
  if (!subscribe)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-lg">구독 정보를 불러오지 못했습니다</p>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => refetch()}
            className="rounded-full px-8 py-3 font-semibold"
          >
            다시 시도
          </Button>

          <Button
            onClick={() => navigate('/')}
            className="text-background-black rounded-full bg-white px-8 py-3 font-semibold hover:bg-white"
          >
            돌아가기
          </Button>
        </div>
      </div>
    );
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-between pt-5">
        <div className="mb-5 text-center">
          <UserSubscriptionDetailSummary
            {...subscribe}
            durationMonths={subscribe.durationMonths.toString()}
            planAmount={subscribe.planAmount.toString()}
          />
        </div>

        <div className="h-full flex-1 space-y-4">
          {/* process-bar */}
          {subscribe.active && (
            <UserSubscriptionDetailProgressBar
              {...subscribe}
              paymentDate={subscribe.paymentDate.toString()}
            />
          )}

          {!subscribe.active && (
            <div>
              <p className="mb-2 font-semibold">비활성화된 구독 정보</p>

              <div className="bg-box-black flex items-center justify-between rounded-lg p-4">
                <span className="font-semibold">마지막 결제일</span>
                <span className="text-sm">
                  {formatDateKorean(subscribe!.paymentDate.toString())}
                </span>
              </div>
            </div>
          )}

          {/* action buttom */}
          {subscribe!.active && (
            <Link
              to="edit/state"
              className="bg-box-black flex cursor-pointer items-center justify-between rounded-lg p-4 transition-opacity hover:opacity-80"
            >
              <div>
                <div className="flex w-full items-center justify-start gap-2 font-semibold">
                  <SettingsIcon className="size-6" />
                  <span>구독 상태 변경</span>
                </div>
              </div>
              <ChevronRight strokeWidth={3} />
            </Link>
          )}

          {/* amount list */}
          <UserSubscriptionDetailPaymentSummanry
            dutchPay={subscribe.dutchPay}
            actualPayment={subscribe.actualPayment.toString()}
          />

          <UserSubscriptionDetailPaymentList {...subscribe} />

          <UserSubscriptionDetailMemo
            memo={subscribe!.memo}
            userSubscriptionId={subscribe!.id}
          />
        </div>

        {!subscribe!.active && (
          <div className="flex items-center gap-4 pt-5">
            <Button
              onClick={() => setModal('delete')}
              variant={'secondary'}
              className="w-1/3"
            >
              삭제하기
            </Button>
            <Button onClick={() => setModal('reactivate')} className="flex-1">
              활성화하기
            </Button>
          </div>
        )}
      </div>

      {modal && (
        <ConfirmModal
          title={
            modal === 'reactivate'
              ? '이전에 저장된 구독 정보를 사용할까요?'
              : '구독을 삭제하시겠어요?'
          }
          description={
            modal === 'reactivate'
              ? '비활성화 이전에 저장된 구독 정보가 있어요. 그대로 사용하면 이전 기록을 이어서 관리할 수 있어요.'
              : '삭제하시면 지금까지 남아 있던 기록이 모두 사라집니다.이후 다시 이용하시려면 새로 등록해 주세요.'
          }
          cancelText={modal === 'reactivate' ? '새로 등록' : '아니요'}
          confirmText={modal === 'reactivate' ? '그대로 사용' : '네'}
          open={modal !== null}
          onOpenChange={() => setModal(null)}
          onConfirm={() => {
            if (modal === 'reactivate') {
              navigate(
                `/user-subscription/${userSubscribeId}/reactivate?reuse=previous`,
              );
              return;
            }

            if (modal === 'delete') {
              deleteUserSubscription({
                userSubscriptionId: userSubscribeId!,
              });
            }
          }}
          onCancel={() => {
            if (modal === 'reactivate') {
              navigate(
                `/user-subscription/${userSubscribeId}/reactivate?reuse=custom`,
              );
              return;
            } else {
              setModal(null);
            }
          }}
        />
      )}
    </>
  );
}

function UserSubscriptionDetailSummary({
  logoImageUrl,
  name,
  planAmountUnit,
  planAmount,
  durationMonths,
}: {
  durationMonths: string;
  logoImageUrl: string;
  name: string;
  planAmountUnit: 'KRW' | 'USD';
  planAmount: string;
}) {
  return (
    <>
      <img src={logoImageUrl} className="mx-auto mb-4 size-15 rounded-xl" />
      <div>
        <p className="mb-1 text-xl font-semibold">{name}</p>
        <div className="text-[#87888C]">
          {`${
            planAmountUnit === 'KRW'
              ? `${formatKRWInput(planAmount)}원`
              : `${formatUSDInput(planAmount)}달러`
          } / ${durationMonths}달`}
        </div>
      </div>
    </>
  );
}

function UserSubscriptionDetailProgressBar({
  daysUntilPayment,
  daysSinceStart,
  paymentProgressPercent,
  paymentDate,
}: {
  daysUntilPayment: number;
  daysSinceStart: number;
  paymentProgressPercent: number;
  paymentDate: string;
}) {
  return (
    <div className="bg-box-black rounded-lg p-5">
      <div className="mb-6">
        <p className="text-lg font-semibold">{`${daysUntilPayment}일 뒤 결제`}</p>
        <p className="text-sub-font-black text-sm">
          {`구독 시작 후 ${daysSinceStart}일이 지났어요`}
        </p>
      </div>

      <div>
        <div className="bg-background-black relative mb-2 h-2.5 w-full rounded-full">
          <div
            style={{
              width: `${paymentProgressPercent}%`,
              minWidth: `24px`,
              maxWidth: '100%',
            }}
            className={`bg-primary absolute top-0 left-0 h-2.5 rounded-full`}
          >
            <div className="relative h-full w-full">
              <img
                src={ProccessBarCoin}
                className="absolute top-1/2 right-0 size-6 -translate-y-1/2"
              />
            </div>
          </div>
        </div>
        <div className="text-right text-sm">
          {formatDateKorean(paymentDate)}
        </div>
      </div>
    </div>
  );
}

function UserSubscriptionDetailPaymentSummanry({
  dutchPay,
  actualPayment,
}: {
  dutchPay: boolean;
  actualPayment: string;
}) {
  return (
    <div className="bg-box-black flex items-center justify-between gap-4 rounded-lg p-5">
      <div>
        <div className="font-semibold">지출금액</div>
        <div className="text-sub-font-black text-sm">
          {dutchPay ? '다른 사람과 함께 사용 중이에요' : '혼자 사용 중이에요'}
        </div>
      </div>
      <div className="bg-background-black inline-flex shrink-0 items-center justify-center gap-2 rounded-lg px-4 py-4 whitespace-nowrap">
        <img src={WalletIcon} className="size-5 shrink-0" />
        <span className="shrink-0 text-sm whitespace-nowrap">
          {`${formatKRWInput(actualPayment)}원`}
        </span>
      </div>
    </div>
  );
}

function UserSubscriptionDetailPaymentList({
  spendingRecords,
  logoImageUrl,
  name,
}: {
  name: string;
  logoImageUrl: string;
  spendingRecords: UserSubscriptionSpendingRecord[];
}) {
  return (
    <div className="bg-box-black rounded-lg p-5">
      <div className="mb-4">
        <p className="font-semibold">결제 내역</p>
        <span className="text-sub-font-black text-sm">
          최근 3번의 결제 내역만 확인 가능합니다
        </span>
      </div>

      {spendingRecords.length <= 0 && (
        <p className="text-sub-font-black bg-background-black rounded-lg p-4 text-center text-sm">
          최근 결제 내역이 존재하지 않습니다
        </p>
      )}
      {spendingRecords.length > 0 && (
        <ul className="space-y-4">
          {spendingRecords.map((records, idx) => (
            <li className="flex items-center gap-2" key={`${records}-${idx}`}>
              <img
                src={logoImageUrl}
                className="aspect-square size-12 rounded-lg"
              />

              <div className="flex w-full items-center justify-between">
                <div>
                  <div className="text-sub-font-black mb-1 text-xs">{name}</div>
                  <div>{`${formatKRWInput(records.amount.toString())}원`}</div>
                </div>

                <span className="text-sub-font-black text-sm">
                  {formatDateKorean(records.paymentDate.toString())}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserSubscriptionDetailPage;
