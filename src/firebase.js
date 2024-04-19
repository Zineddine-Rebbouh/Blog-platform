// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import if you're using Firestore
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyARMslQ9hjMRNCIWNns8oQCyzO_JaEX-xE",
  authDomain: "zinou-lite.firebaseapp.com",
  projectId: "zinou-lite",
  storageBucket: "zinou-lite.appspot.com",
  messagingSenderId: "1021266731724",
  appId: "1:1021266731724:web:d127969a1d6c8e21a69869",
  measurementId: "G-75V74LGVES",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const imgDb = getStorage(app);
// If you're using Firestore, initialize it as well
// export const db = getFirestore(app);

export default app;
