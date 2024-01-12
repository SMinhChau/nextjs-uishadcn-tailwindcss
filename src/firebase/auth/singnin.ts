import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../../../configFireBase";

const auth = getAuth(firebase_app);

const signIn = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export default signIn;
