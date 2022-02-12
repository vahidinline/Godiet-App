import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm5d4V7-WJp1XKzPigBIzGkMtyrun0Wbc",
  authDomain: "godietapp-7b949.firebaseapp.com",
  projectId: "godietapp-7b949",
  storageBucket: "godietapp-7b949.appspot.com",
  messagingSenderId: "667014060367",
  appId: "1:667014060367:web:ad25cd71ba90d50776cd3a",
};

firebase.initializeApp(firebaseConfig);

export { firebase, firebaseConfig };
