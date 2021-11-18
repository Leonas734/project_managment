import { useCallback, useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchAllProjects = () => {
  const { authToken } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [allProjects, setAllProjects] = useState(null);

  const getProjects = useCallback(async () => {
    setError(null);
    setIsPending(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/projects/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMessage = `${Object.keys(data)[0].toUpperCase()}-${
          Object.values(data)[0]
        }`;
        throw new Error(errorMessage);
      }

      setAllProjects(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
    setIsPending(false);
  }, [authToken]);
  return { getProjects, error, isPending, allProjects };
};
