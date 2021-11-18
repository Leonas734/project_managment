import { createContext, useReducer } from "react";
import { useCookies } from "react-cookie";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  if (action.type === "LOGIN") {
    console.log(action.payload.authToken);
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
  const [userCookies, setUserCookies] = useCookies(["userDetailsCookie"]);
  // Make cookie in case user doesn't have one/deletes theirs
  if (!userCookies.userDetailsCookie) {
    setUserCookies("userDetailsCookie", {
      authToken: null,
      userName: null,
      userId: null,
    });
  }
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
