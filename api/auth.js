// auth.js
import { auth } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

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

export async function logout() {
  const res = await signOut(auth);
  console.log("User signed out", res);
  return res;
}
