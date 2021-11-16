import { useAuthContext } from "./useAuthContext";
import { useCookies } from "react-cookie";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const [userCookies, setUserCookies] = useCookies(["userDetailsCookie"]);

  const logout = () => {
    setUserCookies("userDetailsCookie", {});
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
