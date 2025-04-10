import { ScheduleOutlined, GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useUser } from "~/providers/user";

export const useActions = () => {
  const { profile, login, fetched } = useUser();
  const navigate = useNavigate();

  const actionButton = () => {
    if (profile) {
      return (
        <>
          Open Panel <ScheduleOutlined />
        </>
      );
    }

    if (!fetched) {
      return (
        <>
          <GoogleOutlined spin />
        </>
      );
    }

    return (
      <>
        Join <GoogleOutlined />
      </>
    );
  };

  return { actionButton, navigate, fetched, login, profile };
};
