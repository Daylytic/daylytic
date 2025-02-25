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