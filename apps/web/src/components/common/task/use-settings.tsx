import { generate } from "@ant-design/colors";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Priorities } from "@daylytic/shared/constants";
import { Tooltip, MenuProps, Popconfirm } from "antd";
import { useTags } from "providers/tag";
import { adjustColor } from "utils/color";
import { capitalize } from "utils/string";
import { Tag } from "components/common/tag";
import { Task } from "types/task";

interface UseSettingsProps {
  selectedTask: Task;
  onChange: (task: Task) => Promise<void>;
  onConfirmDeletetion: ((e?: React.MouseEvent<HTMLElement>) => void) | undefined;
}

export const useSettings = ({ selectedTask, onChange, onConfirmDeletetion }: UseSettingsProps) => {
  const { tags, updateCachedTag } = useTags();

  const priorityOptions: { label: string; value: string }[] = [];
  const tagOptions: React.JSX.Element[] = [];
  const selectedTagOptions: React.JSX.Element[] = [];

  const menuItems: MenuProps["items"] = [
    {
      key: "DELETE",
      label: (
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={onConfirmDeletetion}

          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      ),
      danger: true,
      onClick: () => {},
    },
  ];

  for (const priority of Priorities) {
    priorityOptions.push({ label: capitalize(priority.toLowerCase()), value: priority });
  }

  for (const tag of tags) {
    const containsTask = tag.taskIds.includes(selectedTask.id);

    const palette = generate(tag.color);
    const textColor = adjustColor(palette[7]);

    const newTag = (
      <Tag
        tag={tag}
        onClose={async (event) => {
          event.preventDefault();
          if (containsTask) {
            const tagIndex = selectedTask.tagIds.indexOf(tag.id, 0);
            if (tagIndex != -1) {
              selectedTask.tagIds.splice(tagIndex, 1);

              const taskIndex = tag!.taskIds.indexOf(selectedTask.id, 0);
              tag!.taskIds.splice(taskIndex, 1);
              updateCachedTag(tag);
              await onChange(selectedTask);
            }
          } else {
            tag.taskIds.push(selectedTask.id);
            selectedTask.tagIds.push(tag.id);
            onChange(selectedTask);
            updateCachedTag(tag);
          }

          if (!containsTask) {
            event.preventDefault();
          }
        }}
        closeIcon={
          containsTask ? (
            <Tooltip title="Detach Tag">
              <CloseCircleOutlined style={{ color: textColor }} />
            </Tooltip>
          ) : (
            <Tooltip title="Attach Tag">
              <PlusCircleOutlined style={{ color: textColor }} />
            </Tooltip>
          )
        }
        closable={true}
      />
    );

    if (containsTask) {
      selectedTagOptions.push(newTag);
    } else {
      tagOptions.push(newTag);
    }
  }

  return {
    tagOptions,
    menuItems,
    priorityOptions,
    selectedTagOptions,
  };
};
