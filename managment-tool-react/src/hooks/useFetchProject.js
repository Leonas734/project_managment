import { useCallback, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useFetchProject = (id) => {
  const { authToken } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [project, setProject] = useState(null);

  const getProject = useCallback(
    async (projectId) => {
      setError(null);
      setIsPending(true);

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/projects/${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
          }
        );

        const data = await res.json();
        if (!res.ok) {
          const errorMessage = `${Object.keys(data)[0].toUpperCase()}-${
            Object.values(data)[0]
          }`;
          throw new Error(errorMessage);
        }

        setProject(data);
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
      setIsPending(false);
    },
    [authToken]
  );
  return { getProject, error, isPending, project };
};
