import React, { createContext, useContext, useEffect, useState } from "react";
import { UserResponseType } from "../../types/UserResponseType";
import { getMe } from "../../service/apiGet";

export interface IAuthLogin {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  user?: UserResponseType;
  setUser: (user: UserResponseType) => void;
  updateUser: (user: UserResponseType) => void;
}

export const AuthContext = createContext({} as IAuthLogin);

interface IAuthProvider {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserResponseType>();

  const updateUser = (user: UserResponseType) => {
    setUser(user);
  }

  const getUser = async () => {
    const response = await getMe();

    if (response) {
      setUser(response.data);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      setIsAuthenticated(true);
      getUser();
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
        user,
        setUser,
        updateUser
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
