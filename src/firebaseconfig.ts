// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Si usas Firestore
import { getAuth } from 'firebase/auth'; // Si usas autenticación

const firebaseConfig = {
  apiKey: "AIzaSyA1-eH7e_dCH7EFiFQbo3nMqCitqhKXvxY",
  authDomain: "inventarioincienso.firebaseapp.com",
  projectId: "inventarioincienso",
  storageBucket: "inventarioincienso.firebasestorage.app",
  messagingSenderId: "287025354517",
  appId: "1:287025354517:web:8d7c891b5a5e87a9303b1c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta servicios que vayas a usar
export const db = getFirestore(app);
export const auth = getAuth(app);
