// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBzGipOkc4lkEQj-25WIfY8Kcw29kB56Ro",
    authDomain: "ppra-project.firebaseapp.com",
    projectId: "ppra-project",
    storageBucket: "ppra-project.appspot.com",
    messagingSenderId: "346055159075",
    appId: "1:346055159075:web:7070b484547d598e857096",
};
import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);