<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/support-service">Support Service</router-link>
      <router-link to="/rating">Rating</router-link>
      <router-link to="/DataDisplay">Data Display</router-link>
      <!-- <span @click="logout" class="logout-link">Logout</span> -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';



export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();

    onMounted(() => {
      isLoggedIn.value = !!localStorage.getItem('currentUser');
    });

    const logout = () => {
      localStorage.removeItem('currentUser');
      isLoggedIn.value = false;
      router.push('/');
    };

    return { isLoggedIn, logout };
  },
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
