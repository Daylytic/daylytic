import { useUser } from "providers/user-provider";
import { Navigate } from "react-router";

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useUser();

  return user.profile ? (
    children
  ) : (
    <Navigate
      replace={true}
      to="/"
    />
  );
};
