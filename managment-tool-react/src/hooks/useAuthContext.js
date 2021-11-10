import { useContext } from "react";
import { AuthContext } from "../content/AuthContent";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be inside AuthContextProvider");
  }

  return context;
};
