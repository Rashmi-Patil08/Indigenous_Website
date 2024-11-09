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
import { auth } from '../firebaseConfig'; // Import Firebase authentication

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegistrationPage },
  { path: '/support-service', name: 'SupportService', component: SupportServicePage, meta: { requiresAuth: true } },
  { path: '/rating', name: 'Rating', component: RatingPage, meta: { requiresAuth: true } },
  { path: '/datadisplay', name: 'DataDisplay', component: DataDisplay, meta: { requiresAuth: true } },
  { path: '/userpage', name: 'UserPage', component: UserPage, meta: { requiresAuth: true } },
  { path: '/adminpage', name: 'AdminPage', component: AdminPage, meta: { requiresAuth: true, role: 'admin' } },
  { path: '/errorpage', name: 'ErrorPage', component: ErrorPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Role-Based Access
router.beforeEach(async (to, from, next) => {
  // Fetch currentUser from local storage and Firebase auth
  const localStorageUser = JSON.parse(localStorage.getItem('currentUser'));
  const firebaseUser = auth.currentUser;

  // If route requires authentication, check for either Firebase or local authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorageUser && !firebaseUser) {
      next('/login'); // Redirect to login if neither Firebase nor local auth is present
    } else {
      // Determine user role from local storage if available, else default to Firebase user
      const role = localStorageUser ? localStorageUser.role : 'user';

      // Check for admin-only route and compare roles
      if (to.meta.role && to.meta.role !== role) {
        alert(`Access Denied: You need to be an ${to.meta.role} to access this page.`);
        next('/errorpage'); // Redirect to custom error page
      } else {
        next(); // Allow access if role matches
      }
    }
  } else {
    next(); // Allow access to public routes
  }
});

export default router;
