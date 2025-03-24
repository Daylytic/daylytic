
import React, { useContext, useEffect } from "react";
import { App } from "antd";
import { NotificationInstance } from "antd/es/notification/interface";

interface NotificationContextType {
  notification: NotificationInstance;
}
export const NotificationContext = React.createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }) => {
  const { notification } = App.useApp();

  useEffect(() => {
    staticNotificationApi = notification;
  });

  return (
    <NotificationContext.Provider value={{ notification }}>{children}</NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

// Yes I know creating static varialbe is not optimal. However in order to handle API errors
// I could not come up with a simpler solution without boilerplate
export let staticNotificationApi: NotificationInstance | null = null;
