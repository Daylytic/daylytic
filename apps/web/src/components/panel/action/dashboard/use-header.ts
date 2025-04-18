import { Grid } from "antd";
import { useNavigate, useParams } from "react-router";
import { useLayout } from "~/providers/layout";
const { useBreakpoint } = Grid;

export const useHeader = () => {
    const { setShowAction } = useLayout();
    const { assistanceId } = useParams();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const navigate = useNavigate();

    const handleExitClick = () => {
        if (!assistanceId) {
            setShowAction(false);
        }

        if (!isMobile) {
            navigate(-1);
        }
    };

    return { handleExitClick, assistanceId }
}