// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Firebase
