import { Firestore, collection, getDocs } from "firebase/firestore/lite";

export const getFriends = async (db: Firestore) => {
  const languageCol = collection(db, "language");
  const languageSnapshot = await getDocs(languageCol);
  const languageList = languageSnapshot.docs.map((doc) => doc.data());
  return languageList;
};
