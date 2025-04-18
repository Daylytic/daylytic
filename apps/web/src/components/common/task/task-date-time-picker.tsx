import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, DatePicker, Modal, TimePicker, Flex } from "antd";
import { dateWithTimeFormat, timeFormat } from "~/utils/date";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Task } from "~/types/task";
import clsx from "clsx";
import { styles } from ".";

interface TaskDateTimePickerProps {
  isMobileView: boolean;
  selectedTask: Task;
  onChange: (task: Task) => Promise<void>;
}

export const TaskDateTimePicker: React.FC<TaskDateTimePickerProps> = ({
  isMobileView,
  selectedTask,
  onChange,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Dayjs | null>(
    dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null,
  );

  // Handle RESET
  const handleReset = () => {
    selectedTask.deadline = "";
    onChange(selectedTask);
    setTempDate(null);
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setTempDate(dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (tempDate) {
      selectedTask.deadline = tempDate.toISOString();
      onChange(selectedTask);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  // Routine type ONLY picks time
  if (selectedTask.taskType === "ROUTINE") {
    const val = dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null;
    return (
      <Flex gap="small" align="center">
        <TimePicker
          format={timeFormat}
          variant="filled"
          prefix={<ClockCircleOutlined />}
          placeholder="Time"
          value={val}
          onChange={(time) => {
            if (time) {
              const dt = val
                ? val.hour(time.hour()).minute(time.minute()).second(0)
                : dayjs().hour(time.hour()).minute(time.minute()).second(0);
              selectedTask.deadline = dt.toISOString();
              onChange(selectedTask);
            }
          }}
        />
        {val && (
          <Button size="small" onClick={handleReset}>
            Reset
          </Button>
        )}
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
          centered
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
              format="YYYY-MM-DD"
              placeholder="Select date"
              style={{ width: "100%" }}
              value={tempDate}
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

  const val = dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null;
  return (
    <Flex gap="small" align="center">
      <DatePicker
        format={dateWithTimeFormat}
        variant="filled"
        prefix={<CalendarOutlined />}
        showTime={{ format: timeFormat }}
        placeholder="Date"
        value={val}
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
