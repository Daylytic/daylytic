import { Skeleton } from "antd";
import clsx from "clsx";
import styles from "./goal-skeleton.module.css";
import { styles as goalStyles } from "../";

export const GoalProjectsCardSkeleton = () => {
  return (
    <ul className={goalStyles["projects-list"]}>
      <li className={goalStyles["project-card-wrapper"]}>
        <Skeleton.Node
          active={true}
          className={clsx(styles["project-card-skeleton"])}
          style={{ width: "300px", height: `66%` }}
        />
      </li>
      <li className={goalStyles["project-card-wrapper"]}>
        <Skeleton.Node
          active={true}
          className={clsx(styles["project-card-skeleton"])}
          style={{ width: "300px", height: `100%` }}
        />
      </li>
      <li className={goalStyles["project-card-wrapper"]}>
        <Skeleton.Node
          active={true}
          className={clsx(styles["project-card-skeleton"])}
          style={{ width: "300px", height: `33%` }}
        />
      </li>
    </ul>
  );
};
