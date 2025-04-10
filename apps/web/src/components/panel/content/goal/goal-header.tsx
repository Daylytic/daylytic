import { Button, Dropdown, Flex } from "antd";
import { styles, useHeader } from ".";
import { GoalHeaderSkeleton } from "./skeleton";
import { EllipsisOutlined } from "@ant-design/icons";
import clsx from "clsx";
import { TextArea } from "~/components/common/text-area";
import { ContentHeaderAction } from "../";
import {
  GOAL_DESCRIPTION_MAX_LENGTH,
  GOAL_DESCRIPTION_MIN_LENGTH,
  GOAL_TITLE_MAX_LENGTH,
  GOAL_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";

export const GoalHeader = () => {
  const { handleEndEditingTitle, handleEndEditingDescription, fetched, selectedGoal, items } =
    useHeader();

  if (!fetched || !selectedGoal) {
    return <GoalHeaderSkeleton />;
  }

  return (
    <Flex justify="space-between" align="start">
      <Flex key={selectedGoal.id} vertical className={styles["goal-header-wrapper"]}>
        <Flex justify="start" align="start" gap="small">
          <ContentHeaderAction />
          <TextArea
            type="h1"
            minLength={GOAL_TITLE_MIN_LENGTH}
            maxLength={GOAL_TITLE_MAX_LENGTH}
            defaultValue={selectedGoal.title ?? ""}
            onEnd={handleEndEditingTitle}
          />
        </Flex>

        <TextArea
          maxRows={1}
          minLength={GOAL_DESCRIPTION_MIN_LENGTH}
          maxLength={GOAL_DESCRIPTION_MAX_LENGTH}
          onEnd={handleEndEditingDescription}
          type="paragraph"
          defaultValue={selectedGoal.description ?? ""}
          className={clsx(styles["goal-description"], "ant-typography css-var-r1")}
        />
      </Flex>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text">
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    </Flex>
  );
};
