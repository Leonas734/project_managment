import { createContext, useReducer } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      authToken: action.payload.authToken,
      userId: action.payload.userId,
      userName: action.payload.userName,
    };
  }
  if (action.type === "LOGOUT") {
    return {
      authToken: null,
      userId: null,
      userName: null,
    };
  }
  return { ...state };
};

export const AuthContextProvider = ({ children }) => {
  const [userCookies] = useCookies(["userDetailsCookie"]);
  const { authToken, userId, userName } = userCookies.userDetailsCookie;

  const [state, dispatch] = useReducer(authReducer, {
    authToken: authToken,
    userName: userName,
    userId: userId,
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
