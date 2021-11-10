import { useState } from "react";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const login = async (username, password) => {
    setError(null);
    setIsPending(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      const token = data.token;
    } catch (error) {
      console.log(error);
    }
  };

  return { login, error, isPending };
};
