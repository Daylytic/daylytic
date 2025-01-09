import { Form, Input, Modal } from "antd";

export const CreateGoalModal = ({
  visible,
  onClose,
  onCreate,
  confirmLoading,
}: {
  visible: boolean;
  onClose: () => void;
  onCreate: (values: {
    title: string;
    description: string;
    deadline: string | null;
  }) => void;
  confirmLoading: boolean;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values)
        onCreate(values);
        form.resetFields();
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  return (
    <Modal
      title="Create Your Goal"
      visible={visible}
      onOk={handleSubmit}
      confirmLoading={confirmLoading}
      onCancel={onClose}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Deadline"
          name="deadline"
          rules={[{ required: false, message: "Please input the description!" }]}
        >
          <Input type="date"  />
        </Form.Item>
      </Form>
    </Modal>
  );
};
