import Project from "./Project";
import styles from "./Home.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAllProjects } from "../../hooks/useAllProjects.js";
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

      <div className={styles.projects}>
        <a href="#">New project</a>
        {allProjects.map((project, index) => {
          if (index === 0 && currentProject === null) {
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

      <div className={styles.filters}>Filters</div>
      <div className={styles.users}>Users</div>
      <div className={styles.tasks}>Current project</div>
      {currentProject}
    </div>
  );
}
