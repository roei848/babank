// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ⚙️ Replace with your own Firebase config from console
const firebaseConfig = {
  apiKey: "AIzaSyBX8G4aEkeUtBfhybBBXShq47NKO6oksUk",
  authDomain: "babank-b99ee.firebaseapp.com",
  projectId: "babank-b99ee",
  storageBucket: "babank-b99ee.firebasestorage.app",
  messagingSenderId: "677543762039",
  appId: "1:677543762039:web:3cf89564e011e77f014e72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
