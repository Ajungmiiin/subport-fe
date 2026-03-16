import BackgroundRectangleImage from '@/assets/background-rectangle-image.png';
import EmptyFileImage from '@/assets/empty-file-image.png';
import FillFileImage from '@/assets/fill-file-image.png';
import { cn, formatKRWInput } from '@/lib/utils';
import { format } from 'date-fns';

type MonthlySpendingCardProps = {
  paidAmount: number;
  totalAmount: number;
  progressPercent: number;
};

function MonthlySpendingCard({
  paidAmount,
  totalAmount,
  progressPercent,
}: MonthlySpendingCardProps) {
  const today = new Date();
  const paidAmountLabel = formatKRWInput(String(paidAmount || 0));
  const totalAmountLabel = formatKRWInput(String(totalAmount || 0));
  const folderImage = totalAmount === 0 ? EmptyFileImage : FillFileImage;

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
          <p className="mt-1 items-end gap-1">
            <span className="text-primary text-xl font-semibold">
              {paidAmountLabel}원
            </span>
            <span className="mx-1">/</span>
            <span>{totalAmountLabel}원</span>
          </p>
        </div>

        <div className="w-full">
          <p className="mb-1 text-right text-xs">{progressPercent}%</p>
          <div className="bg-background-black h-3 overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-[width]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <img
        src={folderImage}
        alt=""
        aria-hidden
        className={cn(
          folderImage === EmptyFileImage ? '-bottom-9' : 'bottom-0',
          'pointer-events-none absolute right-2 z-10 size-28 select-none',
        )}
      />
    </section>
  );
}

export default MonthlySpendingCard;
