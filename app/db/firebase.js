
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase';
import firestore from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAm5d4V7-WJp1XKzPigBIzGkMtyrun0Wbc",
  authDomain: "godietapp-7b949.firebaseapp.com",
  projectId: "godietapp-7b949",
  storageBucket: "godietapp-7b949.appspot.com",
  messagingSenderId: "667014060367",
  appId: "1:667014060367:web:ad25cd71ba90d50776cd3a"
};

// Initialize Firebase


firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebaseConfig;