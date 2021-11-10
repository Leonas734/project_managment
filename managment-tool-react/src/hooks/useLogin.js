import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCookies } from "react-cookie";

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [userCookies, setUserCookies] = useCookies(["userDetailsCookie"]);

  const login = async (username, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.non_field_errors[0]);
      }

      const { token: authToken, username: userName, id: userId } = data;
      dispatch({ type: "LOGIN", payload: { authToken, userName, userId } });
      setUserCookies("userDetailsCookie", {
        authToken,
        userName,
        userId,
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
    }

    setIsPending(false);
  };

  return { login, error, isPending };
};
