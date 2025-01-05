import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  FormProps,
  Input,
  Modal,
} from "antd";
import { useState } from "react";
import { useCookies } from "react-cookie";

type FieldType = {
  title?: string;
  description?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

export const GoalsList = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [cookies, setCookies, removeCookie] = useCookies(["token"]);

  const createGoal = () => {
    setOpen(true);
  };

  const data = [
    {
      title: "Improve Portuguese",
      description: "Get to C1 Level by the end of the year",
      deadline: "1 year",
    },

    {
      title: "Learn New Programming Language",
      description: "Dedicate myself towards getting learning bases in c++",
      deadline: "2 months",
    },
  ];

  const handleOk = async () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);

    if (cookies.token !== undefined) {
      fetch("http://localhost:8084/oauth2/google", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token: cookies.token }),
      })
        .then(async (res) => {
          console.log(1);
          if (res.ok) {
            console.log(2);
            const { user } = await res.json();
          }
        })
        .catch((res) => {
          console.log(3);
          console.log(res);
        });
    }
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <Flex gap={"0.5rem"}>
      {data.map((element) => (
        <Card
          hoverable
          title={element.title}
          onClick={() => {
            console.log("hello");
          }}
        >
          <p>{element.description}</p>
        </Card>
      ))}
      <Button style={{ height: "100%" }} onClick={createGoal}>
        <PlusOutlined style={{ fontSize: "25px" }} />
      </Button>
      <Modal
        title="Create Your Goal"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Flex>
  );
};
