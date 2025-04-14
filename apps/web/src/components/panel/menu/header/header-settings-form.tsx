import { Form, Select, Radio, Card, Avatar, Button, Alert, Collapse } from "antd";
import { timezones } from "@daylytic/shared/constants";
import { HeaderSettingsFormSkeleton } from "./skeleton";
import { useSettingsForm } from ".";
import { BellOutlined } from "@ant-design/icons";

const { Option } = Select;

export const HeaderSettingsForm = () => {
  const {
    form,
    profile,
    handleTimezoneChange,
    handleThemeChange,
    enableNotifications,
    notificationStatus,
  } = useSettingsForm();

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

        <Form.Item name="notifications" label="Notifications">
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Button
              icon={<BellOutlined />}
              onClick={enableNotifications}
              disabled={notificationStatus === "granted"}
            >
              {notificationStatus === "granted" ? "Notifications Enabled" : "Enable Notifications"}
            </Button>

            {notificationStatus === "denied" && (
              <Alert
                type="error"
                message="Notifications are blocked"
                description="Please enable notifications in your browser settings and refresh the page."
                showIcon
              />
            )}

            <Collapse ghost>
              <Collapse.Panel header="Having trouble with notifications?" key="1">
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <Alert
                    type="info"
                    message="How notifications work"
                    description={
                      <div>
                        You will receive notifications for:
                        <ul>
                          <li>Upcoming deadlines for tasks in your routines</li>
                          <li>Goal milestones and deadlines</li>
                          <li>Calendar events and reminders</li>
                        </ul>
                        <strong>Pro tip:</strong> When prompted, select "Allow forever" in
                        notification permissions for the best experience.
                      </div>
                    }
                    showIcon
                  />
                  <Alert
                    type="info"
                    message="Browser Compatibility Guide"
                    description={
                      <div>
                        For Chromium-based browsers (Chrome, Brave, Edge):
                        <ul>
                          <li>
                            Enable "Use Google services for push messaging" in browser settings
                          </li>
                          <li>Ensure you're using HTTPS</li>
                          <li>Allow notifications for this site in browser permissions</li>
                          <li>Try refreshing the page after changing settings</li>
                        </ul>
                      </div>
                    }
                    showIcon
                  />
                </div>
              </Collapse.Panel>
            </Collapse>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
