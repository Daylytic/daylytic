import { StatisticProps } from "antd";
import CountUp from "react-countup";

export const statisticsCountUp: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

export const statisticsWithDecimalsCountUp: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," decimals={1} />
);
