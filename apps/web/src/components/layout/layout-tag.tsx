import { Outlet } from "react-router";
import { Tag as TagContent } from "components/panel/content/tag";

export const LayoutTag = () => (
  <>
    <TagContent />
    <Outlet />
  </>
);
