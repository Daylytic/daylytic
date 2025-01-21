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

type TagRender = SelectProps["tagRender"];

export const RoutineOptions = ({open, setOpen} : {open: boolean, setOpen: (value: boolean) => void}) => {
  const { tasks, setSelectedTask, selectedTask } = useDailyTasks();

  const tags = [...tasks, selectedTask!].flatMap((task) => task.tags);

  const dropdownRender = (menus: React.ReactNode) => (
    <div>
      {menus}
      <Divider style={{ margin: 0 }} />
      <Button
        type="text"
        style={{ width: "100%" }}
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
        color={tag!.color ?? "grey"}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
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
          <Flex gap="4px 0" wrap style={{ width: "100%" }}>
            <Select
              mode="multiple"
              tagRender={tagRender}
              style={{ width: "100%" }}
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
