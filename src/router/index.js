// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import SupportServicePage from '../views/SupportServicePage.vue';
import RatingPage from '../views/RatingPage.vue';
import DataDisplay from '../views/DataDisplay.vue';
import UserPage from '../views/UserPage.vue';
import AdminPage from '../views/AdminPage.vue';
import ErrorPage from '../views/ErrorPage.vue';

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
  { path: '/datadisplay', 
    name: 'DataDisplay', 
    component: DataDisplay 
  },
  {
    path: '/userpage',
    name: 'UserPage',
    component: UserPage
  },
  {
    path: '/adminpage',
    name: 'AdminPage',
    component: AdminPage
  },
  {
    path: '/errorpage',
    name: 'ErrorPage',
    component: ErrorPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Role-Based Access
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next('/login');  // If not logged in, redirect to login page
    } else if (to.meta.role && to.meta.role !== currentUser.role) {
      alert(`Access Denied: You need to be a ${to.meta.role} to access this page.`);
      next(false);  // Prevent access if roles don't match
    } else {
      next();  // Allow access if role matches
    }
  } else {
    next();  // Allow access to public routes
  }
});

export default router;