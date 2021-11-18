import { useFetchProject } from "../../hooks/useFetchProject";
import { useEffect, useState } from "react";
import styles from "./CurrentProject.module.css";

import ProjectTask from "./ProjectTask";
import NewTask from "./NewTask";

export default function CurrentProject({ projectId }) {
  const { getProject, error, isPending, project } = useFetchProject();
  const [filterTag, setFilterTag] = useState("all");
  const [createNewTask, setCreateNewTask] = useState(false);
  const [newTaskButton, setNewTaskButton] = useState("New Task");

  useEffect(() => {
    if (projectId) {
      getProject(projectId);
    }
    return () => {
      resetTaskButton();
    };
  }, [projectId, getProject]);

  const resetTaskButton = () => {
    setCreateNewTask(false);
    setNewTaskButton("New Task");
  };
  const newTaskClickHandler = () => {
    setCreateNewTask((prevState) => {
      if (prevState) {
        setNewTaskButton("New Task");
      } else {
        setNewTaskButton("Cancel");
      }
      return !prevState;
    });
  };

  return (
    <>
      {!isPending && project && (
        <>
          {/* PROJECT INFO & FILTERS */}
          <div className={styles["project"]}>
            {!createNewTask && <h1>{project.title}</h1>}
            {!createNewTask && (
              <p className={styles["description"]}>{project.description}</p>
            )}
            <button onClick={newTaskClickHandler}>{newTaskButton}</button>
            {/* PROJECT TASK FILTERS */}
            {!createNewTask && project.all_tasks.length > 0 && (
              <div className={styles.tags}>
                <p>filter:</p>
                <p
                  className={
                    filterTag === "all" ? styles["active-tag"] : styles["tag"]
                  }
                  onClick={() => {
                    setFilterTag("all");
                  }}>
                  all
                </p>
                {project.filter_tags.map((tag, index) => {
                  return (
                    <p
                      key={index}
                      className={
                        filterTag === tag ? styles["active-tag"] : styles["tag"]
                      }
                      onClick={() => {
                        setFilterTag(tag);
                      }}>
                      {tag}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          {/*  Project Tasks */}
          {!createNewTask && project.all_tasks.length < 1 && (
            <p>No tasks for current project</p>
          )}
          {!createNewTask && (
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

      {createNewTask && (
        <NewTask
          projectId={project.id}
          filterTags={project.filter_tags}
          reloadProject={getProject}
          closeTaskPage={resetTaskButton}
        />
      )}

      {isPending && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </>
  );
}
