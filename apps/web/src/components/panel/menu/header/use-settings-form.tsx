import { Form } from "antd";
import { useUser } from "~/providers/user";
import { useEffect, useState } from "react";
import { App } from "antd";
import { swRegistration } from "~/utils/register-service-worker";

export const useSettingsForm = () => {
  const { subscribeToNotifications } = useUser();

  const [form] = Form.useForm();
  const { profile, updateTimezone, updateTheme } = useUser();
  const { message } = App.useApp();
  const [notificationStatus, setNotificationStatus] = useState<"default" | "granted" | "denied">(
    "default",
  );

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationStatus(Notification.permission);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    updateTheme(newTheme);
  };

  const handleTimezoneChange = async (newTimezone: string) => {
    await updateTimezone(newTimezone);
  };

  const urlB64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const enableNotifications = async () => {
    if (!("serviceWorker" in navigator && "PushManager" in window)) {
      message.error("Your browser doesn't support notifications");
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);

      if (permission !== "granted") {
        message.error("Notifications blocked. Please enable them in your browser settings.");
        return;
      }

      const applicationServerKey = urlB64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY);

      const subscription = await swRegistration!.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      await subscribeToNotifications(subscription);
      message.success("Notifications enabled successfully!");
    } catch (_) {
      message.error("Failed to enable push notifications");
    }
  };

  return {
    handleThemeChange,
    handleTimezoneChange,
    form,
    profile,
    enableNotifications,
    notificationStatus,
  };
};
