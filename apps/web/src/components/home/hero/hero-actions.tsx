import { Button, Flex } from "antd";
import dayjs from "dayjs";
import { Routes } from "~/utils/routes";
import { useActions } from ".";

export const HeroActions = () => {
  const { actionButton, navigate, fetched, login, profile } = useActions();

  return (
    <Flex gap="small">
      <Button
        size="large"
        onClick={
          profile
            ? () => {
                if (!fetched) {
                  return;
                }

                if (dayjs().utc().diff(dayjs(profile.createdAt), "minutes") < 2) {
                  navigate(Routes.SETUP);
                  return;
                }
                navigate(Routes.PANEL_DASHBOARD);
              }
            : login
        }
      >
        {actionButton()}
      </Button>
    </Flex>
  );
};
