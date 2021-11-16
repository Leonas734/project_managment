import styles from "./ProjectTask.module.css";

export default function ProjectTask({ task }) {
  return (
    <div className={styles.task}>
      <h3>{task.title}</h3>
      <p>Due date: </p>
      {task.task_users_details.map((user, index) => {
        return (
          <img
            key={`task_img_${task.id}`}
            src={`http://127.0.0.1:8000${user.img}`}></img>
        );
      })}
      {console.log(task)}
    </div>
  );
}
