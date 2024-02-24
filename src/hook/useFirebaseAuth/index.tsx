import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Logout, signIn, signUp } from "@/firebase/auth";
import firebase_app from "../../../configFirebase";

const auth = getAuth(firebase_app);

export default function useFirebaseAuth() {
  const [authState, setAuthState] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const authStateChanged = async () => {
    const authCurrent = auth.currentUser;

    if (!authCurrent) {
      setAuthState(null!);
      setLoading(false);
      return;
    }

    setLoading(true);
    setAuthState((prev) => ({ ...prev, ...authCurrent }));
    setLoading(false);
  };

  const clear = () => {
    setAuthState(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email: string, password: string) => {
    return signIn(email, password);
  };

  const createUserWithEmailAndPassword = (email: string, password: string) => {
    return signUp(email, password);
  };

  const LogoutAccount = () => {
    Logout();
    clear();
  };

  return {
    authState,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    LogoutAccount,
  };
}
