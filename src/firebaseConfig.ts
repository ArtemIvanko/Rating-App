// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-dCtJfTBx2VxnplNq9ZrOepO1OsbliHM",
  authDomain: "rating-app-45486.firebaseapp.com",
  databaseURL:
    "https://rating-app-45486-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rating-app-45486",
  storageBucket: "rating-app-45486.appspot.com",
  messagingSenderId: "1046744546210",
  appId: "1:1046744546210:web:540fe4f4b060c5e4da50fb",
  measurementId: "G-H6XRWRBRHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;

export const database = getDatabase(app);
export const auth = getAuth(app);
