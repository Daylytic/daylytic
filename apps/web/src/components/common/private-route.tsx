import { useNavigate } from "react-router";
import { useUser } from "~/providers/user";
import { Routes } from "~/utils/routes";
import { Flex, Spin, App } from "antd";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { profile, fetched } = useUser();
  const { message } = App.useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetched && !profile) {
      message.error("You need to login to access this page.");
      navigate(Routes.HOME, { replace: true });
    }
  }, [fetched, profile, message, navigate]);

  if (!fetched) {
    return (
      <Flex align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  if (!profile) {
    return null;
  }

  return <>{children}</>;
};
