import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { TASK_TITLE_MIN_LENGTH, TASK_TITLE_MAX_LENGTH } from "@daylytic/shared/constants";
import { App, InputRef, Popconfirm } from "antd";
import { MenuProps } from "antd";
import { Project } from "~/types/goal";
import { useProject } from "~/providers/project";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { Task } from "~/types/task";
import { getGoalRoute } from "~/utils/routes";
import { useSelectedTask } from "~/providers/selected-task";
import { useTask } from "~/providers/task";
import { useNavigate } from "react-router";
import { useLayout } from "~/providers/layout";
import { BorderLeftOutlined, BorderRightOutlined, DeleteOutlined } from "@ant-design/icons";

export const useProjectsCard = (project: Project) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const { createTask, tasks, fetched, updateTasks } = useTask();
  const [closestEdge, setClosestEdge] = useState<Edge | null>(null);
  const { updateProjects, projects, deleteProject } = useProject();
  const [editing, setEditing] = useState<boolean>(false);
  const { setSelectedTask } = useSelectedTask();
  const { setShowAction } = useLayout();
  const navigate = useNavigate();
  const inputRef = useRef<InputRef>(null);

  const { message } = App.useApp();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }, []);

  const isValidLength = (name) => {
    return !(name.length < TASK_TITLE_MIN_LENGTH || name.length > TASK_TITLE_MAX_LENGTH);
  };

  const handleTaskCreate = useCallback(async () => {
    const trimmed = taskName.trim();
    if (!isValidLength(trimmed)) {
      message.error(
        `Task name must be between ${TASK_TITLE_MIN_LENGTH} and ${TASK_TITLE_MAX_LENGTH} characters.`,
      );
      return;
    }

    setLoading(true);
    await createTask(taskName, "PROJECT", project.id);
    setTaskName("");
    setLoading(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [createTask, project.goalId, project.id, taskName]);

  const projectTasks = useMemo(
    () => tasks.filter((task) => task.projectId === project.id),
    [tasks, project.id],
  );

  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const projectRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardListRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const projectEl = projectRef.current;
    const headerEl = headerRef.current;
    const cardListEl = cardListRef.current;

    if (!projectEl || !headerEl || !cardListEl) {
      return;
    }

    return combine(
      draggable({
        element: projectEl,
        dragHandle: headerEl,
        onDragStart: () => setIsDraggedOver(true),
        onDrop: () => setIsDraggedOver(false),
        getInitialData: () => ({
          projectId: project.id,
          index: project.position,
          type: "project",
          goalId: project.goalId,
        }),
      }),
      dropTargetForElements({
        element: cardListEl,
        onDragStart: () => setIsDraggedOver(true),
        canDrop: (args) => args.source.data.type === "task-card",
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
        getData: () => ({ projectId: project.id }),
        getIsSticky: () => true,
      }),
      dropTargetForElements({
        element: projectEl,
        canDrop: (args) => args.source.data.type === "project",
        getIsSticky: () => true,
        getData: ({ input, element }) => {
          const data = {
            projectId: project.id,
            goalId: project.goalId,
            type: "project",
            index: project.position,
          };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["left", "right"],
          });
        },
        onDragEnter: ({ source, self }) => {
          if (source.data === undefined) return;
          const closestEdge = extractClosestEdge(self.data);
          setClosestEdge(closestEdge);
        },
        onDrag: ({ source, self }) => {
          if (source.data === undefined) return;
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDragLeave: () => {
          setClosestEdge(null);
        },
        onDrop: () => {
          setClosestEdge(null);
        },
      }),
    );
  }, [project.id]); // Only re-run when project ID changes

  const sortedTasks = useMemo(() => {
    return [...projectTasks].sort((a, b) => a.position - b.position);
  }, [projectTasks]);

  const sortedProjects = projects
    .filter((proj) => proj.goalId === project.goalId)
    .sort((a, b) => a.position - b.position);

  const moveProject = async (startIndex: number, finishIndex: number) => {
    const reorderedProjects = reorder({
      list: sortedProjects,
      startIndex,
      finishIndex,
    }).map((proj, index) => ({
      ...(proj as Project),
      position: index,
    }));

    await updateProjects(reorderedProjects);
  };

  const deleteCurrentProject = async () => {
    deleteProject(project.goalId, project.id);
  };

  const items: MenuProps["items"] = [
    {
      label: "Move To The Left",
      key: "1",
      icon: <BorderLeftOutlined />,
      onClick: async () => {
        const startIndex = sortedProjects.map((proj) => proj.id).indexOf(project.id);
        if (startIndex !== -1) {
          await moveProject(startIndex, startIndex - 1);
        }
      },
    },
    {
      label: "Move To The Right",
      key: "2",
      icon: <BorderRightOutlined />,
      onClick: async () => {
        const startIndex = sortedProjects.map((proj) => proj.id).indexOf(project.id);
        if (startIndex !== -1) {
          await moveProject(startIndex, startIndex + 1);
        }
      },
    },
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this project?"
          onConfirm={deleteCurrentProject}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      ),
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: async () => {},
    },
  ];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowAction(true);
    navigate(getGoalRoute(project.goalId, task.id));
  };

  const handleStartEditing = () => {
    setEditing(true);
  };

  const handleCancelEditing = () => {
    setEditing(false);
  };

  const handleEndEditing = async (text: string) => {
    setEditing(false);
    if (text !== project.title) {
      project.title = text;
      await updateProjects([project]);
    }
  };

  return {
    isValidLength,
    taskName,
    headerRef,
    loading,
    isDraggedOver,
    sortedTasks,
    handleInputChange,
    handleTaskCreate,
    cardListRef,
    projectRef,
    closestEdge,
    fetched,
    handleStartEditing,
    handleCancelEditing,
    handleEndEditing,
    editing,
    updateTasks,
    items,
    handleTaskClick,
    inputRef,
  };
};
