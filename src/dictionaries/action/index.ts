import { child, get, getDatabase, ref } from "firebase/database";
import firebase_app from "../../../configFirebase";
import { Locale } from "../../../i18n-config";

const dbRef = ref(getDatabase(firebase_app));

export const getLanguages = async (local: Locale) => {
  let result = null;
  await get(child(dbRef, `languages/${local}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        result = snapshot.val();
      } else {
        result = "No data available";
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
};
