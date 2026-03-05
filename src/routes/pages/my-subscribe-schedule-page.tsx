import SpendingSubscriptionRecords from '@/components/my/spending-subscription-records';
import SubscribeCalender from '@/components/my/subscribe-calender';
import useGetSpendingRecords from '@/hooks/queries/use-get-spending-records';
import useGetSpendingRecordsByDate from '@/hooks/queries/use-get-spending-records-by-date';
import { format, startOfMonth } from 'date-fns';
import { useState } from 'react';

function MySubscribeSchedulePage() {
  const [viewMonth, setViewMonth] = useState<Date>(startOfMonth(new Date()));
  const [selectedDay, setSelectedDay] = useState<undefined | Date>(undefined);

  const { data: spendingRecords, isPending: isGetSpendingRecords } =
    useGetSpendingRecords(viewMonth);

  const { data: spendingRecordsByDate, isPending: isGetSpendingRecordsByDate } =
    useGetSpendingRecordsByDate(selectedDay);
  console.log(selectedDay);

  if (isGetSpendingRecords) return null;
  if (!spendingRecords) return null;

  return (
    <div>
      <div>
        <SubscribeCalender
          paymentDates={spendingRecords.paymentDates}
          totalAmount={spendingRecords.totalAmount}
          amountDiffFromPreviousMonth={
            spendingRecords.amountDiffFromPreviousMonth
          }
          onMonthChange={(d: Date) => setViewMonth(d)}
          onSelectDay={(d: Date | undefined) => setSelectedDay(d)}
          viewMonth={viewMonth}
          selectedDay={selectedDay}
        />
      </div>

      <div aria-hidden className="bg-box-black w-vw z-30 -mx-6 my-5 h-2.5" />

      <div className="scrollbar-hide h-full space-y-4 overflow-y-scroll pb-5">
        {selectedDay && (
          <p className="text-xl font-semibold">{`${format(selectedDay, 'M')}월 ${format(selectedDay, 'd')}일`}</p>
        )}

        {spendingRecordsByDate && (
          <>
            {spendingRecordsByDate.completedRecords.length > 0 && (
              <SpendingSubscriptionRecords
                variant="complete"
                records={spendingRecordsByDate.completedRecords}
              />
            )}

            {spendingRecordsByDate.ongoingRecords.length > 0 && (
              <SpendingSubscriptionRecords
                variant="ongoing"
                records={spendingRecordsByDate.ongoingRecords}
              />
            )}

            {spendingRecordsByDate.completedRecords.length === 0 &&
              spendingRecordsByDate.ongoingRecords.length === 0 && (
                <p className="text-sub-font-black h-full py-10 text-center">
                  결제 내역이 존재하지 않습니다
                </p>
              )}
          </>
        )}
      </div>
    </div>
  );
}

export default MySubscribeSchedulePage;
