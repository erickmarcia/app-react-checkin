import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import  db  from "./FirebaseConfig";

const collectionName = "time";

export const saveTime = (newLink) =>
  addDoc(collection(db, collectionName), newLink);

export const updateTimes = (id, updatedFields) =>
  updateDoc(doc(db, collectionName, id), updatedFields);

export const onGetTimes = (callback) => {
  const unsub = onSnapshot(collection(db, collectionName), callback);
  return unsub;
};

export const getTimesLists = () => getDocs(
  collection(db, collectionName)
  );

export const deleteTimeList = (id) => deleteDoc(doc(db, collectionName, id));

export const getTimes = (id) => getDoc(doc(db, collectionName, id));

