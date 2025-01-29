import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragOutlined, HolderOutlined } from "@ant-design/icons";
import { RoutineCard } from "components/panel/content/routine/routine-card";

export const SortableRoutineCard = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: "flex",
    alignItems: "start",
    width: "auto !important",
    flex: "1",

  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      {/* Drag Icon */}
      <div
        ref={setActivatorNodeRef}
        {...listeners}
        style={{
          cursor: "grab",
          marginRight: "8px",
          display: "flex",
          alignItems: "start",
          paddingTop: "12px",
        }}
      >
        <HolderOutlined style={{ fontSize: "20px", color: "#888" }} />
      </div>
      {/* Rest of the Card */}
      <RoutineCard item={item} />
    </div>
  );
};
