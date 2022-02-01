import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import firebaseConfig from '../db/firebase';

initializeApp(firebaseConfig);

const firestore = getFirestore();

await setDoc(doc(firestore, "characters1", "mario"), {
  employment: "plumber",
  outfitColor: "red",
  specialAttack: "fireball"
});