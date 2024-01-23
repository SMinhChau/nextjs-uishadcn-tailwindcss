import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import firebase_app from "../../../configFireBase";
import { useRouter } from "next/navigation";
import { Logout, signIn, signUp } from "@/firebase/auth";

// const formatAuthUser = (user: User) => ({
//   uid: user.uid,
//   email: user.email,
// });

const auth = getAuth(firebase_app);

export default function useFirebaseAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => authStateChanged);
    return () => unsubscribe();
  }, []);

  const authStateChanged = async (authState: User) => {
    if (!authState) {
      setAuthState(null!);
      setLoading(false);
      return;
    }

    setLoading(true);
    // const formattedUser = formatAuthUser(authState);
    setAuthState((prev) => ({ ...prev, ...authState }));
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
