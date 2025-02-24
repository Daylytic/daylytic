import { Divider, List, Skeleton } from "antd";
import {styles} from ".";
import React from "react";

export const TaskListSkeleton = () => {
  const skeletonItems = [1, 2, 3];

  return (
    <List
      dataSource={skeletonItems}
      renderItem={(item, index) => (
        <React.Fragment key={index}>
          <Skeleton
            className={styles["skeleton-centered"]}
            avatar={{ shape: "square", size: "small" }}
            title={{ width: 100 }}
            active
            paragraph={{ rows: 1 }}
          />
          {index < skeletonItems.length - 1 && <Divider />}
        </React.Fragment>
      )}
    />
  );
};
