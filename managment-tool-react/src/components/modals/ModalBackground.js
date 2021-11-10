import React from "react";

import styles from "./ModalBackground.module.css";

export default function ModalBackground({ children, closeModalFunc }) {
  const backgroundClick = (e) => {
    if (e.target.id === "modal-background") {
      closeModalFunc();
    }
  };

  return (
    <div
      onClick={backgroundClick}
      className={styles.background}
      id="modal-background">
      {children}
    </div>
  );
}
