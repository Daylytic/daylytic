import { Button, Dropdown, Flex, MenuProps, Popconfirm, Typography } from "antd";
import { styles } from ".";
import { useNavigate, useParams } from "react-router";
import { useGoal } from "providers/goal";
import { GoalHeaderSkeleton } from "components/panel/content/goal/skeleton/goal-header-skeleton";
import { DeleteOutlined, EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { Routes } from "utils/routes";
import clsx from "clsx";
const { Title, Paragraph } = Typography;

export const GoalHeader = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const { goals, fetched, updateGoal, deleteGoal } = useGoal();

  const selectedGoal = goals.find((goal) => goal.id === goalId);

  const [editingDescription, setEditingDescription] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);

  // Move these to the top with default values to avoid conditional hooks
  const [title, setTitle] = useState(selectedGoal?.title || "");
  const titleRef = useRef(selectedGoal?.title || "");

  const [description, setDescription] = useState(selectedGoal?.description || "");
  const descriptionRef = useRef(selectedGoal?.description || "");

  if (!fetched || !selectedGoal) {
    return <GoalHeaderSkeleton />;
  }

  const deleteCurrentGoal = async () => {
    await deleteGoal(selectedGoal.id);
    navigate(Routes.PANEL_GOAL);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this goal?"
          onConfirm={deleteCurrentGoal}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      ),
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  return (
    <Flex vertical>
      <Flex
        justify="space-between"
        align="start"
        className={clsx(styles["project-card-editable"])}
      >
        <Title
          level={1}
          editable={{
            onStart: () => setEditingTitle(true),
            onChange: (text) => {
              setTitle(text);
              titleRef.current = text;
            },
            onEnd: async () => {
              if (titleRef.current !== selectedGoal.title) {
                selectedGoal.title = titleRef.current;
                await updateGoal(selectedGoal);
              }
              setEditingTitle(false);
            },
            text: selectedGoal.title,
            editing: editingTitle,
            icon: <EditOutlined className={styles["project-card-title-icon"]} />,
            triggerType: ["icon"],
            enterIcon: null,
          }}
          className={styles["goal-card-title"]}
        >
          {selectedGoal?.title}
        </Title>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Button type="text">
            <EllipsisOutlined />
          </Button>
        </Dropdown>
      </Flex>
      <Paragraph
        className={styles["project-card-editable"]}
        editable={{
          onStart: () => setEditingDescription(true),
          onChange: (text) => {
            setDescription(text);
            descriptionRef.current = text;
          },
          onEnd: async () => {
            if (descriptionRef.current !== selectedGoal.description) {
              selectedGoal.description = descriptionRef.current;
              await updateGoal(selectedGoal);
            }
            setEditingDescription(false);
          },
          text: selectedGoal.description,
          editing: editingDescription,
          icon: <EditOutlined className={styles["project-card-title-icon"]} />,
          triggerType: ["icon"],
          enterIcon: null,
        }}
      >
        {selectedGoal?.description}
      </Paragraph>
    </Flex>
  );
};
