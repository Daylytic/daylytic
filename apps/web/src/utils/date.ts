import { DateTime } from "luxon";

export const timeFormat = 'HH:mm';

const getOrdinalSuffix = (day: number): string => {
  if (day > 3 && day < 21) return 'th'; 
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

export const formatDate = (dateStr: string): string  =>{
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

  const diffInSeconds = Math.floor((Date.now() - date) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInSeconds < 60) return `now`;
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;
  return `${diffInWeeks} weeks ago`;
};
