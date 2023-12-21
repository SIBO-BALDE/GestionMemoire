
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/auth';

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
const analytics = getAnalytics(app);

export const auth = firebase.auth();