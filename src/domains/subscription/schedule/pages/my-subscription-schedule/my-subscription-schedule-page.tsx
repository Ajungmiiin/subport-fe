import SpendingSubscriptionRecords from '@/domains/subscription/schedule/components/spending-subscription-records';
import SubscribeCalender from '@/domains/subscription/schedule/components/subscribe-calender';
import useGetSpendingRecords from '@/domains/subscription/schedule/hooks/queries/use-get-spending-records';
import useGetSpendingRecordsByDate from '@/domains/subscription/schedule/hooks/queries/use-get-spending-records-by-date';
import { format } from 'date-fns';

import useGetCalenderDate from '../../hooks/use-get-calender-date';
import SpendingRecordsDateSkeleton from './components/spending-records-date-skeleton';

function MySubscriptionSchedulePage() {
  const { month, selectedDate, onMonthChange, onSelectDay } =
    useGetCalenderDate();

  const { data: spendingRecords, isPending: isGetSpendingRecords } =
    useGetSpendingRecords(month);

  const {
    data: spendingRecordsByDate,
    isPending: isGetSpendingRecordsDatePending,
  } = useGetSpendingRecordsByDate(selectedDate);

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
          onMonthChange={onMonthChange}
          onSelectDay={onSelectDay}
          viewMonth={month}
          selectedDay={selectedDate}
        />
      </div>

      <div aria-hidden className="bg-box-black w-vw z-30 -mx-6 my-5 h-2.5" />

      <div className="scrollbar-hide h-full space-y-4 overflow-y-scroll">
        {selectedDate && (
          <>
            <p className="text-xl font-semibold">{`${format(selectedDate, 'M')}월 ${format(selectedDate, 'd')}일`}</p>

            {isGetSpendingRecordsDatePending && <SpendingRecordsDateSkeleton />}

            {!isGetSpendingRecordsDatePending && spendingRecordsByDate && (
              <>
                {spendingRecordsByDate.completedRecords.length > 0 && (
                  <SpendingSubscriptionRecords
                    selectedDate={selectedDate}
                    variant="complete"
                    records={spendingRecordsByDate.completedRecords}
                  />
                )}

                {spendingRecordsByDate.ongoingRecords.length > 0 && (
                  <SpendingSubscriptionRecords
                    selectedDate={selectedDate}
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
          </>
        )}
      </div>
    </div>
  );
}

export default MySubscriptionSchedulePage;
