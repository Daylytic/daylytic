import { useNavigate } from "react-router";
import { useLayout } from "~/providers/layout";
import { usePanel } from "~/hooks/use-panel";
import { useUser } from "~/providers/user";
import { useTask } from "~/providers/task";
import { getGeneralMenuItems } from "~/utils/menu-items";
import dayjs from "dayjs";

export const useGeneralMenu = () => {
  const navigate = useNavigate();
  const { setShowMenu } = useLayout();
  const { getMenu } = usePanel();
  const { profile } = useUser();
  const { tasks } = useTask();

  const currentMenu = "/panel/" + getMenu();

  const generalItems = getGeneralMenuItems(
    tasks.filter((task) => task.taskType === "ROUTINE" && !task.isCompleted).length,
    dayjs().utc().tz(profile?.timeZone).hour(),
  );

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
    setShowMenu(false);
  };

  return {
    currentMenu,
    generalItems,
    handleMenuClick
  };
};