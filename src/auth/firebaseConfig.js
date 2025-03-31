import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyCxKO85EunTCXr1yEBMFsF0TM52lFdTz8g',
    authDomain: "consoleauths.firebaseapp.com",
    projectId: "consoleauths",
    storageBucket: "consoleauths.firebasestorage.app",
    messagingSenderId: "12904864693",
    appId: "1:12904864693:web:6c69c38772252b3662d7fc"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
