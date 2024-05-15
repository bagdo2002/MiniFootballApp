import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC6sdZ2pzRjz_EOUrIBf06SHONhLtmgICo",
  authDomain: "minisoccerapp.firebaseapp.com",
  projectId: "minisoccerapp",
  storageBucket: "minisoccerapp.appspot.com",
  messagingSenderId: "969804521484",
  appId: "1:969804521484:web:50e085f8dffcc0fcea0e29",
};
const app = initializeApp(firebaseConfig);

// Provide AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getAuth().ReactNativeAsyncStorage,
});

export const db = getFirestore(app);

export const FIREBASE_AUTH = auth;

export const colRef = collection(db, "messages");

export const refGroup = collection(db, "groups");
