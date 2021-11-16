import UpdatePassword from "./update_password/UpdatePassword";
import styles from "./AccountSettings.module.css";
import { useState } from "react";

export default function AccountSettings() {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  return (
    <div className={styles["account-settings"]}>
      {!showPasswordChange && (
        <>
          <p
            onClick={() => {
              setShowPasswordChange(true);
            }}>
            Change password
          </p>
          <p>----------</p>
          <p>----------</p>
          <p>----------</p>{" "}
        </>
      )}
      {showPasswordChange && (
        <UpdatePassword changePasswordShowState={setShowPasswordChange} />
      )}
      <a href="/">Back to Homepage</a>
    </div>
  );
}
