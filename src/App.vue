<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/support-service">Support Service</router-link> |
      <router-link to="/rating">Rating</router-link>|
      <router-link to="/DataDisplay">Data Display</router-link>|
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

const isLoggedIn = ref(false); // Tracks login status
const router = useRouter();

onMounted(() => {
  checkLoginStatus();
});

// Check login status from localStorage
const checkLoginStatus = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  isLoggedIn.value = !!currentUser; // Set isLoggedIn based on whether a user is found
};

// Function to log out user and clear session
const logout = () => {
  localStorage.removeItem('currentUser'); // Clear user session
  isLoggedIn.value = false; // Update login status
  router.push('/'); // Redirect to home page after logout
};
</script>


<style scoped>

nav {
  margin-bottom: 20px;
  color: red;
}

nav a {
  margin-right: 10px;
  color: rgb(7, 7, 7);

}

</style>