import { useEffect } from "react";
import { useAllProjects } from "../../hooks/useAllProjects.js";

export default function AllProjects() {
  const { getProjects, error, isPending, allProjects } = useAllProjects();
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <>
      {allProjects.map((project) => {
        console.log(project);
        return (
          <div key={project.id}>
            <p>{project.title}</p>
          </div>
        );
      })}
    </>
  );
}
