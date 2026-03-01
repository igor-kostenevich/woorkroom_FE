export const formatSecondsToMMSS = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');

  const s = (seconds % 60).toString().padStart(2, '0');

  return `${m}:${s}`;
};

/**
 * Parses a 12h time string (e.g. "9:30 AM", "12:00 PM") to total minutes since midnight.
 */
export function parse12hToMinutes(
  time: string,
  fallbackPeriod: 'AM' | 'PM'
): number {
  const m = time
    .trim()
    .match(/^(0?[1-9]|1[0-2])(?::([0-5][0-9]))?\s*(AM|PM)?$/i);
  if (!m) return NaN;

  let h = Number(m[1]);
  const min = m[2] ? Number(m[2]) : 0;
  const period = (m[3]?.toUpperCase() as 'AM' | 'PM') ?? fallbackPeriod;

  if (period === 'AM' && h === 12) h = 0;
  if (period === 'PM' && h !== 12) h += 12;

  return h * 60 + min;
}

/**
 * Formats total minutes as "Xh Ym" (e.g. 90 → "1h 30m").
 */
export function formatMinutesToDuration(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) return '';
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
}

/**
 * Returns duration string "Xh Ym" for a time range in 12h format.
 * Treats start as AM and end as PM when period is omitted; supports overnight ranges.
 */
export function getDurationFromTimeRange(start: string, end: string): string {
  if (!start?.trim() || !end?.trim()) return '';

  const startMinutes = parse12hToMinutes(start, 'AM');
  const endMinutes = parse12hToMinutes(end, 'PM');
  if (!Number.isFinite(startMinutes) || !Number.isFinite(endMinutes)) return '';

  let diff = endMinutes - startMinutes;
  if (diff < 0) diff += 24 * 60;

  return formatMinutesToDuration(diff);
}
