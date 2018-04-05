import { firebaseAuth } from '../config/firebase'

export default function logout () {
  return firebaseAuth.signOut()
}
