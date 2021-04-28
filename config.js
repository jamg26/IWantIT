import firebase from "firebase/app";

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC8MT1BnTZbvRRilCKLEEQspoDoJLdU8go",
  // databaseURL: "https://project-id.firebaseio.com",
  authDomain: "iwantit-7346c.firebaseapp.com",
  projectId: "iwantit-7346c",
  storageBucket: "iwantit-7346c.appspot.com",
  messagingSenderId: "168164622107",
  appId: "1:168164622107:web:fc89f0381cd300f7db5dbe",
  measurementId: "G-Z4HDGG9WZP",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export default firebase;
