import { useDateFormat } from '@vueuse/core';

export function useVacationCalendar(vacationRange: { start: Date; end: Date }) {
  const range = ref<{ start: Date | null; end: Date | null } | null>(null);

  const daysCount = computed(() => {
    const diff = vacationRange.end.getTime() - vacationRange.start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  });

  const toYMD = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const rangesOverlap = (
    a: { start: Date; end: Date },
    b: { start: Date; end: Date }
  ) => {
    const aStart = toYMD(a.start),
      aEnd = toYMD(a.end);
    const bStart = toYMD(b.start),
      bEnd = toYMD(b.end);
    return aStart <= bEnd && bStart <= aEnd;
  };

  const formattedStart = computed(() =>
    range.value?.start
      ? useDateFormat(range.value.start, 'MMM DD, YYYY').value
      : ''
  );

  const formattedEnd = computed(() =>
    range.value?.end ? useDateFormat(range.value.end, 'MMM DD, YYYY').value : ''
  );

  function validateAndPreparePayload(options: {
    requestType: string;
    calendarType: number;
    showTime: boolean;
    startTime?: string;
    endTime?: string;
    comment?: string;
  }) {
    const start = range.value.start;
    const end = range.value.end ?? range.value.start;

    if (!range.value?.start) {
      throw new Error('Start date is required');
    }

    if (options.showTime && (!options.startTime || !options.endTime)) {
      throw new Error('Start and end time are required');
    }

    if (rangesOverlap({ start, end }, vacationRange)) {
      throw new Error('Selected dates overlap with your existing vacation');
    }

    return {
      requestType: options.requestType,
      calendarType: options.calendarType === 0 ? 'Days' : 'Hours',
      range: {
        start: range.value.start,
        end: range.value.end ?? range.value.start,
      },
      time: options.showTime
        ? {
            start: options.startTime,
            end: options.endTime,
          }
        : null,
      comment: options.comment || '',
    };
  }

  return {
    range,
    daysCount,
    formattedStart,
    formattedEnd,
    rangesOverlap,
    validateAndPreparePayload,
  };
}
