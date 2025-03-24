import { Form, Input, Button, Typography } from "antd";
import { styles, useContact } from ".";

const { TextArea } = Input;

export const Contact = () => {
  const { form, onFinish, onFinishFailed } = useContact();

  return (
    <section id="contact">
      <Typography.Title level={2}>Contact Us</Typography.Title>
      <Typography.Paragraph>
        Here you can send us a message, suggestion, bug report, or a question.
      </Typography.Paragraph>
      <Form
        form={form}
        name="contactForm"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message!" }]}
        >
          <TextArea placeholder="Your message here" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};
