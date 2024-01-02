import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCDPHbGVnbC3PWsH1-GogAtXcdodWMcu9U",
  authDomain: "gestionmemoire-ebc1d.firebaseapp.com",
  projectId: "gestionmemoire-ebc1d",
  storageBucket: "gs://gestionmemoire-ebc1d.appspot.com",
  messagingSenderId: "219810876632",
  appId: "1:219810876632:web:af56086a136fc6f39edbad",
  measurementId: "G-J7ZRKSW2JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const gestionmemoire = getFirestore(app);
const storage = getStorage(app);
// const refvar = ref(app);
export { gestionmemoire, collection, storage}; // Ajout de la fonction collection

