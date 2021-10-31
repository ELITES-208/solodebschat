import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCB10k221mwuyx3XXZg0P_5DmBDnWF8mX8",
  authDomain: "solodebschat-f53ef.firebaseapp.com",
  projectId: "solodebschat-f53ef",
  storageBucket: "solodebschat-f53ef.appspot.com",
  messagingSenderId: "844959907038",
  appId: "1:844959907038:web:791a956fcbf6ddd852d64f",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
