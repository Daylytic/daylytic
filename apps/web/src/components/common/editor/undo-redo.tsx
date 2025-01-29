import { UndoOutlined, RedoOutlined } from "@ant-design/icons";
import { IS_APPLE, mergeRegister } from "@lexical/utils";
import {
  iconComponentFor$,
  activeEditor$,
  useTranslation,
  MultipleChoiceToggleGroup,
} from "@mdxeditor/editor";
import { useCellValues } from "@mdxeditor/gurx";
import { Tooltip, Button, Flex } from "antd";
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useState, useEffect } from "react";

export const UndoRedo: React.FC = () => {
  const [iconComponentFor, activeEditor] = useCellValues(
    iconComponentFor$,
    activeEditor$
  );
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const t = useTranslation();

  useEffect(() => {
    if (activeEditor) {
      return mergeRegister(
        activeEditor.registerCommand<boolean>(
          CAN_UNDO_COMMAND,
          (payload) => {
            setCanUndo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        ),
        activeEditor.registerCommand<boolean>(
          CAN_REDO_COMMAND,
          (payload) => {
            setCanRedo(payload);
            return false;
          },
          COMMAND_PRIORITY_CRITICAL
        )
      );
    }
  }, [activeEditor]);

  return (
    <>
      <Tooltip
        title={t("toolbar.undo", "Undo {{shortcut}}", {
          shortcut: IS_APPLE ? "⌘Z" : "Ctrl+Z",
        })}
      >
        <Button
          disabled={!canUndo}
          type={"text"}
          icon={<Flex justify="center" align="center" style={{display: "flex"}}>
          <UndoOutlined />
        </Flex>}
          onClick={() => {
            activeEditor?.dispatchCommand(UNDO_COMMAND, undefined);
          }}
        />
      </Tooltip>
      <Tooltip
        title={t("toolbar.redo", "Redo {{shortcut}}", {
          shortcut: IS_APPLE ? "⌘Y" : "Ctrl+Y",
        })}
      >
        <Button
          disabled={!canRedo}
          type={"text"}
          icon={<Flex justify="center" align="center" style={{display: "flex"}}>
          <RedoOutlined />
        </Flex>}
          onClick={() => {
            activeEditor?.dispatchCommand(REDO_COMMAND, undefined);
          }}
        />
      </Tooltip>
    </>
  );
};
