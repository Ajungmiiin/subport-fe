import BackgroundRectangleImage from '@/assets/background-rectangle-image.png';
import EmptyFileImage from '@/assets/empty-file-image.png';
import FillFileImage from '@/assets/fill-file-image.png';
import useGetUserSubscriptionMonthlySummary from '@/domains/subscription/user-subscription/hooks/use-get-user-subscription-monthly-summary';
import { cn, formatKRWInput } from '@/shared/lib/utils';
import { format } from 'date-fns';
import { Loader2 } from 'lucide-react';

function MonthlySpendingCard() {
  const { data: monthlySummary, isPending: isGetMonthlySummaryPending } =
    useGetUserSubscriptionMonthlySummary();

  const today = new Date();

  if (isGetMonthlySummaryPending)
    return (
      <div className="bg-box-black flex h-52.5 w-full items-center justify-center rounded-2xl">
        <Loader2 className="stroke-primary animate-spin" />
      </div>
    );

  if (!monthlySummary)
    return (
      <div className="bg-box-black flex h-52.5 w-full items-center justify-center rounded-2xl">
        데이터를 불러오지 못했습니다.
      </div>
    );

  const paidAmountLabel = formatKRWInput(
    String(monthlySummary.currentMonthPaidAmount || 0),
  );
  const totalAmountLabel = formatKRWInput(
    String(monthlySummary.currentMonthTotalAmount || 0),
  );
  const folderImage =
    monthlySummary.currentMonthTotalAmount === 0
      ? EmptyFileImage
      : FillFileImage;

  return (
    <section className="relative h-55 w-full overflow-hidden rounded-xl">
      <div className="absolute inset-x-0 bottom-0 h-52.5 rounded-xl bg-[#313137A6]" />

      <img
        src={BackgroundRectangleImage}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        aria-hidden
      />

      <p className="absolute top-4 right-4 z-10 text-xs">
        {format(today, 'M월 d일 기준')}
      </p>

      <div className="relative z-10 flex h-full w-[65%] flex-col justify-end px-6 py-6">
        <div className="mb-9">
          <p className="text-sm">{format(today, 'M월')} 구독 지출</p>
          <p className="mt-1 items-end gap-1 text-nowrap">
            <span className="text-primary text-xl font-semibold">
              {paidAmountLabel}원
            </span>
            <span className="mx-1">/</span>
            <span>{totalAmountLabel}원</span>
          </p>
        </div>

        <div className="w-full">
          <p className="mb-1 text-right text-xs">
            {monthlySummary.paymentProgressPercent}%
          </p>
          <div className="bg-background-black h-3 overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-[width]"
              style={{ width: `${monthlySummary.paymentProgressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <img
        src={folderImage}
        alt=""
        aria-hidden
        className={cn(
          folderImage === EmptyFileImage ? '-bottom-9' : '-bottom-3',
          'pointer-events-none absolute right-2 z-10 size-28 select-none',
        )}
      />
    </section>
  );
}

export default MonthlySpendingCard;
