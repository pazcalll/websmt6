import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig={
    // apiKey: "AIzaSyAvAQLTX0WhtjKn-WU2aK7AygBxLOxtNbI",
    // authDomain: "websmt6.firebaseapp.com",
    // projectId: "websmt6",
    // storageBucket: "websmt6.appspot.com",
    // messagingSenderId: "873644588534",
    // appId: "1:873644588534:web:a11596b38e1a548da61bd7",
    // measurementId: "G-KS4QJM0BT9"
    apiKey: "AIzaSyBf7Ejlhr1bRRfXsTZJqwzn5MS51Ksn2vA",
    authDomain: "finalproject-43c4b.firebaseapp.com",
    databaseURL: "https://finalproject-43c4b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "finalproject-43c4b",
    storageBucket: "finalproject-43c4b.appspot.com",
    messagingSenderId: "958644566678",
    appId: "1:958644566678:web:79177c6f230542525260b7",
    measurementId: "G-VH3F7JTWPY"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
