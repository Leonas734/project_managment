import styles from "./Project.module.css";

export default function Project({ project, projectChange, active }) {
  return (
    <div
      key={project.id}
      onClick={() => {
        projectChange(project.id);
      }}
      className={active ? styles["active-project"] : ""}>
      <p>{project.title}</p>
    </div>
  );
}
