import { DescriptionsProps } from "antd";
import { useState } from "react";
import { Task } from "types/task";
import { formatDate } from "utils/utils";

interface UseHeaderProps {
    selectedTask: React.MutableRefObject<Task | undefined>;
}

export const useHeader = ({selectedTask}: UseHeaderProps) => {

      // HACK: Prevents counting characters and words every time user types something.
  // Instead, we only perform calculations when user clicks on the buttons with popover.
  const [counts, setCounts] = useState<[number, number]>();

  // eslint-disable-next-line
  const countCharactersAndWords = (node: any): [number, number] => {
    let charCount = 0;
    let wordCount = 0;

    if (node === undefined) {
      return [wordCount, charCount];
    }

    if (node.text && typeof node.text === "string") {
      charCount += node.text.length;
      const words = node.text
        .trim()
        .split(/\s+/)
        .filter((word) => word.length > 0);
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
  };

  const handleOpenDetails = () => {
    const rootNode = selectedTask!.current!.content!["root"];
    const [totalWords, totalChars] = countCharactersAndWords(rootNode);
    setCounts([totalWords, totalChars]);
  };

  const menuItems: DescriptionsProps["items"] = [
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
      children: formatDate(selectedTask!.current!.createdAt),
    },
    {
      key: "4",
      label: "Updated",
      children: formatDate(selectedTask!.current!.updatedAt),
    },
  ];

  return {
    countCharactersAndWords,
    handleOpenDetails,
    menuItems,
  }
}