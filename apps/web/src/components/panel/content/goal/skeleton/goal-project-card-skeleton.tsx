import { Skeleton } from "antd";
import { styles } from ".";
import { styles as goalStyles } from "../";

export const GoalProjectCardSkeleton = () => {
  return (
    <ul className={goalStyles["projects-list"]}>
      <li className={goalStyles["project-card-wrapper"]}>
        <Skeleton.Node
          active={true}
          className={styles["project-card-skeleton"]}
          style={{ width: "300px", height: `66%` }}
        />
      </li>
      <li className={goalStyles["project-card-wrapper"]}>
        <Skeleton.Node
          active={true}
          className={styles["project-card-skeleton"]}
          style={{ width: "300px", height: `100%` }}
        />
      </li>
      <li className={goalStyles["project-card-wrapper"]}>
        <Skeleton.Node
          active={true}
          className={styles["project-card-skeleton"]}
          style={{ width: "300px", height: `33%` }}
        />
      </li>
    </ul>
  );
};
