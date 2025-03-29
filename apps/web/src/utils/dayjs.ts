import dayjs from "dayjs";

const ISO8601_OFFSET_FORMAT = /^(.*)[+-](\d{2}):(\d{2})|(Z)$/;

// eslint-disable-next-line
export function createDayjs(date?: dayjs.ConfigType, ...args: any[]): dayjs.Dayjs {
  if (typeof date === 'string') {
    const match = date.match(ISO8601_OFFSET_FORMAT);
    if (match !== null) {
      if (match[0] === 'Z') {
        return dayjs(date, {
          utc: true,
          args: args,
        } as dayjs.OptionType);
      } else if (match[0][0] === '+') {
        const hour = parseInt(match[2]);
        const minute = parseInt(match[3]);
        return dayjs(match[1], {
          $offset: hour * 60 + minute,
          args: args,
        } as dayjs.OptionType);
      } else {
        const hour = parseInt(match[2]);
        const minute = parseInt(match[3]);
        return dayjs(match[1], {
          $offset: hour * -60 + minute,
          args: args,
        } as dayjs.OptionType);
      }
    }
  }
  return dayjs(date, {
    args: args,
  } as dayjs.OptionType);
}
