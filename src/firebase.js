// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Masukkan konfigurasi SDK Anda di sini
const firebaseConfig = {
  apiKey: "AIzaSyCHBM1KoDDQgyDX3MFouI-kYBpQHCBiJUE",
  authDomain: "anniversary-web-91521.firebaseapp.com",
  projectId: "anniversary-web-91521",
  storageBucket: "anniversary-web-91521.firebasestorage.app",
  messagingSenderId: "625852690800",
  appId: "1:625852690800:web:c23f1f0c0d88821b469fb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
