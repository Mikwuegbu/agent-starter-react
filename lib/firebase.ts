import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhU3RWAFg_F_bHzr0wqp1b4-ygUPsi5Fo",
  authDomain: "crudloop.firebaseapp.com",
  databaseURL: "https://crudloop.firebaseio.com",
  projectId: "crudloop",
  storageBucket: "crudloop.appspot.com",
  messagingSenderId: "667954800507",
  appId: "1:667954800507:web:bf89cc6efdf297e1fa7fde",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
