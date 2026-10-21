import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../../components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { cn } from '@/shared/lib/utils';
import { format } from 'date-fns';

const yearList = Array.from({ length: 12 }, (_, i) => {
  return new Date().getFullYear() - (11 - i);
});

const monthList = Array.from({ length: 12 }, (_, i) => ({
  label: `${i + 1}월`,
  value: i + 1,
}));

interface CalenDerTriggerProps {
  currentDate: Date;
  onMonthChange: (d: Date) => void;
}

function CalenDerTrigger({ currentDate, onMonthChange }: CalenDerTriggerProps) {
  const [mode, setMode] = useState<'year' | 'month'>('year');
  const [open, setOpen] = useState(false);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  return (
    <Popover
      open={open}
      onOpenChange={() => {
        setOpen((prev) => !prev);

        if (!open) {
          setSelectedYear(null);
          setSelectedMonth(null);
          setMode('year');
        }
      }}
    >
      <PopoverTrigger asChild>
        <button className="flex cursor-pointer items-center gap-1 rounded-md bg-[#DFF6F2] px-2 py-1 font-semibold text-black">
          <span>{`${format(currentDate, 'yyyy')}년 ${format(currentDate, 'M')}월 구독비`}</span>
          <ChevronDown className="size-4" strokeWidth={3} />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="bg-box-black rounded-xl border-none"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMode('year')}
            className="w-18 rounded-sm bg-[#EFFBFA] py-1 text-sm text-black"
          >
            {`${currentDate.getFullYear()}년`}
          </button>
          <button
            onClick={() => setMode('month')}
            className="w-18 rounded-sm bg-[#EFFBFA] py-1 text-sm text-black"
          >
            {`${currentDate.getMonth() + 1}월`}
          </button>
        </div>

        <p className="py-4 text-center text-lg font-semibold text-white">
          {mode === 'year' ? '연도선택' : '월 선택'}
        </p>
        <div className="mb-4 grid grid-cols-3 gap-2">
          {mode === 'year' &&
            yearList.map((year) => (
              <div
                onClick={() => {
                  setSelectedYear(year);

                  if (
                    selectedMonth &&
                    selectedMonth > new Date().getMonth() + 1
                  ) {
                    setSelectedMonth(new Date().getMonth() + 1);
                  }
                  setMode('month');
                }}
                key={year}
                className={cn(
                  'text-sub-font-black rounded-sm border px-5 py-0.5',
                  selectedYear?.toString() === year.toString()
                    ? 'border-white text-white'
                    : 'border-box-black',
                )}
              >
                {year}
              </div>
            ))}

          {mode === 'month' &&
            monthList.map((month) => (
              <button
                disabled={
                  Number(selectedYear) === new Date().getFullYear() &&
                  month.value > new Date().getMonth() + 1
                }
                onClick={() => {
                  setSelectedMonth(month.value);
                }}
                key={month.label}
                className={cn(
                  'text-sub-font-black disabled:text-sub-font-black/20 rounded-sm border px-5 py-0.5 text-center',
                  selectedMonth?.toString() === month.value.toString()
                    ? 'border-white text-white'
                    : 'border-box-black',
                )}
              >
                {month.label}
              </button>
            ))}
        </div>

        <div className="flex w-full gap-3">
          <Button
            onClick={() => {
              setSelectedYear(null);
              setSelectedMonth(null);
              setOpen(false);
              setMode('year');
            }}
            variant={'cancel'}
            className="flex-1 rounded-lg py-2"
          >
            취소
          </Button>
          <Button
            disabled={!selectedYear || !selectedMonth}
            onClick={() => {
              onMonthChange(new Date(selectedYear!, selectedMonth! - 1));
              setOpen(false);
              setMode('year');
            }}
            className="flex-1 rounded-lg py-2"
          >
            확인
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default CalenDerTrigger;
