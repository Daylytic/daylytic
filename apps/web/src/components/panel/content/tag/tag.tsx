import { Content } from "antd/es/layout/layout";
import {styles} from ".";
import { TagHeader, TagList } from ".";

export const Tag = () => (
  <Content id={styles.content}>
    <TagHeader />
    <TagList />
  </Content>
);
