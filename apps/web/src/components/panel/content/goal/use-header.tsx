import { DeleteOutlined } from "@ant-design/icons";
import { MenuProps, Popconfirm } from "antd";
import { useParams, useNavigate } from "react-router";
import { useGoal } from "~/providers/goal";
import { Routes } from "~/utils/routes";

export const useHeader = () => {
  const { goalId } = useParams();
  const navigate = useNavigate();
  const { goals, fetched, updateGoal, deleteGoal } = useGoal();

  const selectedGoal = goals.find((goal) => goal.id === goalId);

  const deleteCurrentGoal = async () => {
    if (!selectedGoal) return;
    navigate(Routes.PANEL_DASHBOARD);
    await deleteGoal(selectedGoal.id);
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

  const handleEndEditingTitle = async (text) => {
    if (!selectedGoal) return;

    if (text !== selectedGoal.title) {
      selectedGoal.title = text;
      await updateGoal(selectedGoal);
    }
  };

  const handleEndEditingDescription = async (text) => {
    if (!selectedGoal) return;

    if (text !== selectedGoal.description) {
      selectedGoal.description = text;
      await updateGoal(selectedGoal);
    }
  };

  return {
    fetched,
    selectedGoal,
    items,
    handleEndEditingTitle,
    handleEndEditingDescription,
  };
};
