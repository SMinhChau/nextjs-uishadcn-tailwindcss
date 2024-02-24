import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase_app from "../../../configFirebase";

const auth = getAuth(firebase_app);

export const signIn = async (email: string, password: string) => {
  let result = null,
    errorCode = null,
    errorMessage = null;
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          result = user.user;
        }
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
      });
  } catch (error) {
    console.log("Login Fail!");
  }
  return { result, errorCode, errorMessage };
};

export const signUp = async (email: string, password: string) => {
  let result = null,
    errorCode = null,
    errorMessage = null;
  try {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        if (user) {
          result = user.user;
        }
      })
      .catch((error) => {
        errorCode = error.code;
        errorMessage = error.message;
      });
  } catch (error) {
    console.log("Register Fail!");
  }
  return { result, errorCode, errorMessage };
};

export const Logout = () => {
  return auth.signOut();
};
