import { Question } from "@daylytic/shared/constants";
import { Form, Input, InputNumber, DatePicker, Select } from "antd";
const { Option } = Select;
import { useState } from "react";
import { QuestionnaireModalProps } from ".";

export const useForm = ({ onSubmit, onCancel }: QuestionnaireModalProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    setVisible(false);
    try {
      const values = await form.validateFields();
      await onSubmit(values);
      setVisible(false);
      form.resetFields();
    } catch (info) {
      console.error("Validation Failed:", info);
    } finally {
      setConfirmLoading(false);
    }
  };

  const renderFormItem = (question: Question) => {
    let inputComponent;
    switch (question.answerType) {
      case "text":
        inputComponent = <Input placeholder="Your answer" />;
        break;
      case "number":
        inputComponent = (
          <InputNumber style={{ width: "100%" }} placeholder="Your answer" min={1} max={10} />
        );
        break;
      case "date":
        inputComponent = <DatePicker style={{ width: "100%" }} />;
        break;
      case "select":
        inputComponent = (
          <Select placeholder="Select an option">
            {question.options?.map((option, index) => (
              <Option key={index} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        );
        break;
      default:
        inputComponent = <Input placeholder="Your answer" />;
    }
    return (
      <Form.Item
        key={question.id}
        label={question.questionText}
        name={question.id}
        rules={[{ required: true, message: "This question is required" }]}
      >
        {inputComponent}
      </Form.Item>
    );
  };

  const handleOpen = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
    onCancel();
  };

  return { handleOpen, visible, handleOk, confirmLoading, handleCancel, form, renderFormItem };
};
