import { Modal, Button } from "antd";
import { HeaderSettingsForm, useSettings } from ".";

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HeaderSettings = ({ visible, onClose }: SettingsModalProps) => {
  const { handleLogout } = useSettings();

  return (
    <Modal
      title="Settings"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="logout" type="default" danger onClick={handleLogout}>
          Logout
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={onClose}>
          Save
        </Button>,
      ]}
    >
      <HeaderSettingsForm />
    </Modal>
  );
};
