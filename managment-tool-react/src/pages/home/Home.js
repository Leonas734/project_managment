import Project from "./Project";
import styles from "./Home.module.css";
import { useAllProjects } from "../../hooks/useAllProjects.js";
import CurrentProject from "./CurrentProject";

import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const [currentProject, setCurrentProject] = useState(null);
  const { getProjects, error, isPending, allProjects } = useAllProjects();

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  return (
    <div className={styles.home}>
      {/* Projects list SIDEBAR */}
      <div className={styles.projects}>
        <p>New project</p>
        {isPending && <p>Loading...</p>}
        {allProjects &&
          allProjects.map((project, index) => {
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
        {error && <p>{error}</p>}
      </div>

      {/* CURRENT PROJECT USERS */}
      <div className={styles.users}>
        <h3>Project userss</h3>
        {allProjects && console.log(allProjects)}
      </div>

      {/* CURRENT PROJECT */}
      <div className={styles.project}>
        <CurrentProject projectId={currentProject} />
      </div>
    </div>
  );
}
