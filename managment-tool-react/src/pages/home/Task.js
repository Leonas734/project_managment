import { useEffect, useState } from "react";
import { useTask } from "../../hooks/useTask";
import { useCreateComment } from "../../hooks/useCreateComment";
import styles from "./Task.module.css";

export default function Task({ taskId, setActiveProject }) {
  const [newComment, setNewComment] = useState("");
  const { getTask, error, isPending, task } = useTask();
  const { createComment, error: commentError } = useCreateComment();

  useEffect(() => {
    if (!task) {
      getTask(taskId);
    }
    if (task) {
      setActiveProject(task.project);
    }
  }, [task, getTask, taskId, setActiveProject]);

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    createComment(task.id, newComment);
    setNewComment("");
    getTask(task.id);
  };

  return (
    <div className={styles.task}>
      {task && (
        <>
          {/* TASK DESCRIPTION */}
          <div className={styles["task-desc-container"]}>
            <h3>{task.title}</h3>
            <p className={styles["task-desc-text"]}>{task.description}</p>
            <p>Due date: {task.due_date}</p>
            <p>Assigned users</p>
            {task.task_users_details.map((user) => {
              return (
                <img
                  alt="User profile"
                  key={`user_img_${user.id}`}
                  src={`http://127.0.0.1:8000${user.img}`}></img>
              );
            })}
          </div>
          {/* COMMENTS SECTION */}
          <div className={styles.comments}>
            <h3>Project Comments</h3>
            {task.all_comments.map((comment) => {
              return (
                <div
                  key={`user_comment_${comment.id}`}
                  className={styles["user-comment-container"]}>
                  <p className={styles["username"]}>
                    {comment.user_details.username}
                  </p>
                  {console.log(comment)}
                  <img
                    alt="User profile"
                    src={`http://127.0.0.1:8000${comment.user_details.img}`}></img>
                  <p className={styles["date"]}>{comment.date_and_time}</p>
                  <p className={styles["text"]}>{comment.text}</p>
                </div>
              );
            })}
            <form onSubmit={commentSubmitHandler}>
              <label>
                <span>New comment</span>
                <input
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                  type="text"></input>
              </label>
              {commentError && <p>{commentError}</p>}
              <button>Add comment</button>
            </form>
          </div>
        </>
      )}
      {error && <p>{error}</p>}
      {isPending && <p>Loading task...</p>}
    </div>
  );
}
