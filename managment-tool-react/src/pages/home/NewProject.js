import { useState, useEffect } from "react";
import styles from "./NewProject.module.css";
import { useCreateProject } from "../../hooks/useCreateProject";
import { useNavigate } from "react-router-dom";

export default function NewProject({ refreshProjectsList }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { createProject, error, response } = useCreateProject();
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      refreshProjectsList();
      navigate(`/project/${response.id}`);
    }
  }, [response, navigate, refreshProjectsList]);

  const newProjectHandler = (e) => {
    e.preventDefault();
    createProject(title, description);
  };

  return (
    <div className={styles["new-project-container"]}>
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
        {error && <p>{error}</p>}
        <button>Create</button>
      </form>
    </div>
  );
}
