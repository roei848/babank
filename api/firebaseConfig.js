// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBX8G4aEkeUtBfhybBBXShq47NKO6oksUk",
  authDomain: "babank-b99ee.firebaseapp.com",
  projectId: "babank-b99ee",
  storageBucket: "babank-b99ee.appspot.com",
  messagingSenderId: "677543762039",
  appId: "1:677543762039:web:3cf89564e011e77f014e72",
};

// Initialize once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Persistent auth
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (err) {
  auth = getAuth(app);
}

// Firestore
export const db = getFirestore(app);
export { auth };
export default app;
