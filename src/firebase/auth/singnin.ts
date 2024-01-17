import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase_app from "../../../configFireBase";
import { FirebaseError } from "firebase/app";
import { cookies } from "next/headers";

const auth = getAuth(firebase_app);

type ResSuccess = {
  displayName: string;
  email: string;
  registered: string;
  stsTokenManager: {
    accessToken: string;
    refreshToken: string;
  };
};

type ResError = {
  code: number | string;
  message: string;
};

const signIn = async (email: string, password: string) => {
  let result = null,
    code = null,
    message = null;

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      result = user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      code = errorCode;
      message = errorMessage;
    });

  return { result, code, message };
};

export default signIn;
