// auth.js
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  console.log("User created:", userCredential.user.uid);
  return userCredential.user;
}

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log("User logged in:", userCredential.user.uid);
  return userCredential.user;
}
