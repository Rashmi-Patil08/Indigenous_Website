// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCk9hHK-9tlalAZPEXAH8ixiwmZMxArKpg",
    authDomain: "indigenous-website-aee73.firebaseapp.com",
    projectId: "indigenous-website-aee73",
    storageBucket: "indigenous-website-aee73.firebasestorage.app",
    messagingSenderId: "978573056013",
    appId: "1:978573056013:web:22d340da9c55b333bb9d44"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore();

export { auth, firestore, db };

