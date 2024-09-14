<template>
    <div class="error-page">
      <h1>Error 404: Page Not Found</h1>
      <p>The page you're looking for doesn't exist or you don't have permission to access it.</p>
      <router-link to="/userpage">Go to User Page</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .error-page {
    text-align: center;
    margin-top: 50px;
  }
  
  h1 {
    font-size: 36px;
    margin-bottom: 20px;
  }
  
  p {
    font-size: 18px;
  }
  
  a {
    color: #4caf50;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  