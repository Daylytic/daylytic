import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

interface User {
  access_token: string;
}

interface Profile {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface UserContextValue {
  profile: Profile | null;
  token: string | undefined;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: User) => setCookies("token", codeResponse.access_token),
    onError: (error: unknown) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (cookies.token && !profile) {
      fetch("http://localhost:8084/oauth2/google", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        method: "POST",
        body: JSON.stringify({ token: cookies.token }),
      })
        .then(async (res) => {
          if (res.ok) {
            setProfile(await res.json());
          }
        })
        .catch((error) => console.error("Error fetching profile:", error));
    }
  }, [cookies.token, profile]);

  const logout = () => {
    googleLogout();
    fetch("http://localhost:8084/oauth2/google", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      method: "DELETE",
      body: JSON.stringify({ token: cookies.token }),
    })
      .then((res) => {
        if (res.ok) {
          setProfile(null);
        }
      })
      .catch((error) => console.error("Error logging out:", error));

    removeCookie("token");
    setProfile(null);
  };

  return (
    <UserContext.Provider value={{ profile, token: cookies.token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};