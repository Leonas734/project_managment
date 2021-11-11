import { useLogout } from "../../hooks/useLogout";
import { useState } from "react";
import QuestionModal from "../../components/modals/QuestionModal";

export default function Nav({ userName }) {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useLogout();

  const clickHandler = () => {
    logout();
    setShowModal(false);
  };

  return (
    <div>
      {userName && (
        <>
          <p>Hello {userName}</p>
          <button
            onClick={() => {
              setShowModal(true);
            }}>
            Logout
          </button>
        </>
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
    </div>
  );
}
