import dayjs from "dayjs";
import { DateTime } from "luxon";

export const timeFormat = 'HH:mm';
export const clockFormat = 'mm:ss';
export const dateFormat = 'YYYY-MM-DD';
export const ISOFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const ISOFormatUTC = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

export const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export const getFormattedTimeSpent = (seconds) => {
  if (seconds < 60) {
    // Less than a minute: show seconds.
    return { value: seconds, suffix: "Sec" };
  } else if (seconds < 3600) {
    // At least a minute but less than an hour: show minutes and remaining seconds.
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return { value: minutes, suffix: `Min ${remainingSeconds} Sec` };
  } else {
    // One hour or more: show hours and remaining minutes.
    const hours = Math.floor(seconds / 3600);
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return { value: hours, suffix: `Hrs ${remainingMinutes} Min` };
  }
};

export const formatDate = (dateStr: string): string => {
  const dt = DateTime.fromISO(dateStr, { zone: 'utc' });

  const time = dt.toFormat('HH:mm');

  const day = dt.day;
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  const month = dt.toFormat('LLLL');
  const year = dt.toFormat('yyyy');

  return `${time} ${dayWithSuffix} ${month} ${year}`;
}

export const getTimeAgo = (date) => {
  if (!date) return "No recent activity";

  const now = dayjs().utc();
  const past = dayjs(date);

  if (!past.isValid()) return "Invalid date";

  const diffInSeconds = now.diff(past, "second");
  const diffInMinutes = now.diff(past, "minute");
  const diffInHours = now.diff(past, "hour");
  const diffInDays = now.diff(past, "day");
  const diffInWeeks = now.diff(past, "week");

  if (diffInSeconds < 60) return `now`;
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return `${diffInWeeks} weeks ago`;
};