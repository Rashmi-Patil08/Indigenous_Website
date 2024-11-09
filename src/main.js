// import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')

// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Import the router
import './assets/base.css';

createApp(App).use(router).mount('#app');


{/* <script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

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
</script> */}