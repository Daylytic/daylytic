import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useUser } from "~/providers/user";

export const useSettings = () => {
  const { logout } = useUser();
  const [, setCookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setCookies("token", "");
    await logout();
    navigate("/");
  };

  return {
    handleLogout,
  };
};
