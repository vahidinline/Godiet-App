import * as firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: "AIzaSyBo06iME689yVrretdCNXneKTstZ32434c",
  authDomain: "godiet-d0985.firebaseapp.com",
  projectId: "godiet-d0985",
  storageBucket: "godiet-d0985.appspot.com",
  messagingSenderId: "561866778830",
  appId: "1:561866778830:web:11efe75e42f32fe5c5889f",
});

export const fireDB = app.firestore();

// Initialize Firebase
export default app;
