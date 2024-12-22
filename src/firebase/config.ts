// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK0AFQDg4937H6Xirko1vesB68sqrb2K4",
  authDomain: "judiciales-valledupar.firebaseapp.com",
  projectId: "judiciales-valledupar",
  storageBucket: "judiciales-valledupar.firebasestorage.app",
  messagingSenderId: "234694924140",
  appId: "1:234694924140:web:2d7b6ea0bad80b147c0549",
  measurementId: "G-Z4PKEMDKMZ",
  databaseURL: "https://judiciales-valledupar-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);