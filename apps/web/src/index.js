import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/global.css";
import { App } from "./app.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="706835003528-uk37jmqoc4str6spfv0l37mdoi4jqais.apps.googleusercontent.com">
    <CookiesProvider defaultSetOptions={{path: "/"}}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </CookiesProvider>
  </GoogleOAuthProvider>
);
