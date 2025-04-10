import { MenuProps, Popconfirm } from "antd";
import { useTags } from "~/providers/tag";
import { useNavigate, useParams } from "react-router";
import { adjustColor } from "~/utils/color";
import { generate } from "@ant-design/colors";
import { DeleteOutlined } from "@ant-design/icons";
import { Routes } from "~/utils/routes";

export const useHeader = () => {
  const { tagId } = useParams();
  const { tags, fetched, deleteTag } = useTags();
  const navigate = useNavigate();

  const selectedTag = tags.find((tag) => tag.id === tagId);
  const palette = generate(selectedTag?.color ?? "");
  const textColor = adjustColor(palette[0]);

  const deleteCurrentTag = async () => {
    if (!selectedTag) return;
    navigate(Routes.PANEL_DASHBOARD);

    await deleteTag(selectedTag!.id);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <Popconfirm
          title="Are you sure you want to delete this tag?"
          onConfirm={deleteCurrentTag}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      ),
      key: "3",
      icon: <DeleteOutlined />,
      danger: true,
    },
  ];

  return { fetched, selectedTag, textColor, items };
};
