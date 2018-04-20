import { auth } from '../config/firebase'

export function createUser (email, pw) {
  return auth.createUserWithEmailAndPassword(email, pw)
    .catch((error) => {
      console.log("Error creating user:", error);
    });
}

export const logout = async() => {
  console.log("Logging out...")
  await auth.signOut()
  console.log("Logged out successfully")
}

export function login (email, pw) {
  return auth.signInWithEmailAndPassword(email, pw)
    .catch((error) => {
      console.log("Error logging in:", error);
    });
}

export function resetPassword (email) {
  return auth.sendPasswordResetEmail(email)
}
