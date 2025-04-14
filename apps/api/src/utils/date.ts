import dayjs from "dayjs";
import { DateTime } from "luxon";
import { Task } from "modules/task/index.js";

export const timeFormat = 'HH:mm';
export const clockFormat = 'mm:ss';
export const dateFormat = 'YYYY-MM-DD';
export const ISOFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const ISOFormatUTC = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export const isValidTimeZone = (timeZone: string | undefined) => {
  if (!timeZone) {
    throw Error('Given time zone is not in a valid format');
  }

  if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
    throw Error('Time zones are not available in this environment');
  }

  try {
    Intl.DateTimeFormat(undefined, { timeZone: timeZone });
    return true;
  }
  catch (ex) {
    throw Error('Given time zone is not in a valid format');
  }
}

export const convertToTimeZoneISO8601 = (): string => {
  try {
    // Use Luxon to get the current time in the specified timezone
    const now = DateTime.now();

    // Validate the timezone
    if (!now.isValid) {
      throw new Error("Invalid timezone specified");
    }

    // Return the time in ISO 8601 format
    return now.toISO();
  } catch (error) {
    throw new Error(`Error converting time: ${error}`);
  }
}

export const getNotificationMessage = (task: Task): string => {
  const now = dayjs().utc().startOf("minute");
  const deadline = dayjs(task.deadline).utc();

  // Check if task is due now (i.e. within this one-minute window)
  if (deadline.isSame(now) || (deadline.isAfter(now) && deadline.isBefore(now.add(1, "minute")))) {
    return `The deadline for your task "${task.title}" is now!`;
  }
  // Check if task is due in exactly 30 minutes
  if (deadline.isSame(now.add(30, "minute")) || (deadline.isAfter(now.add(30, "minute")) && deadline.isBefore(now.add(30, "minute").add(1, "minute")))) {
    return `Heads up! Your task "${task.title}" is due in 30 minutes.`;
  }
  // Check if task is due in exactly 1 hour
  if (deadline.isSame(now.add(1, "hour")) || (deadline.isAfter(now.add(1, "hour")) && deadline.isBefore(now.add(1, "hour").add(1, "minute")))) {
    return `Reminder: Your task "${task.title}" is due in 1 hour.`;
  }
  // Check if task is due in exactly 6 hours
  if (deadline.isSame(now.add(6, "hour")) || (deadline.isAfter(now.add(6, "hour")) && deadline.isBefore(now.add(6, "hour").add(1, "minute")))) {
    return `Notice: Your task "${task.title}" is due in 6 hours.`;
  }
  // Check if task is due in exactly 24 hours
  if (deadline.isSame(now.add(24, "hour")) || (deadline.isAfter(now.add(24, "hour")) && deadline.isBefore(now.add(24, "hour").add(1, "minute")))) {
    return `Alert: Your task "${task.title}" is due in 24 hours.`;
  }
  // Fallback message if needed. This should rarely be hit if tasks are filtered by the correct windows.
  return `Upcoming deadline for your task "${task.title}".`;
};