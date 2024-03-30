// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import dotenv from "dotenv";
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_AUTH_PROJECTID,
  storageBucket: process.env.FIREBASE_AUTH_STORAGEBUCKET,
  messagingSenderId: process.env.FIREBASE_AUTH_MESSAGING_SENDERID,
  appId: process.env.FIREBASE_AUTH_APPID,
  measurementId: process.env.FIREBASE_AUTH_MEASUREMENT
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app, "gs://line-incubator.appspot.com");

export {
    app,
    db,
    storage
}