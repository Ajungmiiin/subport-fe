import { useState } from 'react';

import { ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import Picker from 'react-mobile-picker';
import { format } from 'date-fns';
import {
  getDaysByMonthRange,
  getMonthRange,
  getMonthsByMonthRange,
  getYearsByMonthRange,
} from '@/lib/date-utils';

type DateState = {
  year: string;
  month: string;
  day: string;
};

const today = new Date();
const year = format(today, 'yyyy');
const m = format(today, 'MM');
const d = format(today, 'dd');

function pickCloset(values: string[], target: string) {
  if (values.length === 0) return target;
  const targetNum = Number(target);
  return values.reduce((prev, cur) =>
    Math.abs(Number(cur) - targetNum) < Math.abs(Number(prev) - targetNum)
      ? cur
      : prev,
  );
}

function DatePicker({
  minDate,
  maxDate,
  onChange,
}: {
  minDate: Date;
  maxDate: Date;
  onChange: (value: DateState) => void;
}) {
  const monthRange = getMonthRange(minDate, today);
  const years = getYearsByMonthRange(monthRange);
  const [selectDate, setSelectDate] = useState(false);

  const [pickerValue, setPickerValue] = useState<DateState>({
    year: year,
    month: m,
    day: d,
  });
  const normalizePickerValue = (nextValue: DateState) => {
    const nextYear = years.includes(nextValue.year)
      ? nextValue.year
      : (years[0] ?? nextValue.year);

    const months = getMonthsByMonthRange(monthRange, nextYear);
    const monthIsValid = months.includes(nextValue.month);
    const nextMonth = monthIsValid
      ? nextValue.month
      : pickCloset(months, nextValue.month);

    const forcedDay = monthIsValid ? nextValue.day : '01';
    // month가 유효하지 않은 month라면 첫날로

    const days = getDaysByMonthRange({
      year: nextYear,
      month: nextMonth,
      minDate,
      maxDate: today,
    });

    const nextDay = days.includes(forcedDay)
      ? forcedDay
      : (days[0] ?? forcedDay);
    return {
      year: nextYear,
      month: nextMonth,
      day: nextDay,
    };
  };

  return (
    <>
      <div className="w-full">
        <div
          className="flex cursor-pointer items-center justify-between"
          onClick={() => setSelectDate((prev) => !prev)}
        >
          <span className="text-lg">{`${pickerValue.year}년 ${pickerValue.month}월 ${pickerValue.day}일`}</span>
          <ChevronUp
            className={cn('transition-all', selectDate ? '' : 'rotate-180')}
          />
        </div>

        <div
          className={cn(
            selectDate ? 'border-background-black mt-2 border-t pt-2' : '',
            'w-full',
          )}
        >
          <Picker
            height={selectDate ? 100 : 0}
            aria-hidden={!selectDate}
            wheelMode="natural"
            value={pickerValue}
            onChange={(nextValue) => {
              setPickerValue(normalizePickerValue(nextValue));

              onChange(nextValue);
            }}
            className="transition-all [&>div:last-child]:rounded-lg [&>div:last-child]:bg-[#B1DFDA] [&>div:last-child>div]:hidden"
          >
            <Picker.Column name="year" className="z-10">
              {years.map((y) => (
                <Picker.Item key={y} value={y}>
                  {({ selected }) => (
                    <div
                      className={cn(
                        selected
                          ? 'text-background-black'
                          : 'text-sub-font-black',
                        'transition-colors',
                      )}
                    >
                      {y}년
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>

            <Picker.Column name="month" className="z-10">
              {getMonthsByMonthRange(monthRange, pickerValue.year).map(
                (month) => (
                  <Picker.Item key={month} value={month}>
                    {({ selected }) => (
                      <div
                        className={cn(
                          selected
                            ? 'text-background-black'
                            : 'text-sub-font-black',
                          'transition-colors',
                        )}
                      >
                        {month}월
                      </div>
                    )}
                  </Picker.Item>
                ),
              )}
            </Picker.Column>

            <Picker.Column name="day" className="z-10">
              {getDaysByMonthRange({
                year: pickerValue.year,
                month: pickerValue.month,
                minDate,
                maxDate,
              }).map((day) => (
                <Picker.Item key={day} value={day}>
                  {({ selected }) => (
                    <div
                      className={cn(
                        selected
                          ? 'text-background-black'
                          : 'text-sub-font-black',
                        'transition-colors',
                      )}
                    >
                      {day}일
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          </Picker>
        </div>
      </div>
    </>
  );
}

export default DatePicker;
