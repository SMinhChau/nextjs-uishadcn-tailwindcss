"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import useFirebaseAuth from "@/hook/useFirebaseAuth";
import { useRouter } from "next/navigation";
import { getLanguages } from "@/dictionaries/action";

type Props = {
  children: React.ReactNode;
};

const authContext = createContext({
  authState: {} || null,
  loading: false,
});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useFirebaseAuth();

  const [dictionary, setDictionary] = useState();

  const router = useRouter();

  useEffect(() => {
    if (!auth.authState?.email) {
      router.push("login");
    }
  }, [!auth.authState?.email]);

  useEffect(() => {
    const languages = () => {
      getLanguages("vn").then((result) => {
        if (result) {
          setDictionary(result);
        }
      });
    };
    languages();
  }, []);

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
export default AuthProvider;
