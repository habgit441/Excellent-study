'use client';

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; 

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCPfoVkrSkF486mRaFsOFKFX9xNPzCtmpY',
  authDomain: 'excelent-study.firebaseapp.com',
  projectId: 'excelent-study',
  storageBucket: 'excelent-study.appspot.com',
  messagingSenderId: '673480521711',
  appId: '1:673480521711:web:e4b1d09fd51c4e03d5281a',
  measurementId: 'G-F0QLZPMTB8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and listener
export const auth = getAuth(app);
export { onAuthStateChanged }; // 
