import { Select } from "antd";
import { FlagOutlined } from "@ant-design/icons";
import { Task } from "~/types/task";

interface TaskPrioritySelectProps {
  selectedTask: Task;
  priorityOptions: { label: string; value: string }[];
  styles: React.CSSProperties;
  onChange: (task: Task) => Promise<void>;
}

export const TaskPrioritySelect = ({
  selectedTask,
  priorityOptions,
  styles,
  onChange,
}: TaskPrioritySelectProps) => (
  <Select
    allowClear
    prefix={<FlagOutlined />}
    variant="filled"
    className={styles["settings-button"]}
    options={priorityOptions}
    placeholder="Priority"
    value={selectedTask.priority}
    onChange={(e) => {
      selectedTask.priority = e;
      onChange(selectedTask);
    }}
  />
);
