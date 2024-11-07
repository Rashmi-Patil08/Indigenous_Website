import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebaseConfig';
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
    component: SupportServicePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/rating',
    name: 'Rating',
    component: RatingPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/datadisplay',
    name: 'DataDisplay',
    component: DataDisplay,
    meta: { requiresAuth: true }
  },
  {
    path: '/userpage',
    name: 'UserPage',
    component: UserPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/adminpage',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true, role: 'admin' }
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

// Navigation Guard for Firebase Authentication and Role-Based Access
router.beforeEach((to, from, next) => {
  // Get the current Firebase authenticated user
  const unsubscribe = auth.onAuthStateChanged(user => {
    unsubscribe(); // Unsubscribe from onAuthStateChanged listener to prevent memory leaks

    // If the route requires authentication
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        // User is not logged in, redirect to login page
        next('/login');
      } else {
        // User is logged in, check for role-based access if needed
        user.getIdTokenResult().then(idTokenResult => {
          const userRole = idTokenResult.claims.role || 'user';

          // If route requires a specific role, check if it matches
          if (to.meta.role && to.meta.role !== userRole) {
            alert(`Access Denied: You need to be a ${to.meta.role} to access this page.`);
            next('/errorpage'); // Redirect to a custom error page if role doesn't match
          } else {
            next(); // Role matches or no specific role required, proceed to the route
          }
        }).catch(() => {
          next('/errorpage'); // Redirect to error page if there's an issue retrieving the role
        });
      }
    } else {
      // Route doesn't require authentication, proceed as usual
      next();
    }
  });
});

export default router;
