"use client";
import React, { createContext, useContext } from "react";
import useFirebaseAuth from "@/hook/useFirebaseAuth";

type Props = {
  children: React.ReactNode;
};

const authContext = createContext({
  authState: {} || null,
  loading: false,
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useFirebaseAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
export default AuthProvider;
