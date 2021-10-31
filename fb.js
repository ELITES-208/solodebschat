import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdVkCpW1LBQGLQO4IYNnhevG1gftR5kJc",
  authDomain: "solodebschat-837fe.firebaseapp.com",
  projectId: "solodebschat-837fe",
  storageBucket: "solodebschat-837fe.appspot.com",
  messagingSenderId: "808102716299",
  appId: "1:808102716299:web:1f089d3a13c549e0c3058e",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
