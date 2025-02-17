import React, { useContext, useEffect, useState } from "react";
import { client } from "services/api-client";
import { Tag } from "types/task";

interface TagContextType {
  tags: Tag[];
  fetchTags: () => Promise<void>;
}

const TagContext = React.createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ token, children }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const fetchTags = async () => {
    try {
      const { data } = await client.GET("/tag/", {
        params: { header: { authorization: `Bearer ${token}` } },
      });
      setTags(data ?? []);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  useEffect(() => {
    if (token && tags.length === 0) {
      fetchTags();
    }
  }, [token]);

  return (
    <TagContext.Provider
      value={{
        fetchTags,
        tags,
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export const useTags = () => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useDailyTasks must be used within a DailyTasksProvider");
  }
  return context;
};
