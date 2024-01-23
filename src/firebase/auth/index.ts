import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import firebase_app from "../../../configFireBase";

const auth = getAuth(firebase_app);

export const signIn = async (email: string, password: string) => {
  let result = null,
    code = null,
    message = null;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    result = res.user;
    console.log("result >>>", result);
  } catch (error) {
    console.log("error >>>", error);
  }

  return { result, code, message };
};

export const signUp = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const Logout = () => {
  return auth.signOut();
};
