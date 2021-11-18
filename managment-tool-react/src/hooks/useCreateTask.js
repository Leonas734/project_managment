import { useCallback, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useCreateTask = () => {
  const { authToken, userId } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState(null);

  const createTask = useCallback(
    async (projectId, title, description, filterTag) => {
      setError(null);
      setIsPending(true);

      try {
        const res = await fetch("http://127.0.0.1:8000/api/tasks/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
          body: JSON.stringify({
            creator: +userId,
            project: +projectId,
            title,
            description,
            filter_tag: filterTag,
            assigned_users: [+userId],
          }),
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
  return { createTask, error, isPending, response };
};
