import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { client } from "~/services/api-client";
import { timezones } from "@daylytic/shared/constants";

interface User {
  access_token: string;
}

interface Profile {
  id: string;
  googleId: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  lastSeenAt: string;
  timeZone: string;
  theme: string;
}

interface UserContextValue {
  profile: Profile | null;
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  fetched: boolean;
  token: string | undefined;
  login: () => void;
  logout: () => Promise<void>;
  isDarkMode: () => boolean;
  updateTimezone: (timezone: string) => Promise<void>;
  updateTheme: (theme: string) => Promise<void>;
  subscribeToNotifications: (data: PushSubscription) => Promise<void>;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

export const UserProvider = ({ children }) => {
  const [fetched, setFetched] = useState<boolean>(false);
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [profile, setProfile] = useState<Profile | null>(null);

  if (!localStorage.getItem("darkMode")) {
    localStorage.setItem(
      "darkMode",
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches).toString(),
    );
  }

  const [darkMode, setDarkMode] = useState<boolean>(localStorage.getItem("darkMode") === "true");

  const cookieOptions = {
    path: "/",
    sameSite: "none" as const,
    secure: true, // required for PWAs and SameSite=None
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse: User) => {
      setCookies("token", codeResponse.access_token, cookieOptions);
    },
    onError: (error: unknown) => console.error("Login Failed:", error),
  });

  const fetchProfile = async () => {
    if (cookies.token && !profile) {
      // Check local storage for cached profile picture
      const cachedPicture = localStorage.getItem("profile_picture");
      const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
      const darkMode =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

      try {
        const response = await client.POST("/oauth2/google", {
          body: { token: cookies.token, timeZone: timeZone, theme: darkMode ? "dark" : "light" },
        });

        if (!response.error) {
          const fetchedProfile = response.data;
          // Check if the profile has a picture and if the picture URL is different from the cached one
          if (fetchedProfile.picture && fetchedProfile.picture !== cachedPicture) {
            await fetchProfilePicture(fetchedProfile, cachedPicture);
          } else {
            setProfile({
              ...fetchedProfile,
              picture: cachedPicture || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }

      setFetched(true);
    }

    if (!cookies.token) {
      setFetched(true);
    }
  };

  const fetchProfilePicture = async (fetchedProfile, cachedPicture) => {
    try {
      const response = await fetch(fetchedProfile.picture);
      if (!response.ok) {
        throw Error("Could not fetch image.");
      }

      const blob = await response.blob();

      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result?.toString() ?? null);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });

      if (base64Image) {
        localStorage.setItem("profile_picture", base64Image.toString());
        setProfile({
          ...fetchedProfile,
          picture: base64Image,
        });
      }
    } catch (_) {
      setProfile({
        ...fetchedProfile,
        picture: cachedPicture || "",
      });
    }
  };

  const logout = async () => {
    setProfile(null);
    setFetched(false);
    googleLogout();

    const response = await client.DELETE("/oauth2/google", {
      params: {
        header: { authorization: `Bearer ${cookies.token}` },
      },
    });

    if (!response.error) {
      setProfile(null);
      localStorage.removeItem("profile_picture"); // Clear cached picture on logout
      removeCookie("token");
    }
  };

  const updateTimezone = async (timezone: string) => {
    try {
      if (!profile || !timezones.includes(timezone)) return;

      const response = await client.PATCH("/oauth2/timezone/{timeZone}", {
        params: {
          header: { authorization: `Bearer ${cookies.token}` },
          path: { timeZone: timezone },
        },
      });

      if (response.error) {
        throw Error("Error occured while updating timezone");
      }

      setProfile((prevProfile) =>
        prevProfile ? { ...prevProfile, timeZone: timezone } : prevProfile,
      );
    } catch (err) {
      console.log("Error occured while updating timezone: ", err);
    }
  };

  const updateTheme = async (theme: string) => {
    try {
      if (!profile) {
        setDarkMode(theme === "dark");
        localStorage.setItem("darkMode", (theme === "dark").toString());
        return;
      }

      setProfile((prevProfile) => (prevProfile ? { ...prevProfile, theme: theme } : prevProfile));
      const response = await client.PATCH("/oauth2/theme/{theme}", {
        params: {
          header: { authorization: `Bearer ${cookies.token}` },
          path: { theme },
        },
      });

      if (response.error) {
        throw Error("Error occured while updating timezone");
      }
    } catch (err) {
      console.log("Error occured while updating theme: ", err);
    }
  };

  const subscribeToNotifications = async (data: PushSubscription) => {
    try {
      const { endpoint, keys } = data.toJSON();

      if (!endpoint || !keys?.p256dh || !keys?.auth || !profile) return;

      const response = await client.POST("/oauth2/notification/subscribe", {
        params: {
          header: { authorization: `Bearer ${cookies.token}` },
        },
        body: {
          endpoint,
          keys: {
            p256dh: keys.p256dh,
            auth: keys.auth,
          },
        },
      });

      if (response.error) {
        throw new Error("Error occurred while subscribing to notifications");
      }
    } catch (err) {
      console.error("Subscription error:", err);
    }
  };

  const isDarkMode = () => {
    return profile ? profile.theme === "dark" : darkMode;
  };

  useEffect(() => {
    if (!profile) fetchProfile();
  }, [cookies.token, profile]);

  return (
    <UserContext.Provider
      value={{
        profile,
        fetched,
        token: cookies.token,
        login,
        logout,
        updateTimezone,
        updateTheme,
        darkMode,
        isDarkMode,
        setDarkMode,
        subscribeToNotifications,
      }}
    >
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
