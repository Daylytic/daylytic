import Title from "antd/es/typography/Title";
import { ActionDataProps } from "../action";
import { generateTasks } from "utils/utils";
import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Divider,
  Flex,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Tag,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { goals } from "@daylytic/shared/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useDailyTasks } from "providers/daily-tasks";
import { useEffect, useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import cuid from "cuid";
import type { SelectProps } from "antd";
import { faker } from "@faker-js/faker";

type TagRender = SelectProps["tagRender"];

const tagInputStyle: React.CSSProperties = {
  cursor: "pointer",
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
  backgroundColor: "transparent",
};

const tagRender: TagRender = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

export const Routine = ({ id }) => {
  const [modal2Open, setModal2Open] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { tasks, updateTask, deleteTask } = useDailyTasks();

  // Find the task by ID and initialize local state
  const existingTask = tasks.find((element) => element.id === id);
  const [task, setTask] = useState(existingTask ? { ...existingTask } : null);

  const tags = tasks.flatMap((task) => task.tags);

  console.log(tags);

  const dropdownRender = (menus: React.ReactNode) => (
    <div>
      {menus}
      <Divider style={{ margin: 0 }} />
      <Button
        type="text"
        style={{ width: "100%" }}
        onClick={() => {
          setModal2Open(!modal2Open);
        }}
      >
        New Tag
      </Button>
    </div>
  );

  // Sync local state with changes in tasks prop
  useEffect(() => {
    if (existingTask) {
      setTask({ ...existingTask });
    }
  }, [existingTask]);

  if (!task) {
    return null;
  }

  // Handler to update task properties
  const handleTaskChange = (key, value) => {
    setTask((prevTask) => {
      if (!prevTask) return null; // Handle null case (safety check)
      return {
        ...prevTask,
        [key]: value, // Update the specific key
      };
    });
  };

  /* 
  
                    handleTaskChange("tags", [
                    {
                      id: cuid(),
                      name: `tag ${task.title}`,
                      color: "#555555",
                    },
                  ]);
                }}
  */

  return (
    <>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal2Open}
        onOk={() => {
          setModal2Open(false);
          handleTaskChange("tags", [
            {
              id: cuid(),
              name: faker.animal.petName(),
              color: faker.color.rgb(),
            },
          ]);
        }}
        onCancel={() => setModal2Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <Title level={2}>Task</Title>
      <Flex vertical gap={"4px"}>
        <Input
          maxLength={goals.MAX_GOAL_TITLE_LENGTH}
          placeholder="Enter title"
          showCount
          value={task.title}
          onChange={(e) => handleTaskChange("title", e.target.value)}
        />
        <TextArea
          showCount
          maxLength={goals.MAX_GOAL_DESCRIPTION_LENGTH}
          placeholder="Enter description"
          style={{ height: "90px", resize: "none", marginBottom: "30px" }}
          value={task.description}
          onChange={(e) => handleTaskChange("description", e.target.value)}
        />
        <Row>
          <Col span={18} push={6}>
            <DatePicker
              value={task.deadline ? dayjs(task.deadline) : null}
              onChange={(date) =>
                handleTaskChange("deadline", date?.toISOString() || null)
              }
            />
          </Col>
          <Col span={6} pull={18}>
            Deadline
          </Col>
        </Row>
        <Row>
          <Col span={18} push={6}>
            <Flex gap="4px 0" wrap style={{ width: "100%" }}>
              {task.tags.map((tag) => (
                <Tag bordered={false} closable color={tag.color}>
                  {tag.name}
                </Tag>
              ))}
              <Select
                mode="multiple"
                tagRender={tagRender}
                style={{ width: "100%" }}
                options={[
                  ...tags.map((tag) => {
                    return { key: tag.id, value: tag.id, label: tag.name };
                  }),
                ]}
                onChange={(value, selectedOptions) => {
                  console.log([value, selectedOptions]);
                  const foundTag = tags.find((tag) => tag.id === value[0]);

                  if (foundTag) {
                    handleTaskChange("tags", [...task.tags, foundTag]);
                  }
                }}
                dropdownRender={dropdownRender}
                placeholder="Please select"
              >
                {/* <Tag style={tagInputStyle} icon={<PlusOutlined />}>
                  Add Tag
                </Tag> */}
              </Select>
            </Flex>
          </Col>
          <Col span={6} pull={18}>
            Tags
          </Col>
        </Row>
      </Flex>
      <div style={{ flex: 1 }}></div>
      <Flex gap={"5px"} justify="center" style={{ width: "100%" }}>
        <Col flex={1}>
          <Popconfirm
            title="Are you sure delete this task?"
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              await deleteTask(id);
              navigate("/panel/routine");
            }}
          >
            <Button block>Delete Task</Button>
          </Popconfirm>
        </Col>

        <Col flex={1}>
          <Button
            block
            type="primary"
            loading={loading}
            onClick={async () => {
              setLoading(true);
              try {
                console.log(task);
                await updateTask(task);
                setLoading(false);
              } catch (err) {
                setLoading(false);
              }
            }}
          >
            Save Task
          </Button>
        </Col>
      </Flex>
    </>
  );
};
