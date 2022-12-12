// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTywnCAziBBrAsRNk9qqJHsRCzP-PB3mU",
  authDomain: "skn-app-b71cf.firebaseapp.com",
  projectId: "skn-app-b71cf",
  storageBucket: "skn-app-b71cf.appspot.com",
  messagingSenderId: "471342245832",
  appId: "1:471342245832:web:01ae95236b21c74fc442fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res;
  } catch (err) {
    console.error(err);
    return err
  }
};

const logout = async () => {
  await signOut(auth);
};

export { auth, db, logInWithEmailAndPassword, logout };
