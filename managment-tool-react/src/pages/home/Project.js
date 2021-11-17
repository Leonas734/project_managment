import styles from "./Project.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Project({ project, projectChange, active }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      key={project.id}
      onClick={() => {
        projectChange(project.id);
        if (location.pathname !== `/project/${project.id}`)
          navigate(`/project/${project.id}`);
      }}
      className={active ? styles["active-project"] : styles["project"]}>
      <p>{project.title}</p>
    </div>
  );
}
