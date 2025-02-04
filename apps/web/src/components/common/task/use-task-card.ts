import { useRef, useEffect, useState } from "react";
import {
    draggable,
    dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import {
    attachClosestEdge,
    Edge,
    extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { Task } from "~/types/task";

interface UseTaskCardProps {
    selectedTask: Task | undefined;
    item: Task;
    enabled?: boolean;
}

export const useTaskCard = ({ selectedTask, item, enabled }: UseTaskCardProps) => {
    if(enabled === false) {
        return {};
    }
    
    const ref = useRef(null);
    const [dragging, setDragging] = useState<boolean>(false);
    const [closestEdge, setClosestEdge] = useState<Edge | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return;
        }

        return combine(
            draggable({
                element: el,
                onDragStart: () => setDragging(true),
                onDrop: () => {
                    setDragging(false);
                    setClosestEdge(null);
                },
                getInitialData: () => ({
                    type: "task-card",
                    taskId: item.id,
                    projectId: item.projectId,
                    index: item.position,
                }),
            }),
            dropTargetForElements({
                element: el,
                canDrop: ({ source }) => source.data.taskId !== item.id && source.data.type === "task-card",
                getData: ({ input, element }) => {
                    const data = {
                        type: "task-card",
                        taskId: item.id,
                        projectId: item.projectId,
                        index: item.position,
                    };

                    return attachClosestEdge(data, {
                        input,
                        element,
                        allowedEdges: ["top", "bottom"],
                    });
                },
                getIsSticky: () => true,
                onDragEnter: ({ source, self }) => {
                    if (source.data === undefined) return;
                    const closestEdge = extractClosestEdge(self.data);
                    setClosestEdge(closestEdge);
                },
                onDrag: ({ self }) => {
                    const closestEdge = extractClosestEdge(self.data);
                    setClosestEdge(closestEdge);
                },
                onDragLeave: () => {
                    setClosestEdge(null);
                },
                onDrop: () => {
                    setClosestEdge(null);
                },
            }),
        );
    }, [item.id]);

    return { ref, selectedTask, closestEdge, dragging }
}