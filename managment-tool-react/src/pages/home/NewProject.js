import { useState } from "react";
import styles from "./NewProject.module.css";

export default function NewProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const newProjectHandler = (e) => {
    e.preventDefault();
    console.log(title, description);
  };

  return (
    <div>
      <h1>New Project</h1>
      <form className={styles["new-project-form"]} onSubmit={newProjectHandler}>
        <label>
          <span>Title</span>
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"></input>
        </label>
        <label>
          <span>Description</span>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            type="text"></textarea>
        </label>
        <button>Create</button>
      </form>
    </div>
  );
}
