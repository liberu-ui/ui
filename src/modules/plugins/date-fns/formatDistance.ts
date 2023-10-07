/**
 * Converts a date to a formatted distance string based on the user's global language preference.
 * @param date - The date to be formatted.
 * @returns The formatted distance string.
 */
import store from '../../../core/services/store';
import formatDistance from '@liberu-ui/date/src/formatDistance.ts';

export default function formatDateDistance(date: Date): string {
  const langPreference: string = store.state.preferences.global.lang;
  return formatDistance(date, langPreference);
}
