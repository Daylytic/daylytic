import { usePanelFetcher } from "~/providers/panel-fetcher";
import React, { useContext, useEffect, useRef, useState } from "react";
import { client } from "~/services/api-client";
import { Tag } from "~/types/task";

interface TagContextType {
  tags: Tag[];
  fetched: boolean;
  fetchTags: () => Promise<void>;
  updateLocalTag: (tag: Tag) => Promise<void>;
  updateTag: (tag: Tag) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  createTag: (name: string, color: string) => Promise<void>;
}

const TagContext = React.createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }) => {
  const { token } = usePanelFetcher();
  const [tags, setTags] = useState<Tag[]>([]);
  const [fetched, setFetched] = useState<boolean>(false);
  const fetching = useRef<boolean>(false);

  const fetchTags = async () => {
    try {
      const { data } = await client.GET("/tag/", {
        params: { header: { authorization: `Bearer ${token}` } },
      });
      setTags(data ?? []);
      setFetched(true);
      fetching.current = false;
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
        },
      });
      setTags((prevTags) => [...prevTags, data!]);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const deleteTag = async (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
    try {
      await client.DELETE("/tag/{tagId}", {
        params: { path: { tagId: id }, header: { authorization: `Bearer ${token}` } },
      });
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const updateTag = async (tag: Tag) => {
    await updateLocalTag(tag);

    try {
      await client.PUT("/tag/", {
        params: { header: { authorization: `Bearer ${token}` } },
        body: tag,
      });
    } catch (error) {
      console.error("Failed to fetch tags:", error);
    }
  };

  const updateLocalTag = async (tag: Tag) => {
    try {
      setTags((prevTags) =>
        prevTags.map((oldTag) => (oldTag.id === tag.id ? { ...oldTag, ...tag } : oldTag)),
      );
    } catch (error) {
      console.error("Failed to update tag in cache :", error);
    }
  };

  useEffect(() => {
    if (token && tags.length === 0 && !fetching.current) {
      fetching.current = true;
      fetchTags();
    }
  }, [token]);

  return (
    <TagContext.Provider
      value={{
        fetched,
        fetchTags,
        createTag,
        deleteTag,
        updateTag,
        updateLocalTag,
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
    throw new Error("useTags must be used within a DailyTasksProvider");
  }
  return context;
};
