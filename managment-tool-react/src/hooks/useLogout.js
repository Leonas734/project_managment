import { useAuthContext } from "./useAuthContext";
import { useCookies } from "react-cookie";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const setUserCookies = useCookies(["userDetailsCookie"])[1];

  const logout = () => {
    setUserCookies("userDetailsCookie", {});
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
