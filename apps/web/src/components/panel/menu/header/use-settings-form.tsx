import { Form } from "antd";
import { useUser } from "~/providers/user";

export const useSettingsForm = () => {
  const [form] = Form.useForm();
  const { profile, updateTimezone, updateTheme } = useUser();

  const handleThemeChange = (newTheme) => {
    updateTheme(newTheme);
  };

  const handleTimezoneChange = async (newTimezone: string) => {
    await updateTimezone(newTimezone);
  };

  return {
    handleThemeChange,
    handleTimezoneChange,
    form,
    profile,
  };
};
