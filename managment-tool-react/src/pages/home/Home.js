import Project from "./Project";
import CurrentProject from "./CurrentProject";
import Task from "./Task";
import NewProject from "./NewProject";
import styles from "./Home.module.css";

import { useFetchAllProjects } from "../../hooks/useFetchAllProjects.js";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const params = useParams();
  const [currentProject, setCurrentProject] = useState(null);
  const { getProjects, error, isPending, allProjects } = useFetchAllProjects();
  const navigate = useNavigate();
  const location = useLocation();

  // Initial setup
  useEffect(() => {
    if (!allProjects) {
      getProjects();
    }
    /* No url, show new project. This if statement is used 
    when user user clicks 'back' button in their browser */
    if (!params.project_id) {
      setCurrentProject(null);
    }
    // Check if user went directly to a project url
    if (params.project_id) {
      setCurrentProject(+params.project_id);
    }
  }, [getProjects, allProjects, params.project_id]);

  const getCurrentProjectUsers = () => {
    const filteredProjects = allProjects.filter((project) => {
      return project.id === currentProject;
    });
    // State not updated yet, return an empty array.
    // Page will auto refresh if thanks to useEffect
    if (filteredProjects.length === 0) return [];
    return filteredProjects[0].project_users;
  };

  const newProjectClickHandler = () => {
    if (location.pathname !== "/") navigate("/");
    setCurrentProject(null);
  };

  return (
    <div className={styles.home}>
      {/* Projects list SIDEBAR */}
      <div className={styles.projects}>
        <p
          onClick={newProjectClickHandler}
          className={!currentProject ? styles["active-sidebar"] : ""}>
          New project
        </p>
        {isPending && <p>Loading...</p>}
        {allProjects &&
          allProjects.map((project) => {
            return (
              <Project
                key={project.id}
                project={project}
                projectChange={setCurrentProject}
                active={project.id === currentProject ? true : false}
              />
            );
          })}
        {error && <p>{error}</p>}
      </div>

      {/* CURRENT PROJECT USERS */}
      {currentProject && (
        <div className={styles.users}>
          <h3>Project users</h3>
          {allProjects &&
            currentProject &&
            getCurrentProjectUsers().map((user) => {
              return (
                <div key={`project_user_${user.id}`}>
                  <p>{user.username}</p>
                  <img
                    alt="User profile"
                    src={`http://127.0.0.1:8000${user.img}`}></img>
                </div>
              );
            })}
        </div>
      )}

      {/* CURRENT PROJECT */}
      {!currentProject && !params.task_id && (
        <NewProject
          styleClassName={styles["new-project"]}
          refreshProjectsList={getProjects}
        />
      )}
      {!params.task_id && currentProject && (
        <div className={styles.project}>
          <CurrentProject projectId={currentProject} />
        </div>
      )}
      {params.task_id && (
        <Task taskId={params.task_id} setActiveProject={setCurrentProject} />
      )}
    </div>
  );
}
