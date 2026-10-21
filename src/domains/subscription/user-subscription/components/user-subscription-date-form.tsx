import DatePicker from '@/shared/form/date-picker';
import { Button } from '@/components/ui/button';
import FieldWrapper from '@/components/ui/field-wrapper';

type UserSubscriptionDateFormProps = {
  onChange: (selectDate: Date) => void;
  onSubmit: () => void;
  lastPaymentDate: Date;
};

function UserSubscriptionDateForm({
  onChange,
  onSubmit,
  lastPaymentDate,
}: UserSubscriptionDateFormProps) {
  return (
    <>
      <FieldWrapper label="결제 시작일" id="startDate">
        <DatePicker
          minDate={lastPaymentDate}
          maxDate={new Date()}
          onChange={({ year, month, day }) => {
            const startDate = new Date(
              Number(year),
              Number(month) - 1,
              Number(day),
            );

            onChange(startDate);
          }}
        />
      </FieldWrapper>

      <Button className="w-full" onClick={onSubmit}>
        저장하기
      </Button>
    </>
  );
}

export default UserSubscriptionDateForm;
