// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWriKYFRJuzeSgdZOblfS5aF9LsJyfiV4",
  authDomain: "solo-chat-app-778ca.firebaseapp.com",
  projectId: "solo-chat-app-778ca",
  storageBucket: "solo-chat-app-778ca.appspot.com",
  messagingSenderId: "186736715517",
  appId: "1:186736715517:web:53696741b4497cc7228094",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
