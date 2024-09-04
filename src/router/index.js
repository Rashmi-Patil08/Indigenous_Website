import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AboutUs from '../components/AboutUs.vue'
import ContactUs from '../components/ContactUs.vue'
import Resources from '../components/Resources.vue';
import SupportService from '../components/SupportService.vue'


const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutUs },
  { path: '/contact', component: ContactUs },
  { path: '/support-service', component: SupportService },  // Updated path
  { path: '/resources', component: Resources },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
