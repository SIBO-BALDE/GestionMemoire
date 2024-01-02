import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCDPHbGVnbC3PWsH1-GogAtXcdodWMcu9U",
  authDomain: "gestionmemoire-ebc1d.firebaseapp.com",
  projectId: "gestionmemoire-ebc1d",
  storageBucket: "gestionmemoire-ebc1d.appspot.com",
  messagingSenderId: "219810876632",
  appId: "1:219810876632:web:af56086a136fc6f39edbad",
  measurementId: "G-J7ZRKSW2JN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const gestionmemoire = getFirestore(app);
export { gestionmemoire, collection }; // Ajout de la fonction collection





// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';


// const firebaseConfig = {
//   apiKey: "AIzaSyCDPHbGVnbC3PWsH1-GogAtXcdodWMcu9U",
//   authDomain: "gestionmemoire-ebc1d.firebaseapp.com",
//   projectId: "gestionmemoire-ebc1d",
//   storageBucket: "gestionmemoire-ebc1d.appspot.com",
//   messagingSenderId: "219810876632",
//   appId: "1:219810876632:web:af56086a136fc6f39edbad",
//   measurementId: "G-J7ZRKSW2JN"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// const gestionmemoire = getFirestore(app);
// export {gestionmemoire};