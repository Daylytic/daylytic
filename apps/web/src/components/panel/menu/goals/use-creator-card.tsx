import { useGoal } from "~/providers/goal";
import { useState } from "react";
import {
  GOAL_DESCRIPTION_MAX_LENGTH,
  GOAL_DESCRIPTION_MIN_LENGTH,
  GOAL_TITLE_MAX_LENGTH,
  GOAL_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";
import { App } from "antd";

interface UseCreatorCardProps {
  alwaysShowInput?: boolean;
  setup?: {
    onChange: (title: string, description: string) => void;
  };
}

export const useCreatorCard = ({ alwaysShowInput = false, setup }: UseCreatorCardProps) => {
  const [showInput, setShowInput] = useState<boolean>(alwaysShowInput);
  const [loading, setLoading] = useState<boolean>(false);
  const [goalTitle, setGoalTitle] = useState<string>("");
  const [goalDescription, setGoalDescription] = useState<string>("");
  const { createGoal } = useGoal();
  const { message, notification } = App.useApp();

  const handleHideInput = async () => {
    if (!alwaysShowInput && goalTitle === "" && goalDescription === "") {
      setShowInput(false);
    }
  };

  const handleTitleChange = async (e) => {
    const newTitle = e.target.value;
    setGoalTitle(newTitle);
    if (setup) {
      setup.onChange(newTitle, goalDescription);
    }
  };

  const handleDescriptionChange = async (e) => {
    const newDescription = e.target.value;
    setGoalDescription(newDescription);
    if (setup) {
      setup.onChange(goalTitle, newDescription);
    }
  };

  const isValidLengthTitle = (name) => {
    return !(name.length < GOAL_TITLE_MIN_LENGTH || name.length > GOAL_TITLE_MAX_LENGTH);
  };

  const isValidLengthDescription = (name) => {
    return !(
      name.length < GOAL_DESCRIPTION_MIN_LENGTH || name.length > GOAL_DESCRIPTION_MAX_LENGTH
    );
  };

  const handleCreateGoal = async () => {
    const trimmedTitle = goalTitle.trim();
    const trimmedDescription = goalDescription.trim();
    if (!isValidLengthTitle(trimmedTitle)) {
      message.error(
        `Goal title must be between ${GOAL_TITLE_MIN_LENGTH} and ${GOAL_TITLE_MAX_LENGTH} characters.`,
      );
      return;
    }

    if (!isValidLengthDescription(trimmedDescription)) {
      message.error(
        `Goal description must be between ${GOAL_DESCRIPTION_MIN_LENGTH} and ${GOAL_DESCRIPTION_MAX_LENGTH} characters.`,
      );
      return;
    }

    if (trimmedDescription.length <= 100) {
      notification.warning({
        message: `It is not recommended to keep the goal description short or empty. Providing more details can help you stay focused and reach your goals. For more tips visit our guide next to settings.`,
        duration: 10,
      });
    }

    setLoading(true);
    await createGoal(goalTitle, goalDescription);
    setLoading(false);
    setGoalTitle("");
    setGoalDescription("");
    setShowInput(false);
  };

  const handleGoalCreateButtonClick = () => {
    setShowInput((prevShowInput) => !prevShowInput);
  };

  return {
    showInput,
    loading,
    handleCreateGoal,
    handleTitleChange,
    handleHideInput,
    goalTitle,
    handleDescriptionChange,
    goalDescription,
    handleGoalCreateButtonClick,
    isValidLengthTitle,
    isValidLengthDescription,
  };
};
