// auth.js
import { setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { db, auth } from "./firebaseConfig";

export async function createUser(email, password) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create Firestore user doc
  await setDoc(doc(db, "users", user.uid), {
    email: user.email,
    createdAt: new Date(),
  });

  return user;
}

export async function login(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function logout() {
  const res = await signOut(auth);
  return res;
}
