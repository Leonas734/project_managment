import Project from "./Project";
import styles from "./Home.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAllProjects } from "../../hooks/useAllProjects.js";
import CurrentProject from "./CurrentProject";

import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const { authToken, userId, userName } = useAuthContext();
  const [currentProject, setCurrentProject] = useState(null);
  const { getProjects, error, isPending, allProjects } = useAllProjects();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.user}>User info</div>

      {/* SIDEBAR */}
      <div className={styles.projects}>
        <a href="#">New project</a>
        {allProjects.map((project, index) => {
          if (index === 0 && !currentProject) {
            setCurrentProject(project.id);
          }
          return (
            <Project
              key={project.id}
              project={project}
              projectChange={setCurrentProject}
              active={project.id === currentProject ? true : false}
            />
          );
        })}
      </div>

      <div className={styles.filters}>EMPTY</div>
      <div className={styles.users}>Users</div>
      <div className={styles.tasks}>
        <CurrentProject projectId={currentProject} />
      </div>
    </div>
  );
}
