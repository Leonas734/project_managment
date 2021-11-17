import { useProject } from "../../hooks/useProject";
import { useEffect, useState } from "react";
import styles from "./CurrentProject.module.css";

import ProjectTask from "./ProjectTask";

export default function CurrentProject({ projectId }) {
  const { getProject, error, isPending, project } = useProject();
  const [filterTag, setFilterTag] = useState("all");

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
  }, [projectId, getProject]);

  return (
    <>
      {!isPending && project && (
        <>
          {/* Project INFO & Filters */}
          <div className={styles["project"]}>
            <h1>{project.title}</h1>
            <p className={styles["description"]}>{project.description}</p>
            <div className={styles.tags}>
              <p>filter:</p>
              <p
                className={filterTag === "all" ? styles["active-tag"] : ""}
                onClick={() => {
                  setFilterTag("all");
                }}>
                all
              </p>
              {project.filter_tags.map((tag, index) => {
                return (
                  <p
                    key={index}
                    className={filterTag === tag ? styles["active-tag"] : ""}
                    onClick={() => {
                      setFilterTag(tag);
                    }}>
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
          {project.all_tasks.length < 1 && <p>No tasks for current project</p>}
          {project.all_tasks.length > 0 && (
            // Project Tasks
            <div className={styles["project-tasks"]}>
              {project.all_tasks.map((task) => {
                // Check if task was filtered out
                if (filterTag !== "all" && task.filter_tag !== filterTag)
                  return null;
                return <ProjectTask key={task.id} task={task} />;
              })}
            </div>
          )}
        </>
      )}

      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
}
