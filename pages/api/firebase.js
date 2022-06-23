import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {  getAuth} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAveaurpoCIsl4rG15gTP6G3AjfTm9uwRc",
//   authDomain: "property-finder-60fae.firebaseapp.com",
//   projectId: "property-finder-60fae",
//   storageBucket: "property-finder-60fae.appspot.com",
//   messagingSenderId: "834666251585",
//   appId: "1:834666251585:web:ba8833874bd66723480dc0",
//   measurementId: "G-BBNVJZZXPF"
// };
// const firebaseConfig = {
//   apiKey: "AIzaSyChgHbPswY7Waz2Up087rclEzJxNX91ptg",
//   authDomain: "property-finder-2.firebaseapp.com",
//   projectId: "property-finder-2",
//   storageBucket: "property-finder-2.appspot.com",
//   messagingSenderId: "966290317328",
//   appId: "1:966290317328:web:87c561ed449c6795dd2a95"
// };


const firebaseConfig = {
  apiKey: "AIzaSyBYFZFfSGY7aESZPGR5lN81z2wLM0c026g",
  authDomain: "pixel3-4733c.firebaseapp.com",
  projectId: "pixel3-4733c",
  storageBucket: "pixel3-4733c.appspot.com",
  messagingSenderId: "76320711225",
  appId: "1:76320711225:web:3579fae71dcd7fbccea3e8",
  measurementId: "G-HBY8BYN96N"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app)