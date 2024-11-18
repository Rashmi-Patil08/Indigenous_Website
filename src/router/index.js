import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegistrationPage from '../views/RegistrationPage.vue';
import RatingPage from '../views/RatingPage.vue';
import DataDisplay from '../views/DataDisplay.vue';
import UserPage from '../views/UserPage.vue';
import AdminPage from '../views/AdminPage.vue';
import ErrorPage from '../views/ErrorPage.vue';
import InteractiveTable from '../views/InteractiveTablePage.vue';
import GeoMap from '../views/GeoLocationPage.vue';
import ExportTool from '../views/ExportPage.vue';
import CalendarView from '../views/BookingPage.vue';


// import Logout from '../views/Logout.vue'; 

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
    path: '/rating',
    name: 'Rating',
    component: RatingPage,
    meta: { requiresAuth: true },  // Only logged-in users can access this page
  },
  {
    path: '/datadisplay',
    name: 'DataDisplay',
    component: DataDisplay,
    meta: { requiresAuth: true },  // Only logged-in users can access this page
  },
  {
    path: '/userpage',
    name: 'UserPage',
    component: UserPage,
    meta: { requiresAuth: true },  // Only logged-in users can access this page
  },
  {
    path: '/adminpage',
    name: 'AdminPage',
    component: AdminPage,
    meta: { requiresAuth: true, role: 'admin' },  // Only admins can access this page
  },
  {
    path: '/errorpage',
    name: 'ErrorPage',
    component: ErrorPage
  },

  // {
  //   path: '/logout',
  //   name: 'Logout',
  //   component: Logout
  // }
  {
    path: '/interactive-table', // New route
    name: 'InteractiveTable',
    component: InteractiveTable
  },

  {
    path: "/geo-location",
    name: "GeoLocation",
    component: GeoMap,
  },

  {
    path: "/export-data",
    name: "ExportTool",
    component: ExportTool
  },
  {
    path: "/booking",
    name: "CalendarView",
    component: CalendarView
  },
  


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard for Role-Based Access
router.beforeEach((to, from, next) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  

  
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!currentUser) {
      next('/login');  // Redirect to login page if not logged in
    } else if (to.meta.role && to.meta.role !== currentUser.role) {
      // If the route requires a specific role and user doesn't match, show an alert and deny access
      alert(`Access Denied: You need to be a ${to.meta.role} to access this page.`);
      next('/errorpage');  // Optionally, you could redirect to a custom error page
    } else {
      next();  // Proceed to the route
    }
  } else {
    next();  // Proceed to public routes
  }
});

export default router;

