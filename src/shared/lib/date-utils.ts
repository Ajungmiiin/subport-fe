import {
  addMonths,
  endOfMonth,
  format,
  isAfter,
  isSameMonth,
  startOfMonth,
} from 'date-fns';

export function getMonthRange(min: Date, max: Date) {
  const months = [];
  let cur = startOfMonth(min);

  while (!isAfter(cur, max)) {
    months.push(cur);
    cur = addMonths(cur, 1);
  }

  return months;
}

export function getYearsByMonthRange(months: Date[]) {
  const years = Array.from(new Set(months.map((date) => format(date, 'yyyy'))));

  return years;
}

export function getMonthsByMonthRange(months: Date[], year: string) {
  return months
    .filter((d) => {
      return format(d, 'yyyy') === year;
    })
    .map((d) => format(d, 'MM'));
}

export function getDaysByMonthRange({
  year,
  month,
  minDate,
  maxDate,
}: {
  year: string;
  month: string;
  minDate: Date;
  maxDate: Date;
}) {
  const base = startOfMonth(new Date(Number(year), Number(month) - 1, 1));

  const lastDay = endOfMonth(base).getDate();

  let start = 1;
  let end = lastDay;

  if (isSameMonth(base, minDate)) {
    start = minDate.getDate();
  }

  if (isSameMonth(base, maxDate)) {
    end = maxDate.getDate();
  }

  return Array.from({ length: end - start + 1 }, (_, i) =>
    String(start + i).padStart(2, '0'),
  );
}

export function pickerValueToDate(v: {
  year: string;
  month: string;
  day: string;
}) {
  return new Date(Number(v.year), Number(v.month), Number(v.day));
}
