<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <router-link to="/support-service">Support Service</router-link>
      <router-link to="/rating">Rating</router-link>
      <router-link to="/DataDisplay">Data Display</router-link>
      <span @click="logout" class="logout-link">Logout</span>
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
  display: flex;
  justify-content: center;
  gap: 10px; /* Space between buttons */
  margin-bottom: 20px;
}

nav a, .logout-link {
  display: inline-block;
  padding: 8px 15px;
  background-color: rgb(26, 157, 61);
  color: white;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

nav a:hover, .logout-link:hover {
  background-color: rgb(85, 159, 219); /* Darken the color on hover */
}

.logout-link {
  display: inline-block;
}
</style>
