// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// PASTE YOUR KEYS HERE (Replace this whole object)
const firebaseConfig = {
  apiKey: "AIzaSyC0LDaDopf8nd5gfLr01vzObBflUYGE4NM",
  authDomain: "sra-b2c-portfolio.firebaseapp.com",
  projectId: "sra-b2c-portfolio",
  storageBucket: "sra-b2c-portfolio.firebasestorage.app",
  messagingSenderId: "140337803214",
  appId: "1:140337803214:web:284f7121a5b32a61cc059f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);