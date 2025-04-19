import { Alert, Flex, Form, Steps, Tabs } from "antd";
const { Step } = Steps;
import { useUser } from "~/providers/user";
import { JSX, useEffect, useState } from "react";
import { App } from "antd";
import { swRegistration } from "~/utils/register-service-worker";
import { isInStandaloneMode, isMobile } from "~/utils/environment";
import {
  AppleOutlined,
  ChromeOutlined,
  FireOutlined,
  GlobalOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

export const useSettingsForm = () => {
  const { subscribeToNotifications } = useUser();

  const [form] = Form.useForm();
  const { profile, updateTimezone, updateTheme } = useUser();
  const { message } = App.useApp();
  const [notificationStatus, setNotificationStatus] = useState<"default" | "granted" | "denied">(
    "default",
  );

  const [showTutorial, setShowTutorial] = useState(false);

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

  const getPlatform = (ua: string) => {
    if (/iPhone|iPad|iPod/.test(ua)) return "ios";
    if (/Android/.test(ua)) return "android";
    return "desktop";
  };

  const ua = window.navigator.userAgent;
  const platform = getPlatform(ua);

  // A helper function to determine if the device is iOS or Android.
  const getDeviceInstructions = () => {
    if (platform === "desktop") {
      return <></>;
    }

    const [selectedBrowser, setSelectedBrowser] = useState("auto");

    const detectBrowser = () => {
      if (/Safari/.test(ua) && !/Chrome/.test(ua)) return "safari";
      if (/Firefox/.test(ua)) return "firefox";
      return "chrome";
    };
    const defaultBrowser = detectBrowser();

    const handleBrowserChange = (key: string) => {
      setSelectedBrowser(key);
    };

    const notificationExplanation = (
      <Alert
        message="Why add to home screen?"
        description="Adding this app to your home screen enables push notifications, allowing you to receive important updates and alerts even when you're not actively using the app."
        type="info"
        showIcon
      />
    );

    // Browser selector
    const browserSelector = (
      <Tabs
        size="small"
        type="line"
        activeKey={selectedBrowser}
        onChange={handleBrowserChange}
        items={[
          { key: "auto", label: "Auto Detect" },
          { key: "safari", label: "Safari" },
          { key: "chrome", label: "Chrome" },
          { key: "firefox", label: "Firefox" },
        ]}
      />
    );

    const browser = selectedBrowser === "auto" ? defaultBrowser : selectedBrowser;

    const instructionData = {
      ios: {
        safari: {
          steps: [
            {
              title: "Open Safari",
              desc: "Launch Safari on your iPhone or iPad",
              icon: <AppleOutlined />,
            },
            {
              title: "Tap Share",
              desc: "Tap the Share icon (box with arrow) at the bottom",
              icon: <ShareAltOutlined />,
            },
            {
              title: "Add to Home Screen",
              desc: "Scroll and tap 'Add to Home Screen'",
              icon: <AppstoreAddOutlined />,
            },
            {
              title: "Done",
              desc: "Tap 'Add' in the top right",
              icon: <CheckCircleOutlined />,
            },
          ],
        },
        chrome: {
          steps: [
            {
              title: "Open Chrome",
              desc: "Launch Chrome on your iPhone or iPad",
              icon: <ChromeOutlined />,
            },
            {
              title: "Open Menu",
              desc: "Tap the three dots at the bottom",
              icon: <EllipsisOutlined />,
            },
            {
              title: "Add to Home Screen",
              desc: "Select 'Add to Home Screen'",
              icon: <AppstoreAddOutlined />,
            },
            {
              title: "Done",
              desc: "Tap 'Add' to confirm",
              icon: <CheckCircleOutlined />,
            },
          ],
        },
        firefox: {
          steps: [
            {
              title: "Open Firefox",
              desc: "Launch Firefox on your iPhone or iPad",
              icon: <FireOutlined />,
            },
            {
              title: "Open Menu",
              desc: "Tap the three lines at the bottom",
              icon: <EllipsisOutlined />,
            },
            {
              title: "Add to Home Screen",
              desc: "Select 'Add to Home Screen'",
              icon: <AppstoreAddOutlined />,
            },
            {
              title: "Done",
              desc: "Tap 'Add' to confirm",
              icon: <CheckCircleOutlined />,
            },
          ],
        },
      },
      android: {
        chrome: {
          steps: [
            {
              title: "Open Chrome",
              desc: "Launch Chrome on your Android device",
              icon: <ChromeOutlined />,
            },
            {
              title: "Open Menu",
              desc: "Tap the three dots at the top right",
              icon: <EllipsisOutlined />,
            },
            {
              title: "Add to Home Screen",
              desc: "Select 'Add to Home screen'",
              icon: <AppstoreAddOutlined />,
            },
            {
              title: "Done",
              desc: "Tap 'Add' to confirm",
              icon: <CheckCircleOutlined />,
            },
          ],
        },
        firefox: {
          steps: [
            {
              title: "Open Firefox",
              desc: "Launch Firefox on your Android device",
              icon: <FireOutlined />,
            },
            {
              title: "Open Menu",
              desc: "Tap the three dots at the top right",
              icon: <EllipsisOutlined />,
            },
            {
              title: "Add to Home Screen",
              desc: "Tap 'Install' or 'Add to Home screen'",
              icon: <AppstoreAddOutlined />,
            },
            {
              title: "Done",
              desc: "Confirm installation",
              icon: <CheckCircleOutlined />,
            },
          ],
        },
        default: {
          steps: [
            {
              title: "Open Browser",
              desc: "Launch your Android browser",
              icon: <GlobalOutlined />,
            },
            {
              title: "Open Menu",
              desc: "Tap the three-dot menu icon",
              icon: <EllipsisOutlined />,
            },
            {
              title: "Add to Home Screen",
              desc: "Select 'Add to Home screen'",
              icon: <AppstoreAddOutlined />,
            },
            {
              title: "Done",
              desc: "Confirm installation",
              icon: <CheckCircleOutlined />,
            },
          ],
        },
      },
    };

    const renderSteps = (steps: { title: string; desc: string; icon: JSX.Element }[]) => (
      <Steps direction="vertical" current={-1}>
        {steps.map(({ title, desc, icon }) => (
          <Step key={title} title={title} description={desc} icon={icon} />
        ))}
      </Steps>
    );

    const platformData = instructionData[platform];
    const data = platformData?.[browser] || ('default' in platformData ? platformData.default : undefined);
    return (
      <Flex vertical gap="small">
        {notificationExplanation}
        {browserSelector}
        {data ? (
          renderSteps(data.steps)
        ) : (
          <Alert
            message="Browser Instructions"
            description="Please select your browser from the options above to see specific instructions for enabling notifications."
            type="info"
            showIcon
          />
        )}
      </Flex>
    );
  };

  const enableNotifications = async () => {
    if (!isInStandaloneMode() && isMobile()) {
      if (platform === "android" || platform === "ios") {
        setShowTutorial(true);
        return;
      }
    }

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
    showTutorial,
    setShowTutorial,
    getDeviceInstructions,
  };
};
