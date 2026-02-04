// Firebase Configuration
// Replace these values with your Firebase project credentials
// Get them from: Firebase Console > Project Settings > General > Your apps

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase config
// Blockchain integration – demo mode
// This is a demo application. Real blockchain integration would be implemented here.
const firebaseConfig = {
    apiKey: "AIzaSyBTSUawe3gn1kr_b89KQ2X_mUEZ2xTVF1k",
    authDomain: "govtrustchain-mvp.firebaseapp.com",
    projectId: "govtrustchain-mvp",
    storageBucket: "govtrustchain-mvp.firebasestorage.app",
    messagingSenderId: "442274460721",
    appId: "1:442274460721:web:1a4e6a75fa5ece5dd25110"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;