import { format, isSameMonth, isValid, parse, startOfMonth } from 'date-fns';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MONTH_PARAM_KEY = 'month';
const SELECTEDDATE_PARAM_KEY = 'selectedDate';

function parseMonthParam(value: string | null) {
  if (!value) return undefined;
  const parsed = parse(value, 'yyyy-MM', new Date());
  return isValid(parsed) ? startOfMonth(parsed) : undefined;
}

function parseDayParam(value: string | null) {
  if (!value) return undefined;
  const parsed = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(parsed) ? parsed : undefined;
}

function useGetCalenderDate() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawMonth = parseMonthParam(searchParams.get(MONTH_PARAM_KEY));
  const rawSelectedDate = parseDayParam(
    searchParams.get(SELECTEDDATE_PARAM_KEY),
  );

  const month =
    rawMonth ??
    (rawSelectedDate
      ? startOfMonth(rawSelectedDate)
      : startOfMonth(new Date()));

  const selectedDate =
    rawSelectedDate && isSameMonth(rawSelectedDate, month)
      ? rawSelectedDate
      : undefined;

  useEffect(() => {
    const normalized = new URLSearchParams(searchParams);

    normalized.set(MONTH_PARAM_KEY, format(month, 'yyyy-MM'));

    if (selectedDate) {
      normalized.set(
        SELECTEDDATE_PARAM_KEY,
        format(selectedDate, 'yyyy-MM-dd'),
      );
    } else {
      normalized.delete(SELECTEDDATE_PARAM_KEY);
    }

    const current = searchParams.toString();
    const next = normalized.toString();

    if (current !== next) {
      setSearchParams(normalized, { replace: true });
    }
  }, [month, selectedDate, searchParams, setSearchParams]);

  const onMonthChange = (d: Date) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(MONTH_PARAM_KEY, format(d, 'yyyy-MM'));
        next.delete(SELECTEDDATE_PARAM_KEY);
        return next;
      },
      { replace: true },
    );
  };

  const onSelectDay = (d: Date | undefined) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);

        if (!d) {
          next.delete(SELECTEDDATE_PARAM_KEY);
          return next;
        }

        next.set(MONTH_PARAM_KEY, format(d, 'yyyy-MM'));
        next.set(SELECTEDDATE_PARAM_KEY, format(d, 'yyyy-MM-dd'));

        return next;
      },
      { replace: true },
    );
  };

  return {
    month,
    selectedDate,
    onMonthChange,
    onSelectDay,
  };
}

export default useGetCalenderDate;
