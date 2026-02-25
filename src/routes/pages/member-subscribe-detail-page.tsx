import { Button } from '@/components/ui/button';
import useGetMemberSubscribeById from '@/hooks/queries/use-get-member-subscribe-by-id';
import { formatKRWInput, formatUSDInput } from '@/lib/utils';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProccessBarCoin from '@/assets/icons/proccess-bar-icon.svg?react';

import AlarmIcon from '@/assets/icons/alarm-icon.svg?react';
import ReloadIcon from '@/assets/icons/reload-icon.svg?react';
import WalletIcon from '@/assets/icons/wallet-icon.svg?react';
import ConfirmModal from '@/components/modal/confirm-modal';
import MemberSubscribeDetailSkeleton from '@/components/subscribe/member-subscribe/member-subscribe-detail-skeleton';
const formatDateKorean = (dateStr: string) => {
  const [y, m, d] = dateStr.split('-');

  return `${y}년 ${m}월 ${d}일`;
};

function MemberSubscribeDetailpage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const { memberSubscribeId } = useParams();

  const { data: subscribe, isPending: isGetMemberSubscribePending } =
    useGetMemberSubscribeById(memberSubscribeId!);

  const handleClickActivateButtom = () => {
    if (subscribe && !subscribe.active) {
      setModal(true);
    }
  };
  if (isGetMemberSubscribePending) return <MemberSubscribeDetailSkeleton />;

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-between pt-5">
        <div className="mb-5 text-center">
          <img
            src={subscribe!.logoImageUrl}
            className="mx-auto mb-4 size-15 rounded-xl"
          />
          <div>
            <p className="mb-1 text-xl font-semibold">{subscribe!.name}</p>
            <div className="text-[#87888C]">
              {`${
                subscribe!.planAmountUnit === 'KRW'
                  ? `${formatKRWInput(subscribe!.planAmount.toString())}원`
                  : `${formatUSDInput(subscribe!.planAmount.toString())}달러`
              } / ${subscribe!.durationMonths}달`}
            </div>
          </div>
        </div>

        <div className="h-full flex-1 space-y-4">
          {/* process-bar */}
          {subscribe!.active && (
            <div className="bg-box-black rounded-lg p-5">
              <div className="mb-6">
                <p className="text-lg font-semibold">{`${subscribe!.daysUntilPayment}일 뒤 결제`}</p>
                <p className="text-sub-font-black text-sm">
                  {`구독 시작 후 ${subscribe!.daysSinceStart}일이 지났어요`}
                </p>
              </div>

              <div>
                <div className="bg-background-black relative mb-2 h-2.5 w-full rounded-full">
                  <div
                    style={{
                      width: subscribe!.paymentProgressPercent,
                      minWidth: '6%',
                      maxWidth: '100%',
                    }}
                    className={`bg-primary absolute top-0 left-0 h-2.5 rounded-full`}
                  >
                    <div className="relative h-full w-full">
                      <ProccessBarCoin className="absolute top-1/2 right-0 size-6 -translate-y-1/2" />
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  {formatDateKorean(subscribe!.paymentDate.toString())}
                </div>
              </div>
            </div>
          )}

          {!subscribe!.active && (
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
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="bg-box-black flex w-full items-center justify-center gap-1 rounded-lg py-4 font-semibold transition-opacity hover:opacity-80"
              >
                <AlarmIcon />
                <span>알림설정</span>
              </Link>
              <Link
                to="edit/state"
                className="bg-box-black flex w-full items-center justify-center gap-1 rounded-lg py-4 font-semibold transition-opacity hover:opacity-80"
              >
                <ReloadIcon />
                <span>구독 상태 변경</span>
              </Link>
            </div>
          )}

          {/* amount list */}
          <div className="bg-box-black flex items-center justify-between gap-4 rounded-lg p-5">
            <div>
              <div className="font-semibold">지출금액</div>
              <div className="text-sub-font-black text-sm">
                {subscribe!.dutchPay
                  ? '다른 사람과 함께 사용 중이에요'
                  : '혼자 사용 중이에요'}
              </div>
            </div>
            <div className="bg-background-black flex items-center justify-center gap-2 rounded-lg px-4 py-2">
              <WalletIcon className="hidden [@media(width>400px)]:block" />
              <span className="text-sm">
                {`${formatKRWInput(subscribe!.actualPayment.toString())}원`}
              </span>
            </div>
          </div>

          <div className="bg-box-black rounded-lg p-5">
            <div className="mb-4">
              <p className="font-semibold">결제 내역</p>
              <span className="text-sub-font-black text-sm">
                최근 3번의 결제 내역만 확인 가능합니다
              </span>
            </div>

            {subscribe!.spendingRecords.length <= 0 && (
              <p className="text-sub-font-black bg-background-black rounded-lg p-4 text-center text-sm">
                최근 결제 내역이 존재하지 않습니다
              </p>
            )}
            {subscribe!.spendingRecords.length > 0 && (
              <ul className="space-y-4">
                {subscribe!.spendingRecords.map((records) => (
                  <li className="flex items-center gap-2">
                    <img
                      src={subscribe!.logoImageUrl}
                      className="aspect-square size-12.5 rounded-lg"
                    />

                    <div className="flex w-full items-center justify-between">
                      <div>
                        <div className="text-sub-font-black mb-1 text-xs">
                          {subscribe!.name}
                        </div>
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

          <div className="bg-box-black rounded-lg p-5">
            <p className="font-semibold">메모</p>

            {subscribe!.memo.trim().length <= 0 && (
              <p className="text-sm">작성된 메모가 존재하지 않습니다.</p>
            )}
            {subscribe!.memo.trim().length > 0 && <p>{subscribe!.memo}</p>}
          </div>
        </div>

        <div className="pt-5">
          {!subscribe!.active && (
            <Button onClick={handleClickActivateButtom} className="w-full">
              활성화하기
            </Button>
          )}
        </div>
      </div>

      {modal && (
        <ConfirmModal
          title="이전에 저장된 구독 정보를 사용할까요?"
          description="비활성화 이전에 저장된 구독 정보가 있어요. 그대로 사용하면 이전 기록을 이어서 관리할 수 있어요."
          cancelText="새로 등록"
          confirmText="그대로 사용"
          open={modal}
          onOpenChange={() => setModal(false)}
          onConfirm={() =>
            navigate(
              `/member-subscribe/${memberSubscribeId}/reactivate?reuse=previous`,
            )
          }
          onCancel={() =>
            navigate(
              `/member-subscribe/${memberSubscribeId}/reactivate?reuse=custom`,
            )
          }
        />
      )}
    </>
  );
}

export default MemberSubscribeDetailpage;
