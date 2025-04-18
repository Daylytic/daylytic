import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Grid } from "antd";
import { styles, TaskPrioritySelect, TaskTagsPopover, TaskDateTimePicker } from ".";
import { TaskSettingsSkeleton, useSettings } from ".";
import { Task } from "~/types/task";
const { useBreakpoint } = Grid;

interface TaskSettingsProps {
  selectedTask: Task | undefined;
  onChange: (task: Task) => Promise<void>;
  onConfirmDeletetion: ((e?: React.MouseEvent<HTMLElement>) => void) | undefined;
}

export const TaskSettings = ({
  selectedTask,
  onChange,
  onConfirmDeletetion,
}: TaskSettingsProps) => {
  if (!selectedTask) return <TaskSettingsSkeleton />;

  const screens = useBreakpoint();
  const isMobile = !screens.sm;

  const { tagOptions, selectedTagOptions, priorityOptions, menuItems } = useSettings({
    selectedTask,
    onChange,
    onConfirmDeletetion,
  });

  return (
    <Flex gap="small" id={styles.settings}>
      <TaskDateTimePicker
        isMobileView={isMobile}
        selectedTask={selectedTask}
        onChange={onChange}
      />

      <TaskTagsPopover
        selectedTagOptions={selectedTagOptions}
        tagOptions={tagOptions}
        styles={styles}
      />

      <TaskPrioritySelect
        selectedTask={selectedTask}
        priorityOptions={priorityOptions}
        styles={styles}
        onChange={onChange}
      />

      <Dropdown
        menu={{
          items: menuItems,
          style: { maxHeight: 300, overflowY: "auto" },
        }}
        trigger={["click"]}
        placement="bottom"
      >
        <Button variant="filled" color="default" icon={<EllipsisOutlined />} />
      </Dropdown>
    </Flex>
  );
};