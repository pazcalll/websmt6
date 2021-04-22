import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig={
    apiKey: "AIzaSyAvAQLTX0WhtjKn-WU2aK7AygBxLOxtNbI",
    authDomain: "websmt6.firebaseapp.com",
    projectId: "websmt6",
    storageBucket: "websmt6.appspot.com",
    messagingSenderId: "873644588534",
    appId: "1:873644588534:web:a11596b38e1a548da61bd7",
    measurementId: "G-KS4QJM0BT9"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
