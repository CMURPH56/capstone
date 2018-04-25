import { auth } from '../config/firebase'

export function createUser (email, pw) {
  return auth.createUserWithEmailAndPassword(email, pw)
}

export const logout = async() => {
  console.log("Logging out...")
  await auth.signOut()
  console.log("Logged out successfully")
}

export function login (email, pw) {
  return auth.signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return auth.sendPasswordResetEmail(email)
}
