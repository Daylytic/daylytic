import { Calendar, Flex } from "antd";
import { styles, useHero } from ".";

export const CalendarHero = () => {
  const { cellRender, handleSelect } = useHero();

  return (
    <Flex className={styles.wrapper}>
      <Calendar
        className={styles.calendar}
        cellRender={cellRender}
        onSelect={handleSelect}
      />
    </Flex>
  );
};
