/**
 * Format a date string or Date object as a localized date string in UTC timezone
 * This prevents timezone conversion issues that can cause dates to shift by one day
 * 
 * @param date - Date string (ISO format) or Date object
 * @param options - Intl.DateTimeFormat options (default includes year, month, day)
 * @returns Formatted date string
 */
export function formatDateUTC(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Date(date).toLocaleDateString('en-US', {
    ...defaultOptions,
    ...options,
  });
}
