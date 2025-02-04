import React, { useState, useRef, useEffect, forwardRef } from "react";
import { App, Flex, Typography } from "antd";
import { styles } from ".";
import clsx from "clsx";
import { EditButton } from "~/components/common/edit-button";

interface TextAreaProps {
  type: "h1" | "h2" | "h3" | "h4" | "h5" | "paragraph";
  defaultValue: string;
  maxRows?: number;
  minLength?: number;
  maxLength?: number;
  onEnd?: (value: string) => void;
  onChange?: (value: string) => void;
  onStart?: () => void;
  onCancel?: () => void;
  className?: string;
  editing?: boolean;
  editableTrigger?: "button" | "text" | "textarea";
  ref?: React.Ref<HTMLDivElement>;
}

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  (
    {
      type,
      defaultValue,
      maxRows,
      minLength,
      maxLength,
      onCancel,
      onEnd,
      editing,
      editableTrigger = "button",
      className,
      onStart,
      onChange,
    },
    ref,
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [editingText, setEditingText] = useState<boolean>(editing ?? false);
    const [initialEditing, setInitialEditing] = useState<boolean>(false);
    const [expanded, setExpanded] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { message } = App.useApp();

    const isWithinLimits = (text) => {
      return (
        (minLength === undefined || text.length >= minLength) &&
        (maxLength === undefined || text.length <= maxLength)
      );
    };

    const resizeTextArea = () => {
      if (!textAreaRef.current) return;
      textAreaRef.current.style.height = "auto";
      const computedStyle = window.getComputedStyle(textAreaRef.current);
      const lineHeightStr = computedStyle.lineHeight;
      const lineHeight = parseFloat(lineHeightStr);
      const scrollSize = textAreaRef.current.scrollHeight;
      const lines = scrollSize / lineHeight;
      const newHeight = Math.floor(lines) * lineHeight;
      textAreaRef.current.style.height = `${newHeight}px`;
    };

    useEffect(() => {
      if ((editingText || editing !== undefined) && textAreaRef.current && !initialEditing) {
        textAreaRef.current.focus();
        setInitialEditing(true);
        textAreaRef.current.setSelectionRange(value.length, value.length);
      }
      resizeTextArea();
      window.addEventListener("resize", resizeTextArea);
      return () => window.removeEventListener("resize", resizeTextArea);
    }, [value, editingText, defaultValue]);

    const flexClass = type === "paragraph" ? "ant-typography-paragraph" : `ant-typography-${type}`;

    const isValidLength = (name) => {
      if (!isWithinLimits(name)) {
        let lengthMessage = "The text length is invalid. It must be";

        if (minLength !== undefined && maxLength !== undefined) {
          lengthMessage += ` between ${minLength} and ${maxLength} characters.`;
        } else if (minLength !== undefined) {
          lengthMessage += ` at least ${minLength} characters.`;
        } else if (maxLength !== undefined) {
          lengthMessage += ` at most ${maxLength} characters.`;
        }

        message.error(lengthMessage);
        return false;
      }

      return true;
    };

    const handleSave = () => {
      if (!isValidLength(value)) {
        return;
      }

      setInitialEditing(false);
      if (onEnd) {
        onEnd(value);
      }

      if (editableTrigger === "textarea") {
        textAreaRef?.current?.blur();
      }

      if (editing === undefined) setEditingText(false);
    };

    const handleCancel = () => {
      setInitialEditing(false);
      if (onCancel) {
        onCancel();
      }

      if (editableTrigger === "textarea") {
        textAreaRef?.current?.blur();
      } else {
        setValue(defaultValue);
      }

      if (editing === undefined) setEditingText(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSave();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      }
    };

    const triggerEditing = async () => {
      if (onStart) {
        onStart();
      }
      if (editing === undefined) {
        setEditingText(true);
      } else {
        // Force re-render if value is controlled externally.
        setValue((prev) => prev + " ");
      }
    };

    const renderButton = () => {
      return (
        !editingText && editableTrigger === "button" && <EditButton onClick={triggerEditing} />
      );
    };

    const renderTextArea = () => {
      return (
        <textarea
          rows={1}
          value={value}
          onKeyDown={handleKeyDown}
          onBlur={handleCancel}
          onChange={(e) => {
            setValue(e.target.value);

            if (!isValidLength(e.target.value)) {
              return;
            }

            if (onChange) onChange(e.target.value);
          }}
          ref={textAreaRef}
          className={clsx(styles.textarea, styles.text, "ant-typography css-var-r1")}
        />
      );
    };

    const renderTextView = () => {
      const textProps =
        editableTrigger === "text" ? { onClick: triggerEditing, style: { cursor: "pointer" } } : {};

      if (type === "paragraph") {
        return (
          <Typography.Paragraph
            className={styles.text}
            {...textProps}
            ellipsis={
              !expanded && maxRows
                ? {
                    rows: maxRows,
                    expandable: true,
                    onExpand: () => setExpanded(true),
                    symbol: "Expand",
                  }
                : false
            }
          >
            {defaultValue}
            {renderButton()}
          </Typography.Paragraph>
        );
      } else {
        const level = Number(type.substring(1));
        return (
          <Typography.Title
            level={level as 1 | 2 | 3 | 4 | 5}
            className={styles.text}
            {...textProps}
          >
            {defaultValue}
            {renderButton()}
          </Typography.Title>
        );
      }
    };

    return (
      <Flex
        ref={ref}
        align="bottom"
        className={clsx(flexClass, styles.wrapper, !isWithinLimits(value) && styles.border, className)}
      >
        {editingText || editableTrigger === "textarea" || editing
          ? renderTextArea()
          : renderTextView()}
      </Flex>
    );
  },
);
