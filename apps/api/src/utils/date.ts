import { DateTime } from "luxon";

export const timeFormat = 'HH:mm';
export const clockFormat = 'mm:ss';
export const dateFormat = 'YYYY-MM-DD';
export const ISOFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
export const ISOFormatUTC = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';

export const isValidTimeZone = (timeZone: string | undefined) => {
    if(!timeZone) {
        throw Error('Given time zone is not in a valid format');
    }

    if (!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone) {
        throw Error('Time zones are not available in this environment');
    }

    try {
        Intl.DateTimeFormat(undefined, {timeZone: timeZone});
        return true;
    }
    catch (ex) {
        throw Error('Given time zone is not in a valid format');
    }
}

export const convertToTimeZoneISO8601 =(): string =>{
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