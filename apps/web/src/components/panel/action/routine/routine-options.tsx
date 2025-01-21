import {
  Row,
  Col,
  DatePicker,
  Flex,
  Select,
  SelectProps,
  Tag,
  Button,
  Divider,
} from "antd";
import dayjs from "dayjs";
import { useDailyTasks } from "providers/daily-tasks";
import styles from "./routine.module.css";

type TagRender = SelectProps["tagRender"];

export const RoutineOptions = ({open, setOpen} : {open: boolean, setOpen: (value: boolean) => void}) => {
  const { tasks, setSelectedTask, selectedTask } = useDailyTasks();

  const tags = [...tasks, selectedTask!].flatMap((task) => task.tags);

  const dropdownRender = (menus: React.ReactNode) => (
    <div>
      {menus}
      <Divider className={styles["dropdown-divider"]} />
      <Button
        type="text"
        id={styles["dropdown-button"]}
        onClick={() => {

          setOpen(!open);
        }}
      >
        New Tag
      </Button>
    </div>
  );

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const tag = selectedTask?.tags.find((tag) => tag.id === value);
    if (!tag) {
      return <></>;
    }

    return (
      <Tag
        color={tag!.color ?? null}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        className={styles.tag}
      >
        {label}
      </Tag>
    );
  };

  return (
    <>
      <Row>
        <Col span={18} push={6}>
          <DatePicker
            value={
              selectedTask!.deadline ? dayjs(selectedTask!.deadline) : null
            }
            onChange={
              (date) => {
                const isoDate = date?.toISOString() || null;
                if(isoDate === null) {
                    return;
                }

                selectedTask!.deadline = isoDate;
                setSelectedTask(selectedTask);
              }
            }
          />
        </Col>
        <Col span={6} pull={18}>
          Deadline
        </Col>
      </Row>
      <Row>
        <Col span={18} push={6}>
          <Flex gap="4px 0" wrap id={styles["tags-wrapper"]}>
            <Select
              mode="multiple"
              tagRender={tagRender}
              id={styles["tags-select"]}
              value={selectedTask!.tags.map((tag) => tag.id)}
              options={[
                ...tags.map((tag) => {
                  return { value: tag.id, label: tag.name };
                }),
              ]}
              onChange={(value, selectedOptions) => {
                console.log([value, selectedOptions]);
                console.log("update!!!");
                if(!selectedOptions) {
                    return;
                }
                console.log(selectedOptions);
                // selectedTask!.tags = selectedOptions;
                // handleTaskChange("tags", selectedOptions);
              }}
              dropdownRender={dropdownRender}
              placeholder="Please select"
            ></Select>
          </Flex>
        </Col>
        <Col span={6} pull={18}>
          Tags
        </Col>
      </Row>
    </>
  );
};
