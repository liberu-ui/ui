```typescript
/**
 * Formats a date using the specified format string and language.
 * If no format string is provided, it uses the date format specified in the store.
 * If no language is provided, it uses the global language preference in the store.
 * @param date - The date object to format.
 * @param formatStr - Optional. The format string to use for formatting the date.
 * @returns The formatted date string.
 */
import format from '@liberu-ui/date/src/format.ts';
import store from '../../../core/services/store';

export default function formatDate(
  date: Date,
  formatStr?: string | null
): string {
  const dateFormat = formatStr || store.state.meta.dateFormat;
  const lang = store.state.preferences.global.lang;
  return format(date, dateFormat, lang);
}
```