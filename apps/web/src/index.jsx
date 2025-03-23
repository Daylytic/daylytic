import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.css";
import { App } from "./app.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";
import { UserProvider } from "./providers/user.tsx";
import { NotificationProvider } from "./providers/notification.tsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      <UserProvider>
        <NotificationProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </NotificationProvider>
      </UserProvider>
    </CookiesProvider>
  </GoogleOAuthProvider>,
);