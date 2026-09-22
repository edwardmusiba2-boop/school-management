// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgRaRUf0WQCJbEPTOw5ywzrUAT7Vr0rX4",
  authDomain: "school-management-a50ad.firebaseapp.com",
  projectId: "school-management-a50ad",
  storageBucket: "school-management-a50ad.firebasestorage.app",
  messagingSenderId: "615423046449",
  appId: "1:615423046449:web:627c20b09df02bff567610",
  measurementId: "G-5L5XLJP4L6"
};

const app = initializeApp(firebaseConfig);

// Firestore — this is our database
export const db = getFirestore(app);