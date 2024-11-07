// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCk9hHK-9tlalAZPEXAH8ixiwmZMxArKpg",
    authDomain: "indigenous-website-aee73.firebaseapp.com",
    projectId: "indigenous-website-aee73",
    storageBucket: "indigenous-website-aee73.firebasestorage.app",
    messagingSenderId: "978573056013",
    appId: "1:978573056013:web:94cacaf5ed7736c4bb9d44"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
