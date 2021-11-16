import styles from "./ProjectTask.module.css";

export default function ProjectTask({ task }) {
  return (
    <div className={styles.task}>
      <h3>{task.title}</h3>
      <p>Due date: </p>
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
