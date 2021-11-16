import { useState } from "react";
import styles from "./UpdatePassword.module.css";
import { usePasswordUpdate } from "../../../hooks/usePasswordUpdate";

export default function UpdatePassword({ changePasswordShowState }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const { passwordUpdate, error, isPending, newPasswordSet } =
    usePasswordUpdate();

  const passwordUpdateHandler = (e) => {
    e.preventDefault();
    passwordUpdate(currentPassword, newPassword, newPasswordRepeat);
  };

  return (
    <>
      <>
        <h1>Set new password</h1>
        <form
          className={styles["update-password-form"]}
          onSubmit={passwordUpdateHandler}>
          <label>
            <span>Current Password</span>
            <input
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              type="password"></input>
          </label>
          <label>
            <span>New password</span>
            <input
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              type="password"></input>
          </label>
          <label>
            <span>Repeat new password</span>
            <input
              value={newPasswordRepeat}
              onChange={(e) => {
                setNewPasswordRepeat(e.target.value);
              }}
              type="password"></input>
          </label>
          <button>Update password</button>
        </form>
        {error && <p className={styles.error}>{error}</p>}
        {isPending && <p>Loading...</p>}
        {newPasswordSet && !isPending && <p>Password updated!</p>}
        <a
          href="/account_settings"
          onClick={(e) => {
            e.preventDefault();
            changePasswordShowState(false);
          }}>
          Go back
        </a>
      </>
    </>
  );
}
