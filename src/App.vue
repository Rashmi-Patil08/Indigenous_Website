<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link> 
      <router-link to="/register">Register</router-link> 
      <router-link to="/support-service">Support Service</router-link>
      <router-link to="/rating">Rating</router-link>
      <router-link to="/datadisplay">Data Display</router-link>
      <router-link to="/interactive-table">Interactive Table</router-link>
      <router-link to="/geo-location">Geo Location</router-link>
      <router-link to="/export-data">Export Data</router-link>

      <!-- Redirect to home and log out -->
      <router-link v-if="isLoggedIn" to="/" @click="logout">Logout</router-link>

      <!-- <a href="#">Testing</a> -->
      
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const isLoggedIn = ref(false); // Tracks login status
const router = useRouter();

onMounted(() => {
  checkLoginStatus();
});

const checkLoginStatus = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  isLoggedIn.value = !!currentUser;
};


// // Check login status from localStorage
// const checkLoginStatus = () => {
//   const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//   isLoggedIn.value = !!currentUser; // Set isLoggedIn based on whether a user is found
// };

// Function to log out user and clear session
// const logout = () => {
//   localStorage.removeItem('currentUser'); // Clear user session
//   isLoggedIn.value = false; // Update login status
//   router.push('/'); // Redirect to home page after logout
// };



const logout = async () => {
  try {
    await signOut(auth); // Sign out of Firebase
    localStorage.removeItem('currentUser'); // Clear localStorage
    isLoggedIn.value = false;
    router.push('/'); // Redirect to home
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
};


</script>


<style scoped>

nav {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  background-color: transparent; /* No background color */
}

nav a {
  margin: 0 15px; /* Horizontal spacing between links */
  color: black; /* Text color */
  text-decoration: none; 
  font-weight: bold; 
  transition: color 0.3s, background-color 0.3s; /* Smooth transition */
  padding: 8px 12px; 
  border-radius: 5px; 
}

nav a:hover {
  background-color: rgb(79, 229, 79); 
  color: white; /* White text on hover */
}

</style>
