import DatePicker from '@/components/form/date-picker';
import { Button } from '@/components/ui/button';
import FieldWrapper from '@/components/ui/field-wrapper';

type MemberSubscribeDateFormProps = {
  onChange: (selectDate: Date) => void;
  onSubmit: () => void;
  lastPaymentDate: Date;
};

function MemberSubscribeDateForm({
  onChange,
  onSubmit,
  lastPaymentDate,
}: MemberSubscribeDateFormProps) {
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

export default MemberSubscribeDateForm;
