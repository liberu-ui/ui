/**
 * Replaces Unicode date format characters with PHP date format characters.
 * @param formatStr - The Unicode date format string.
 * @returns The converted PHP date format string.
 */
const unicodeToPhp = (formatStr: string): string => {
    // Array of Unicode to PHP mapping
    const mapping = [
        { replace: 'Y', with: 'yyyy' }, // 1999
        { replace: 'y', with: 'yy' }, // 99
        { replace: 'F', with: 'MMMM' }, // January
        { replace: 'M', with: 'MMM' }, // Jan
        { replace: 'm', with: 'MM' }, // 01
        { replace: 'd', with: 'dd' }, // 19
        { replace: 'j', with: 'd' },
        { replace: 'l', with: 'EEEE' }, // Tuesday
        { replace: 'D', with: 'EEE' }, // Tue
        { replace: 'a', with: 'a' }, // Am/PM
        { replace: 'p', with: 'p' }, // Am/PM
        { replace: 'H', with: 'HH' }, // 24-hour with leading zeros
        { replace: 'G', with: 'H' }, // 24-hour without leading zeros
        { replace: 'h', with: 'h' }, // 12-hour with leading zeros
        { replace: 'g', with: 'K' }, // 12-hour without leading zero
        { replace: 'i', with: 'mm' }, // Minutes with leading zeros
        { replace: 's', with: 'ss' }, // Seconds, with leading zeros
        { replace: 'T', with: 'zz' }, // Timezone abbreviation
        { replace: 'e', with: 'zzzz' } // Timezone
    ];

    /**
     * Splits the format string into segments based on delimiters and sorts them in descending order of length.
     * @param formatStr - The format string to split into segments.
     * @returns The array of sorted segments.
     */
    const getSegments = (formatStr: string): string[] => {
        const delimiters = [' ', '-', '/', ':', ',', '[.]'];
        const regex = new RegExp(delimiters.join('|'));
        return formatStr.split(regex).sort((a, b) => b.length - a.length);
    };

    /**
     * Maps a Unicode segment to its PHP equivalent based on the mapping array.
     * @param segment - The Unicode segment to map.
     * @returns The mapped PHP segment or undefined if a mapping is not found.
     */
    const getMappedSegment = (segment: string): string | undefined => {
        const mappedObj = mapping.find(({ replace }) => replace === segment);
        return mappedObj ? mappedObj.with : undefined;
    };

    // Get the sorted segments of the format string
    const segments = getSegments(formatStr);

    // Replace each segment in the format string with its PHP equivalent
    const convertedStr = segments.reduce((string, segment) => {
        const mappedSegment = getMappedSegment(segment);
        return string.replace(segment, mappedSegment) || '';
    }, formatStr);

    return convertedStr;
};

export default unicodeToPhp;