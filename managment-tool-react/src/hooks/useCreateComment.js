import { useCallback, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useCreateComment = () => {
  const { authToken, userId } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState(null);

  const createComment = useCallback(
    async (taskId, text) => {
      setError(null);
      setIsPending(true);

      try {
        const res = await fetch("http://127.0.0.1:8000/api/comment/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify({ user: +userId, task: +taskId, text }),
        });

        const data = await res.json();
        if (!res.ok) {
          const errorMessage = `${Object.keys(data)[0].toUpperCase()}-${
            Object.values(data)[0]
          }`;
          throw new Error(errorMessage);
        }

        setResponse(data);
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
      setIsPending(false);
    },
    [authToken, userId]
  );
  return { createComment, error, isPending, response };
};
