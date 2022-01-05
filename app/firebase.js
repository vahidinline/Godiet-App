// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGO4FF1qg7GoSeDY2eGExX-GW88QSy4fk",
  authDomain: "godietauth-a3d72.firebaseapp.com",
  projectId: "godietauth-a3d72",
  storageBucket: "godietauth-a3d72.appspot.com",
  messagingSenderId: "151617149143",
  appId: "1:151617149143:web:bc090aff346fcb34703892",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();

export { auth };
