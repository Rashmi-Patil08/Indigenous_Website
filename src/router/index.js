// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import SupportServicePage from '../views/SupportServicePage.vue';
import RatingPage from '../views/RatingPage.vue';
import DataDisplay from '../views/DataDisplay.vue';


const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage
  },
  {
    path: '/support-service',
    name: 'SupportService',
    component: SupportServicePage
  },
  {
    path: '/rating',
    name: 'Rating',
    component: RatingPage
  },
  { path: '/DataDisplay', 
    name: 'DataDisplay', 
    component: DataDisplay 
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
