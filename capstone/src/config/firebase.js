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

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: () => false
  }
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const db = firebase.firestore();
