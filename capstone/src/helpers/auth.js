import { db, firebaseAuth } from '../config/firebase'

export function createUser (email, pw) {
  return firebaseAuth.createUserWithEmailAndPassword(email, pw)
    .then(addUser())
}

export function logout () {
  return firebaseAuth.signOut()
}

export function login (email, pw) {
  return firebaseAuth.signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth.sendPasswordResetEmail(email)
}


export function addUser (user) {
  return db.collection('users')
    .add({
      id: user.uid,
      email: user.email
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
}
