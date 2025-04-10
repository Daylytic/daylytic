import { EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { styles } from ".";
import React from "react";

interface EditButtonProps {
  onClick?: () => Promise<void>;
  style?: React.CSSProperties;
}

export const EditButton = ({ onClick, style }: EditButtonProps) => (
  <Button type="link" onClick={onClick} className={styles.button} style={style}>
    <Tooltip title="Edit">
      <EditOutlined className={styles.icon} />
    </Tooltip>
  </Button>
);
