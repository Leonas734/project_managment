import { useLogout } from "../../hooks/useLogout";
import { useState } from "react";
import QuestionModal from "../../components/modals/QuestionModal";

import styles from "./Nav.module.css";

import userLogoDark from "../../assets/user-logo-dark.svg";

export default function Nav({ userName }) {
  const [showModal, setShowModal] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const { logout } = useLogout();

  const clickHandler = () => {
    logout();
    setShowModal(false);
  };

  return (
    <nav className={styles["nav-bar"]}>
      <a href="/" className={styles["nav-title"]}>
        taskRep
      </a>
      <img
        className={styles["nav-user-logo"]}
        src={userLogoDark}
        alt="User logo"
        onMouseEnter={() => {
          setUserMenu(true);
        }}
      />
      {userMenu && (
        <div
          className={styles["nav-user-menu"]}
          onMouseLeave={() => {
            setUserMenu(false);
          }}>
          <p>
            Hello <span>{userName}</span>
          </p>
          <ul>
            <li>
              <a href="/account_settings">Account settings</a>
            </li>
            <li>---</li>
            <li>---</li>
            <li
              className={styles["logout-button"]}
              onClick={() => {
                setShowModal(true);
              }}>
              Logout
            </li>
          </ul>
        </div>
      )}
      {showModal && (
        <QuestionModal
          question={"Are you sure you want to logout?"}
          onClickFunc={clickHandler}
          closeModalFunc={() => {
            setShowModal(false);
          }}
        />
      )}
    </nav>
  );
}
