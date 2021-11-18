import { useEffect, useState } from "react";
import styles from "./NewTask.module.css";
import plus from "../../assets/plus.svg";
import minus from "../../assets/minus.svg";
import { useCreateTask } from "../../hooks/useCreateTask";

export default function NewTask({
  projectId,
  filterTags,
  reloadProject,
  closeTaskPage,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [addNewTag, setAddNewTag] = useState(
    filterTags.length > 0 ? false : true
  );
  const { createTask, error, response } = useCreateTask();

  const newTaskHandler = (e) => {
    e.preventDefault();
    createTask(projectId, title, description, tag);
  };

  useEffect(() => {
    if (response) {
      // Task succesfully created, redirect user to project page
      reloadProject(projectId);
      closeTaskPage();
    }
  }, [response, reloadProject, closeTaskPage, projectId]);

  return (
    <>
      <h1>New task</h1>
      <form className={styles["new-task-form"]} onSubmit={newTaskHandler}>
        <label>
          <span>Filter Tag</span>
          {/* Only show add new tag icon if theres a dropdown selection available */}
          {filterTags.length > 0 ? (
            <img
              alt="Custom tag"
              src={addNewTag ? minus : plus}
              onClick={() => {
                setAddNewTag((prevState) => !prevState);
              }}
            />
          ) : (
            ""
          )}
          {addNewTag && (
            <input
              value={tag}
              onChange={(e) => {
                setTag(e.target.value);
              }}
              type="text"></input>
          )}
          {!addNewTag && (
            <select
              defaultValue="-----"
              onChange={(e) => {
                setTag(e.target.value);
              }}>
              <option disabled={true}>-----</option>
              {filterTags.map((filterTag) => {
                return (
                  <option value={filterTag} key={filterTag}>
                    {filterTag}
                  </option>
                );
              })}
            </select>
          )}
        </label>
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
        {error && <p className={styles.error}>{error}</p>}
        <button>Create</button>
      </form>
    </>
  );
}
