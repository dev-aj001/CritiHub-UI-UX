import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyBvwYX0AX7V1jCygsiuktfH59QAFfBvTZU",
    authDomain: "critichub-27650.firebaseapp.com",
    projectId: "critichub-27650",
    storageBucket: "critichub-27650.appspot.com",
    messagingSenderId: "316576317047",
    appId: "1:316576317047:web:9bb4749d2af711d8769072",
    measurementId: "G-ZLT30NQGXY",
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);