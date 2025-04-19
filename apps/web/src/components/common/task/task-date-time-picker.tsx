import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Modal, TimePicker, Flex } from "antd";
import { dateFormat, dateWithTimeFormat, timeFormat } from "~/utils/date";
import dayjs from "dayjs";
import { Task } from "~/types/task";
import clsx from "clsx";
import { styles, useDateTimePicker } from ".";

interface TaskDateTimePickerProps {
  isMobileView: boolean;
  selectedTask: Task;
  onChange: (task: Task) => Promise<void>;
}

export const TaskDateTimePicker = ({
  isMobileView,
  selectedTask,
  onChange,
}: TaskDateTimePickerProps) => {
  const {
    handleModalCancel,
    handleModalOk,
    handleReset,
    handleOpenModal,
    isModalVisible,
    tempDate,
    setTempDate,
  } = useDateTimePicker({ selectedTask, onChange });
  const deadline = dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null;

  // Routine type ONLY picks time
  if (selectedTask.taskType === "ROUTINE") {
    return (
      <Flex gap="small" align="center">
        <TimePicker
          format={timeFormat}
          variant="filled"
          prefix={<ClockCircleOutlined />}
          placeholder="Time"
          value={deadline}
          onChange={(time) => {
            if (time) {
              const dt = deadline
                ? deadline.hour(time.hour()).minute(time.minute()).second(0)
                : dayjs().hour(time.hour()).minute(time.minute()).second(0);
              selectedTask.deadline = dt.toISOString();
              onChange(selectedTask);
            }
          }}
        />
      </Flex>
    );
  }

  // MOBILE
  if (isMobileView) {
    return (
      <>
        <Button
          icon={<CalendarOutlined />}
          onClick={handleOpenModal}
          color="default"
          variant="filled"
          className={clsx(styles["settings-button"])}
        >
          Date
        </Button>

        <Modal
          title="Select Date & Time"
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalCancel}
          
          okText="Confirm"
          cancelText="Cancel"
          modalRender={(modal) => (
            <Flex align="center" justify="center">
              {modal}
            </Flex>
          )}
          footer={[
            <Button key="reset" type="default" danger onClick={handleReset}>
              Reset
            </Button>,
            <Button key="cancel" onClick={handleModalCancel}>
              Cancel
            </Button>,
            <Button key="ok" type="primary" onClick={handleModalOk}>
              Confirm
            </Button>,
          ]}
        >
          <Flex vertical gap="middle" style={{ width: "100%" }}>
            <DatePicker
              format={dateFormat}
              placeholder="Select date"
              style={{ width: "100%" }}
              value={tempDate}
              inputReadOnly={true}
              onChange={(date) => {
                if (date && tempDate) {
                  const newDate = date.hour(tempDate.hour()).minute(tempDate.minute()).second(0);
                  setTempDate(newDate);
                } else {
                  setTempDate(date);
                }
              }}
            />
            <TimePicker
              format={timeFormat}
              placeholder="Select time"
              style={{ width: "100%" }}
              value={tempDate}
              inputReadOnly={true}
              onChange={(time) => {
                if (time && tempDate) {
                  const newDate = tempDate.hour(time.hour()).minute(time.minute()).second(0);
                  setTempDate(newDate);
                } else if (time) {
                  setTempDate(dayjs().hour(time.hour()).minute(time.minute()).second(0));
                }
              }}
            />
          </Flex>
        </Modal>
      </>
    );
  }

  return (
    <Flex gap="small" align="center">
      <DatePicker
        format={dateWithTimeFormat}
        variant="filled"
        prefix={<CalendarOutlined />}
        showTime={{ format: timeFormat }}
        placeholder="Date"
        value={deadline}
        onChange={(date) => {
          if (date) {
            selectedTask.deadline = date.toISOString();
            onChange(selectedTask);
          }
        }}
      />
    </Flex>
  );
};
