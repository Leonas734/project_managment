import styles from "./ProjectTask.module.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function ProjectTask({ task }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={styles.task}
      onClick={() => {
        if (location.pathname !== `/project_task/${task.id}`)
          navigate(`/project_task/${task.id}`);
      }}>
      <h3>{task.title}</h3>
      <p>Due date: {task.due_date} </p>
      {task.task_users_details.map((user) => {
        return (
          <img
            alt="User profile"
            key={`user_img_${user.id}`}
            src={`http://127.0.0.1:8000${user.img}`}></img>
        );
      })}
    </div>
  );
}
