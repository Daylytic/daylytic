import React, { useContext, useEffect, useState } from "react";
import { client } from "services/api-client";
import { Tag } from "types/task";

interface TagContextType {
  tags: Tag[];
  fetched: boolean;
  fetchTags: () => Promise<void>;
  updateCachedTag: (tag: Tag) => Promise<void>;
  createTag: (name: string, color: string) => Promise<void>;
}

const TagContext = React.createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ token, children }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);

  const fetchTags = async () => {
    try {
      const { data } = await client.GET("/tag/", {
        params: { header: { authorization: `Bearer ${token}` } },
      });
      setTags(data ?? []);
      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const createTag = async (name: string, color: string) => {
    try {
      const { data } = await client.POST("/tag/", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: {
          name: name,
          color: color,
        }
      });
      setTags((prevTags) => [...prevTags, data!]);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const updateCachedTag = async (tag: Tag) => {
    try {
      setTags((prevTags) =>
        prevTags.map((oldTag) => (oldTag.id === tag.id ? { ...oldTag, ...tag } : oldTag)),
      );
    } catch (error) {
      console.error("Failed to update tag in cache :", error);
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
        fetched,
        fetchTags,
        createTag,
        updateCachedTag,
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
