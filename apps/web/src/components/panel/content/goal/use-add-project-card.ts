import { PROJECT_TITLE_MIN_LENGTH, PROJECT_TITLE_MAX_LENGTH } from "@daylytic/shared/constants";
import { App } from "antd";
import { useState } from "react";
import { useGoal } from "~/providers/goal";
import { useProject } from "~/providers/project";

interface UseAddProjectCardProps {
    alwaysShowInput: boolean;
    setup?: {
        onChange: (projectName: string) => void;
    };
}

export const useAddProjectCard = ({ alwaysShowInput, setup }: UseAddProjectCardProps) => {
    const [showInput, setShowInput] = useState<boolean>(alwaysShowInput);
    const [loading, setLoading] = useState<boolean>(false);
    const [projectName, setProjectName] = useState<string>("");
    const { getSelectedGoal } = useGoal();
    const { createProject } = useProject();
    const { message } = App.useApp();

    const handleHideInput = async () => {
        if (!alwaysShowInput && projectName === "") {
            setShowInput(false);
        }
    };

    const handleInputChange = async (e) => {
        const newProjectName = e.target.value;
        setProjectName(newProjectName);
        if (setup) {
            setup.onChange(newProjectName);
        }
    };

    const isValidLength = (name) => {
        return !(name.length < PROJECT_TITLE_MIN_LENGTH || name.length > PROJECT_TITLE_MAX_LENGTH);
    };

    const handleCreateProject = async () => {
        const trimmed = projectName.trim();
        if (!isValidLength(trimmed)) {
            message.error(
                `Project name must be between ${PROJECT_TITLE_MIN_LENGTH} and ${PROJECT_TITLE_MAX_LENGTH} characters.`,
            );
            return;
        }
        setLoading(true);
        await createProject(getSelectedGoal()!.id, trimmed);
        setLoading(false);
        setProjectName("");
        setShowInput(false);
    };

    const handleShowInput = () => {
        setShowInput((prevShowInput) => !prevShowInput)
    }

    return { isValidLength, showInput, loading, handleCreateProject, projectName, handleInputChange, handleHideInput, handleShowInput };
}
