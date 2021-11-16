import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const usePasswordUpdate = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [newPasswordSet, setNewPasswordSet] = useState(false);
  const { authToken, userId, userName } = useAuthContext();

  const passwordUpdate = async (
    currentPassword,
    newPassword,
    repeatNewPassword
  ) => {
    setError(null);
    setIsPending(true);
    try {
      if (newPassword !== repeatNewPassword) {
        throw new Error("Passwords do not match");
      }
      const res = await fetch(`http://127.0.0.1:8000/api/users/${userId}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          username: userName,
          current_password: currentPassword,
          new_password: repeatNewPassword,
        }),
      });
      console.log(res);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        const errorMessage = Object.values(data)[0];
        throw new Error(errorMessage);
      }
      setNewPasswordSet(true);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
    setIsPending(false);
  };

  return { passwordUpdate, error, isPending, newPasswordSet };
};