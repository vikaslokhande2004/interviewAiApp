import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD7T1eh38gcwbeRGGs0JiE0xkxWnUW5jJU",
  authDomain: "interviews-5c15d.firebaseapp.com",
  projectId: "interviews-5c15d",
  storageBucket: "interviews-5c15d.firebasestorage.app",
  messagingSenderId: "520037603993",
  appId: "1:520037603993:web:1e2db26fbb61363733f608",
  measurementId: "G-PD5G2ETPB6"
};

// Initialize Firebase
const app =!getApps.length ? initializeApp(firebaseConfig) : getApp()

export const auth = getAuth(app)
export const db = getFirestore(app)

