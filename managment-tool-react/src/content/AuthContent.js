import { createContext, useReducer, useEffect } from "react";
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
  const [userCookies, setUserCookies] = useCookies(["userDetailsCookie"]);

  const [state, dispatch] = useReducer(authReducer, {
    authToken: null,
    userName: null,
    userId: null,
  });

  // Check if users details are stored in a cookie and log them in if they are.
  useEffect(() => {
    if (userCookies.userDetailsCookie) {
      const { authToken, userId, userName } = userCookies.userDetailsCookie;

      dispatch({ type: "LOGIN", payload: { authToken, userId, userName } });
    } else {
    }
  }, [userCookies]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
