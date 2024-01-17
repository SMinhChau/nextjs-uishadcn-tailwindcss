"use client";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import firebase_app from "../../../configFireBase";
import { User } from "@/entity/user";

const auth = getAuth(firebase_app);

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext({});

const AuthProvider: React.FC<Props> = ({ children }) => {
  const useAuthContext = useContext(AuthContext);

  const [userCurrent, setUserCurrent] = useState<User | null>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserCurrent((user) => user);
      } else {
        setUserCurrent(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userCurrent }}>
      {loading ? <div>Loading....</div> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
