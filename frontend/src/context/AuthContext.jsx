import {
  createContext,
  useContext,
  useState,
} from "react";

import { setAccessToken } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setToken] = useState(null);

  const login = ({ user, accessToken }) => {
    setUser(user);
    setToken(accessToken);

    setAccessToken(accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(accessToken),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};