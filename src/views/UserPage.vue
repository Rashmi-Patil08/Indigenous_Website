<template>
    <div>
      <h2>Welcome, {{ currentUser.username }}</h2>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';  // Import the useRouter function

  const router = useRouter();  // Initialize the router
  
  // Fetch the current user from localStorage
  const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')));
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('currentUser'); // Clear user session
    // Redirect to login/homrpage page
    router.push('/homepage');
  };
  </script>
  