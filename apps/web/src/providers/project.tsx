
import { usePanelFetcher } from "~/providers/panel-fetcher";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { client } from "~/services/api-client";
import { Project } from "~/types/goal";

interface ProjectContextType {
  projects: Project[];
  selectedProject: React.MutableRefObject<Project | undefined>;

  fetched: boolean;
  createProject: (goalId: string, title: string) => Promise<void>;
  updateProjects: (projects: Project[]) => Promise<void>;
  deleteProject: (goalId: string, projectId: string) => Promise<void>;
}

const ProjectContext = React.createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }) => {
  const { getProjectsData, token, fetched: goalsFetched } = usePanelFetcher();

  const [projects, setProjects] = useState<Project[]>([]);

  const selectedProject = useRef<Project | undefined>(undefined);

  const [fetched, setFetched] = useState<boolean>(false);
  const { goalId } = useParams();
  const recalculatePositions = (projects: Project[]): Project[] => {
    return projects
      .sort((a, b) => a.position - b.position)
      .map((project, index) => ({ ...project, position: index }));
  };

  const fetchAll = async () => {
    try {
      if (!goalsFetched) return;
      const data = getProjectsData();
      setProjects(data);
      setFetched(true);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const createProject = async (goalId: string, title: string) => {
    try {
      const { data } = await client.POST("/goal/{goalId}/project", {
        params: {
          path: { goalId },
          header: { authorization: `Bearer ${token}` },
        },
        body: { title },
      });

      setProjects((prevProjects) => [...prevProjects, data!]);
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const deleteProject = async (goalId: string, projectId: string) => {
    try {
      setProjects((prevProjects) =>
        recalculatePositions(
          prevProjects.filter((filterProject) => filterProject.id !== projectId),
        ),
      );

      await client.DELETE("/goal/{goalId}/project/{projectId}", {
        params: {
          path: { goalId, projectId },
          header: { authorization: `Bearer ${token}` },
        },
      });
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  };

  const updateProjects = async (updatedProjects: Project[]) => {
    try {
      setProjects((prevProjects) =>
        prevProjects.map((project) => {
          if (project.goalId === goalId) {
            const updated = updatedProjects.find((p) => p.id === project.id);
            return updated ? { ...project, ...updated } : project;
          }
          return project;
        }),
      );

      await client.PUT("/goal/project", {
        params: {
          header: { authorization: `Bearer ${token}` },
        },
        body: updatedProjects,
      });
    } catch (error) {
      console.error("Failed to update projects:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (token && projects.length === 0) {
      fetchAll();
    }
  }, [token, goalsFetched]);

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        fetched,
        createProject,
        updateProjects,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
