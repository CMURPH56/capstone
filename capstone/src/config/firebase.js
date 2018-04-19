// Import the Firebase modules that you need in your app.
import firebase from 'firebase';
require("firebase/firestore");

// Initalize and export Firebase.
const config = {
  apiKey: 'AIzaSyCJjl3-_mNXXYS0MWm9fDAvaIDhT3c2dgs',
  authDomain: 'csc394-capstone.firebaseapp.com',
  databaseURL: 'https://csc394-capstone.firebaseio.com',
  projectId: 'csc394-capstone',
  storageBucket: '',
  messagingSenderId: '195588949678'
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
