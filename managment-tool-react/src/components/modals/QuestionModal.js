import ModalBackground from "./ModalBackground";
import styles from "./QuestionModal.module.css";
import { createPortal } from "react-dom";

export default function QuestionModal({
  question,
  onClickFunc,
  closeModalFunc,
}) {
  return createPortal(
    <ModalBackground closeModalFunc={closeModalFunc}>
      <div className={styles.container}>
        <h1 className={styles.title}>{question}</h1>
        <button className={styles.button} onClick={onClickFunc}>
          Yes
        </button>
        <button className={styles.button} onClick={closeModalFunc}>
          No
        </button>
      </div>
    </ModalBackground>,
    document.querySelector("#root")
  );
}
