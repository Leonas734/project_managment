import { useCallback, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useTask = () => {
  const { authToken } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [task, setTask] = useState(null);

  const getTask = useCallback(
    async (taskId) => {
      setError(null);
      setIsPending(true);

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          const errorMessage = Object.values(data)[0];
          throw new Error(errorMessage);
        }

        setTask(data);
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
      setIsPending(false);
    },
    [authToken]
  );
  return { getTask, error, isPending, task };
};
