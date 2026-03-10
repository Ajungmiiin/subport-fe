import type { CompletedRecord, OngoingRecord } from '@/api/calender';
import { formatKRWInput } from '@/lib/utils';
import SpendingStateDot from './spending-state-dot';
import DeleteSpendingRecordsButton from './delete-spending-records-button';
import OngoingSpendingRecordButton from './ongoing-spending-record-button';

type SpendingSubscriptionRecordsProps = CompleteListProps | OngoingListProps;

type CompleteListProps = {
  variant: 'complete';
  records: CompletedRecord[];
};
type OngoingListProps = {
  variant: 'ongoing';
  records: OngoingRecord[];
};

function SpendingSubscriptionRecords({
  variant,
  records,
  selectedDate,
}: SpendingSubscriptionRecordsProps & { selectedDate: Date }) {
  return (
    <div>
      <div className="mb-2">
        <p className="flex items-center gap-2">
          <SpendingStateDot state={variant} />
          <span className="font-semibold">
            {variant === 'complete' ? '확정된 구독 내역' : '진행중인 구독 내역'}
          </span>
        </p>
        {variant === 'ongoing' && (
          <span className="text-sub-font-black mt-2 text-sm">
            아직 확정되지 않은 구독이에요
          </span>
        )}
      </div>

      <ul className="bg-box-black flex flex-col rounded-xl p-5">
        {records.map((record) => (
          <li
            key={
              variant === 'complete'
                ? record.memberSubscriptionId
                : record.memberSubscriptionId
            }
            className="border-background-black mb-4 border-b pb-4 last:mb-0 last:border-none last:pb-0"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={record.subscriptionLogoImageUrl}
                  alt={record.subscriptionName}
                  className="size-12 rounded-lg"
                />
                <div className="flex flex-col items-start gap-1 font-semibold">
                  <span>{record.subscriptionName}</span>
                  <span className="text-sub-font-black">{`${formatKRWInput(record.amount.toString())}/${record.period}개월`}</span>
                </div>
              </div>

              {variant === 'complete' && (
                <DeleteSpendingRecordsButton
                  recordId={(
                    record as CompletedRecord
                  ).spendingRecordId.toString()}
                  selectedDate={selectedDate}
                />
              )}

              {variant === 'ongoing' && (
                <OngoingSpendingRecordButton
                  memberSubscribeId={(
                    record as OngoingRecord
                  ).memberSubscriptionId.toString()}
                  selectedDate={selectedDate}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SpendingSubscriptionRecords;
