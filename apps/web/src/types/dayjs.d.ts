import dayjs from "dayjs";

declare module 'dayjs' {
    interface DayjsStatic {
        create(date?: dayjs.ConfigType): dayjs.Dayjs;
        create(date?: dayjs.ConfigType, format?: dayjs.OptionType, strict?: boolean): dayjs.Dayjs;
        create(date?: dayjs.ConfigType, format?: dayjs.OptionType, locale?: string, strict?: boolean): dayjs.Dayjs;
    }
}