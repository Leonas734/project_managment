import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

export const useProject = (id) => {
  const { authToken, userId, userName } = useAuthContext();

  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [project, setProject] = useState([]);

  const getProject = async (projectId) => {
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
        const errorMessage = Object.values(data)[0];
        throw new Error(errorMessage);
      }

      setProject(data);
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };
  return { getProject, error, isPending, project };
};
