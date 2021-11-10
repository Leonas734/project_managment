import QuestionModal from "../../components/modals/QuestionModal";
import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const { logout } = useLogout();

  const clickHandler = () => {
    console.log("Logging user out...");
    logout();
    setShowModal(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}>
        Logout
      </button>

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
