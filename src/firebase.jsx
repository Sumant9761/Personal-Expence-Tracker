// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "personal-finance-tracker-7458c.firebaseapp.com",
  projectId: "personal-finance-tracker-7458c",
  storageBucket: "personal-finance-tracker-7458c.firebasestorage.app",
  messagingSenderId: "866483236834",
  appId: "1:866483236834:web:bad2e5a9a8af184fd513bb",
  measurementId: "G-EFN0F1THDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, db, doc, setDoc };