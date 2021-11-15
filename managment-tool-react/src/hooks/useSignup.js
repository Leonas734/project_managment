import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useCookies } from "react-cookie";
import { useLogin } from "./useLogin";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const signup = async (username, email, password, repeatPassword) => {
    setError(null);
    setIsPending(true);
    try {
      if (password !== repeatPassword) {
        throw new Error("Passwords do not match");
      }

      const res = await fetch("http://127.0.0.1:8000/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessage = Object.values(data)[0];
        throw new Error(errorMessage);
      }
      setAccountCreated(true);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
    setIsPending(false);
  };

  return { signup, error, isPending, accountCreated };
};
