// import {
//   createContext,
//   useEffect,
//   useMemo,
//   useState,
//   type ReactNode,
// } from "react";

import { createContext, useContext, useEffect, useState } from "react";

// interface User {
//   name: string;
//   id: number;
// }

// interface AuthContextType {
//   user: User | null;
//   loggedIn: boolean | null;
// }

// export const AuthContext = createContext<AuthContextType | null>(null);

// const AuthContextProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loggedIn, setLoggedIn] = useState<boolean | null>(false);

//   useEffect(() => {
//     setUser({ name: "Anand", id: 1 });
//     setLoggedIn(true);
//   }, []);

//   const authValue = useMemo(
//     () => ({
//       user,
//       loggedIn,
//     }),
//     [user, loggedIn],
//   );

//   return (
//     <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthContextProvider;
interface User {
  name: string;
  id: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userName: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userName: string, password: string) => {
    const userData: User = {
      name: userName,
      id: 1001,
    };
    setUser(userData);
    setIsAuthenticated(true);
  };

  const contextValue = {
    isAuthenticated,
    user,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (authContext) {
    return authContext;
  } else {
    throw new Error("useAuth must be used within an AuthProvider");
  }
};
