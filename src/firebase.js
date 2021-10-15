import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArnZ4xFnFPkrosgy6WiGCSrR2Ka5dgrxI",
  authDomain: "slack-clone-reactjs-972fa.firebaseapp.com",
  projectId: "slack-clone-reactjs-972fa",
  storageBucket: "slack-clone-reactjs-972fa.appspot.com",
  messagingSenderId: "850013716460",
  appId: "1:850013716460:web:23876593dfb7a523924ac9"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
  auth,
  db,
  provider,
  collection,
  addDoc,
  onSnapshot,
  doc,
  query,
  where,
  orderBy,
  setDoc,
  serverTimestamp,
  signInWithPopup,
  signOut
};
