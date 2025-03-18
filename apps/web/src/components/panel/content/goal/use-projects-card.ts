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
import { Project } from "types/goal";
import { useTask } from "providers/task";

export const useProjectsCard = (project: Project) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>("");
    const { createTask, tasks, fetched } = useTask();
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskName(e.target.value);
    }, []);

    const handleTaskCreate = useCallback(async () => {
        setLoading(true);
        await createTask(project.goalId, project.id, taskName);
        setTaskName("");
        setLoading(false);
    }, [createTask, project.goalId, project.id, taskName]);

    const projectTasks = useMemo(
        () => tasks.filter((task) => task.projectId === project.id),
        [tasks, project.id]
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

    return { taskName, headerRef, loading, isDraggedOver, sortedTasks, handleInputChange, handleTaskCreate, cardListRef, projectRef, closestEdge, fetched }
}