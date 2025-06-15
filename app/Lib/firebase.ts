// lib/firebase.ts
<<<<<<< HEAD

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCPfoVkrSkF486mRaFsOFKFX9xNPzCtmpY",
  authDomain: "excelent-study.firebaseapp.com",
  projectId: "excelent-study",
  storageBucket: "excelent-study.appspot.com", // ✅ fixed typo from "firebasestorage.app"
  messagingSenderId: "673480521711",
  appId: "1:673480521711:web:e4b1d09fd51c4e03d5281a",
  measurementId: "G-F0QLZPMTB8",
};

// Initialize Firebase only once
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Setup Firebase services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); // ✅ Add this export
export const db = getFirestore(app);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
=======
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
>>>>>>> 47e69a7 (many changes made such a logn time.)
