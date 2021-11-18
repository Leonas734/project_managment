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
            className={styles["option"]}
            onClick={() => {
              setShowPasswordChange(true);
            }}>
            Change password
          </p>
          <p className={styles["option"]}>----------</p>
          <p className={styles["option"]}>----------</p>
          <p className={styles["option"]}>----------</p>
        </>
      )}
      {showPasswordChange && (
        <UpdatePassword changePasswordShowState={setShowPasswordChange} />
      )}
      {!showPasswordChange && <a href="/">Back to Homepage</a>}
    </div>
  );
}
