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
