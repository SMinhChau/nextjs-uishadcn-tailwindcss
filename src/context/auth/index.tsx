"use client";
import React, { createContext, useContext, useEffect } from "react";
import useFirebaseAuth from "@/hook/useFirebaseAuth";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const authContext = createContext({
  authState: {} || null,
  loading: false,
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useFirebaseAuth();

  const router = useRouter();

  useEffect(() => {
    if (!auth.authState?.email) {
      router.push("login");
    }
  }, [!auth.authState?.email]);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
export default AuthProvider;
