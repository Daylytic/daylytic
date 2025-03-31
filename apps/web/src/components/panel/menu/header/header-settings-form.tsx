import { Form, Select, Radio, Card, Avatar } from "antd";
import { timezones } from "@daylytic/shared/constants";
import { HeaderSettingsFormSkeleton } from "./skeleton";
import { useSettingsForm } from ".";

const { Option } = Select;

export const HeaderSettingsForm = () => {
  const { form, profile, handleTimezoneChange, handleThemeChange } = useSettingsForm();
  if (!profile) {
    return <HeaderSettingsFormSkeleton />;
  }

  return (
    <>
      <Card style={{ marginBottom: 24 }}>
        <Card.Meta
          avatar={<Avatar src={profile.picture} size="large" />}
          title={profile.name}
          description={profile.email}
        />
      </Card>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          nickName: profile.name,
          email: profile.email,
          timezone: profile.timeZone,
          theme: profile.theme,
        }}
      >
        <Form.Item name="timezone" label="Timezone">
          <Select
            showSearch
            onChange={handleTimezoneChange}
            filterOption={(input, option) =>
              (String(option?.value).toLowerCase() ?? "").includes(input.toLowerCase())
            }
          >
            {timezones.map((tz) => (
              <Option key={tz} value={tz}>
                {tz}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="theme" label="Theme">
          <Radio.Group onChange={(e) => handleThemeChange(e.target.value)}>
            <Radio value="light">Light Mode</Radio>
            <Radio value="dark">Dark Mode</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};
