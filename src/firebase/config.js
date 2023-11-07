import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCEhPhRr8HXL4dbhzYMmieaRkvRuXt28eE",
    authDomain: "fir-tutorial-8f1be.firebaseapp.com",
    projectId: "fir-tutorial-8f1be",
    storageBucket: "fir-tutorial-8f1be.appspot.com",
    messagingSenderId: "506815281899",
    appId: "1:506815281899:web:4391283bedc6cfe17c9cae",
    measurementId: "G-LDSZJXC419"
};

export const Firebase = initializeApp(firebaseConfig);
export const db = getFirestore(Firebase);
export const auth = getAuth(Firebase);
export const storage = getStorage(Firebase);