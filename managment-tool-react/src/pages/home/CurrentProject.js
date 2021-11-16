import { useProject } from "../../hooks/useProject";
import { useEffect } from "react";

export default function CurrentProject({ projectId }) {
  const { getProject, error, isPending, project } = useProject();

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
  }, [projectId]);

  return (
    <>
      {!isPending && project && (
        <div>
          <h1>{project.title}</h1>
          <p>Created by: {project.creator_details.username}</p>
          <p>Description: {project.description}</p>
        </div>
      )}
    </>
  );
}
