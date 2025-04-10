import { Modal, Form, Button } from "antd";
import { BarChartOutlined } from "@ant-design/icons";
import { styles, useForm } from ".";
import { questions } from "@daylytic/shared/constants";

export interface QuestionnaireModalProps {
  onSubmit: (answers: { [key: string]: string | number }) => Promise<void>;
  onCancel: () => void;
}

export const DashboardForm = ({ onSubmit, onCancel }: QuestionnaireModalProps) => {
  const { handleOpen, visible, handleOk, confirmLoading, handleCancel, form, renderFormItem } =
    useForm({ onSubmit, onCancel });

  return (
    <>
      <Button
        onClick={handleOpen}
        color="primary"
        variant="filled"
        size="large"
        className={styles.create}
        icon={<BarChartOutlined />}
      >
        Get Your Analysis
      </Button>
      <Modal
        open={visible}
        title="Answer the Questions"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Submit"
      >
        <Form form={form} layout="vertical">
          {questions.map((question) => renderFormItem(question))}
        </Form>
      </Modal>
    </>
  );
};
