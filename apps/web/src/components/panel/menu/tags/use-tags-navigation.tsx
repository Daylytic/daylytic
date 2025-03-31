import { useNavigate } from "react-router";
import { useLayout } from "~/providers/layout";
import { getTagRoute } from "~/utils/routes";

export interface UseTagsNavigationResult {
  handleTagClick: (id: string) => void;
}

export const useTagsNavigation = (): UseTagsNavigationResult => {
  const navigate = useNavigate();
  const { setShowMenu } = useLayout();

  const handleTagClick = (id: string) => {
    navigate(getTagRoute(id));
    setShowMenu(false);
  };

  return { handleTagClick };
};
