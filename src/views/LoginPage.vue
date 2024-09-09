<template>
    <div>
      <h1>Login Page</h1>
      <form @submit.prevent="handleLogin">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" />
        
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
        
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  
  const handleLogin = () => {
    if (username.value && password.value) {
      alert(`Logging in as ${username.value}`);
    } else {
      alert('Please enter credentials');
    }
  };
  </script>
  
  <style scoped>

  h1{
    color: red;
  }
  </style>
  