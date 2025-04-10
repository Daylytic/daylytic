import { Divider, Flex } from "antd";
import { styles } from ".";
import { TimelyticStatistics, TimelyticSuggestions, TimelyticHeader } from ".";
import { Action } from "../";

export const Timelytic = () => (
  <Action>
    <Flex vertical id={styles["wrapper"]}>
      <TimelyticHeader />
      <TimelyticStatistics />
      <Divider type="horizontal" />
      <TimelyticSuggestions />
    </Flex>
  </Action>
);
