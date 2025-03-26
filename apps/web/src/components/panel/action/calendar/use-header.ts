import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useLayout } from "~/providers/layout";
import { useUser } from "~/providers/user";
import { dateFormat, getOrdinalSuffix } from "~/utils/date";
import { CalendarHeaderProps } from ".";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

export const useHeader = ({ calendar }: CalendarHeaderProps) => {
    const dayjsDate = dayjs(calendar, dateFormat);
    const { profile } = useUser();
    const isToday = dayjs().utc().tz(profile?.timeZone).format(dateFormat) === calendar;
    const dayWithSuffix = `${dayjsDate.date()}${getOrdinalSuffix(dayjsDate.date())}`;
    const formattedDate = isToday ? "Today" : `${dayWithSuffix} of ${dayjsDate.format("MMMM YYYY")}`;
    const { setShowAction } = useLayout();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const navigate = useNavigate();

    const handleClose = () => {
        if (!isMobile) {
            navigate("..");
        }
        setShowAction(false);
    };

    return { handleClose, formattedDate }
}