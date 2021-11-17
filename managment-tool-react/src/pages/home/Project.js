import styles from "./Project.module.css";
import { useNavigate } from "react-router-dom";

export default function Project({ project, projectChange, active }) {
  const navigate = useNavigate();

  return (
    <div
      key={project.id}
      onClick={() => {
        projectChange(project.id);
        navigate(`/project/${project.id}`);
      }}
      className={active ? styles["active-project"] : ""}>
      <p>{project.title}</p>
    </div>
  );
}
