// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAveaurpoCIsl4rG15gTP6G3AjfTm9uwRc",
  authDomain: "property-finder-60fae.firebaseapp.com",
  projectId: "property-finder-60fae",
  storageBucket: "property-finder-60fae.appspot.com",
  messagingSenderId: "834666251585",
  appId: "1:834666251585:web:ba8833874bd66723480dc0",
  measurementId: "G-BBNVJZZXPF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);