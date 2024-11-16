<template>
  <div class="user-dashboard">
    <h2>Welcome, {{ currentUser.username }}</h2>

    <!-- Admin Page Link Visible to Everyone -->
    <p>
      <router-link to="/adminpage">Admin Panel</router-link>
    </p>

    <!-- Profile Information -->
    <div class="profile-card">
      <h3>Your Profile Information:</h3>
      <p><strong>Username:</strong> {{ currentUser.username }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
      <p><strong>Gender:</strong> {{ currentUser.gender }}</p>
      <p><strong>Citizenship:</strong> {{ currentUser.citizen }}</p>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref({});

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    currentUser.value = user;
  } else {
    router.push('/login');
  }
});

const logout = () => {
  localStorage.removeItem('currentUser');
  router.push('/login');
};
</script>



<style scoped>
.user-dashboard {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.profile-card {
  padding: 15px;
  background-color: #eee;
  border-radius: 8px;
}

button {
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  opacity: 0.8;
}
</style>
