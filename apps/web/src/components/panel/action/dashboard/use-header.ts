import { Grid } from "antd";
import { useNavigate } from "react-router";
import { useLayout } from "~/providers/layout";
const { useBreakpoint } = Grid;

export const useHeader = () => {
    const { setShowAction } = useLayout();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const navigate = useNavigate();

    const handleExitClick = () => {
        if (!isMobile) {
            navigate("..");
        }
        setShowAction(false);
    };

    return { handleExitClick }
}