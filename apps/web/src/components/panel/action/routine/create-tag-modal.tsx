import { faker } from "@faker-js/faker";
import { Modal } from "antd";
import cuid from "cuid";
import { useDailyTasks } from "providers/daily-tasks";
import { useState } from "react";

export const CreateTagModal = ({open, setOpen} : {open: boolean, setOpen: (value: boolean) => void}) => {
  const { setSelectedTask, selectedTask } = useDailyTasks();
  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      open={open}
      onOk={() => {
        setOpen(false);
        selectedTask!.tags = [
          ...selectedTask!.tags,
          {
            id: cuid(),
            name: faker.animal.petName(),
            color: faker.color.rgb(),
          },
        ];
        setSelectedTask(selectedTask);
      }}
      onCancel={() => setOpen(false)}
    >
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>
  );
};
