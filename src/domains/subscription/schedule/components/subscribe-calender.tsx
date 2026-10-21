import 'react-day-picker/style.css';

import { addMonths, isAfter, startOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker } from 'react-day-picker';
import { cn, formatKRWInput } from '@/shared/lib/utils';
import CalenDerTrigger from './calender-trigger';
import SpendingStateDot from './spending-state-dot';
import { useRef } from 'react';
import type { PaymentDates } from '@/domains/subscription/schedule/types/api';

interface SubscribeCalenderProps {
  totalAmount: number;
  amountDiffFromPreviousMonth: number;
  onMonthChange: (d: Date) => void;
  onSelectDay: (d: Date | undefined) => void;
  viewMonth: Date;
  selectedDay: Date | undefined;
  paymentDates: PaymentDates;
}

function SubscribeCalender({
  totalAmount,
  amountDiffFromPreviousMonth,
  onMonthChange,
  onSelectDay,
  viewMonth,
  selectedDay,
  paymentDates,
}: SubscribeCalenderProps) {
  const clientX = useRef(0);
  const clientY = useRef(0);
  return (
    <>
      <CalenDerTrigger onMonthChange={onMonthChange} currentDate={viewMonth} />

      <div className="py-4">
        <p className="text-2xl font-semibold">{`${formatKRWInput(totalAmount.toString())}원`}</p>
        <p
          className={cn(
            amountDiffFromPreviousMonth < 0
              ? 'text-[#5EC3B6]'
              : amountDiffFromPreviousMonth === 0
                ? 'text-white'
                : 'text-d-day-color-7day',
            'text-sm',
          )}
        >
          {amountDiffFromPreviousMonth < 0
            ? `지난달보다 ${formatKRWInput(Math.abs(amountDiffFromPreviousMonth).toString())}원 줄었어요`
            : amountDiffFromPreviousMonth === 0
              ? '지난달과 동일해요'
              : `지난달보다 ${formatKRWInput(amountDiffFromPreviousMonth.toString())}원 늘었어요`}
        </p>
      </div>

      <div
        onTouchStart={(e) => {
          clientX.current = e.touches[0].clientX;
          clientY.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          const endX = e.changedTouches[0]?.clientX;
          const endY = e.changedTouches[0]?.clientY;
          const deltaX = endX - clientX.current;
          const deltaY = endY - clientY.current;
          const swipeThreshold = 40;

          if (
            Math.abs(deltaX) < swipeThreshold ||
            Math.abs(deltaX) <= Math.abs(deltaY)
          ) {
            return;
          }

          const nextMonth = addMonths(viewMonth, deltaX < 0 ? 1 : -1);

          if (isAfter(startOfMonth(nextMonth), startOfMonth(new Date()))) {
            return;
          }
          onSelectDay(undefined);
          onMonthChange(nextMonth);
        }}
      >
        <DayPicker
          month={viewMonth}
          required
          showOutsideDays
          animate
          mode="single"
          selected={selectedDay}
          onSelect={onSelectDay}
          hideNavigation
          locale={ko}
          lang="ko-KR"
          classNames={{
            months: 'w-full',
            month_grid: 'w-full',
            outside: 'bg-background-black',
            day: ' relative bg-box-black  rounded-lg w-1/7 border-2 border-box-black transition-all',
            day_button:
              'flex w-full h-full items-end  pt-5 [@media(min-width:390px)]:pt-7  [@media(min-width:430px)]:pt-8  pb-1 justify-center cursor-pointer',
            week: 'flex justify-between gap-1.5',
            weeks: 'space-y-1.5',
            weekdays: 'flex justify-between',
            weekday: 'w-[42px] text-sub-font-black font-medium text-sm py-2',
            selected: 'border-2  border-white',
            today: '',
          }}
          components={{
            Day: ({ day, children, ...rest }) => {
              const date = day.date.getDate();
              const hasSpending = !!paymentDates[date];
              return (
                <>
                  <td {...rest}>
                    {!day.outside && hasSpending && (
                      <div className="absolute top-1.5 right-1.5 flex items-center gap-0.5">
                        {paymentDates[date].hasSubscription && (
                          <SpendingStateDot state={'ongoing'} />
                        )}
                        {paymentDates[date].hasSpending && (
                          <SpendingStateDot state={'complete'} />
                        )}
                      </div>
                    )}

                    {children}
                  </td>
                </>
              );
            },
          }}
          disabled={(date) =>
            date.getMonth() !== viewMonth?.getMonth() ||
            date.getFullYear() !== viewMonth?.getFullYear()
          }
        />
      </div>
    </>
  );
}

export default SubscribeCalender;
