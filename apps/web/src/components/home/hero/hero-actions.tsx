import { GoogleOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { GoogleLogin } from "@react-oauth/google";

import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

// Define types for user and profile data
interface User {
  access_token: string;
}

interface Profile {
  // Replace with the appropriate fields based on the API response
  id: string;
  email: string;
  name: string;
}

export const HeroActions = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);
  const [profile, setProfile] = useState<Profile | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse: User) => setCookies("token", codeResponse.access_token),
    onError: (error: unknown) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (cookies.token !== undefined && !profile) {
      fetch("http://localhost:8084/oauth2/google", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token: cookies.token }),
      })
        .then(async (res) => {
          console.log(1);
          if (res.ok) {
            console.log(2);
            const { user } = await res.json();
            setProfile(user);
          }
        })
        .catch((res) => {
          console.log(3);
          console.log(res);
        });
    }
  });

  // Log out function to log the user out of Google and set the profile to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
    removeCookie("token");
  };

  console.log(cookies.token);

  return (
    <Flex gap={"small"}>
      <Button onClick={() => login()}>
        Join
        <GoogleOutlined />
      </Button>
      <div>
        {profile ? (
          <div>
            <h3>User Logged in</h3>
            <p>Name: {profile.name}</p>
            <p>Email Address: {profile.email}</p>
            <br />
            <br />
            <button onClick={logOut}>Log out</button>
          </div>
        ) : <></>}
      </div>
    </Flex>
  );
};
