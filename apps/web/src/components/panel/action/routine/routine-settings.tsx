import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  FlagOutlined,
  MoreOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Button, Flex, Tag } from "antd";

export const RoutineSettings = () => {
  return (
    <Flex gap="small" style={{width: "100%", display: "flex", backgroundColor: "white"}}>
      <Button type="default" icon={<EditOutlined />} style={{flex: 1}}>
        Text Format
      </Button>
      <Button type="default" icon={<TagsOutlined />} style={{flex: 1}}>
        Tags
      </Button>

      <Button type="default" icon={<FlagOutlined />} style={{flex: 1}}>
        Priority
      </Button>
      <Button icon={<EllipsisOutlined />} shape="circle"></Button>
    </Flex>
  );
};
