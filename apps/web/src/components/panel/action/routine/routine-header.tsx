import { EditOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Flex, Typography, Popover, Descriptions, Button, DescriptionsProps } from "antd";
import clsx from "clsx";
import { useDailyTasks } from "providers/daily-tasks";
import styles from "./routine.module.css";
import { useState } from "react";
import { formatDate } from "utils/utils";

export const RoutineHeader = () => {
  const { selectedTask, updateTask } = useDailyTasks();

  // HACK: Prevents counting characters and words every time user types something. 
  // Instead, we only perform calculations when user clicks on the buttons with popover.
  const [ counts, setCounts ] = useState<[number, number]>();

  const countCharactersAndWords = (node: any): [number, number] => {
    let charCount = 0;
    let wordCount = 0;
  
    if (node.text && typeof node.text === 'string') {
      charCount += node.text.length;
      const words = node.text.trim().split(/\s+/).filter(word => word.length > 0);
      wordCount += words.length;
    }
  
    if (node.children && Array.isArray(node.children)) {
      for (const child of node.children) {
        const [childChars, childWords] = countCharactersAndWords(child);
        charCount += childChars;
        wordCount += childWords;
      }
    }
  
    return [wordCount, charCount];
  }

  const handleOpenDetails = () => {
    const rootNode = selectedTask!.content!["root"];
    const [totalWords, totalChars] = countCharactersAndWords(rootNode);
    setCounts([totalWords, totalChars])
  }

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Words",
      children: counts ? counts[0] : "...",
    },
    {
      key: "2",
      label: "Characters",
      children: counts ? counts[1] : "...",
    },
    {
      key: "3",
      label: "Created",
      children: formatDate(selectedTask!.createdAt)
    },
    {
      key: "4",
      label: "Updated",
      children: formatDate(selectedTask!.updatedAt),
    },
  ];

  return (
    <Flex className={clsx("ant-typography")} justify="space-between" align="center">
      <Typography.Title
        level={2}
        // editable
        editable={{
          onChange: (text) => {
            selectedTask!.title = text;
            updateTask(selectedTask!);
          },
          icon: <EditOutlined className={styles["header-edit-icon"]} />,
          triggerType: ["icon"], // Hide the edit icon; click text to edit
          autoSize: { maxRows: 1}, // Match text height
        }}
        style={{ marginBottom: "0" }}
      >
        {selectedTask!.title}
      </Typography.Title>
      <Popover
        placement="bottomLeft"
        content={
          <Descriptions column={1} layout="vertical" items={items} style={{ width: "auto" }} />
        }
        trigger={"click"}
      >
        <Button onClick={handleOpenDetails} icon={<InfoCircleOutlined />} type={"text"} />
      </Popover>
    </Flex>
  );
};