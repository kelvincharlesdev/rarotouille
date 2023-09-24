import React, { createContext, useContext, useEffect, useState } from "react";
import { UserResponseType } from "../../types/UserResponseType";

export interface IAuthLogin {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user?: UserResponseType;
  setUser: (user: UserResponseType) => void;
}

export const AuthContext = createContext({} as IAuthLogin);

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponseType>();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("Fora do AuthProvider");
  }

  return context;
};
