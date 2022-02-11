import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "godietapp-7b949.firebaseapp.com",
  projectId: "godietapp-7b949",
  storageBucket: "godietapp-7b949.appspot.com",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);

export { firebase, firebaseConfig };
