<template>
    <nav class="navbar">
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
        <li><router-link to="/resources">Resources</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/support-service">Support Service</router-link></li> <!-- Update link -->
      </ul>
    </nav>
  </template>
  
    
    <script>
    export default {
      name: 'NavigationBar'
    }
    </script>
    
    <style scoped>
    .navbar {
      background-color: #004d40;
      padding: 10px;
      border-radius: 5px;
    }
    
    ul {
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-around;
    }
    
    li {
      margin: 0 15px;
    }
    
    a {
      color: white;
      text-decoration: none;
      font-size: 1.2rem;
    }
    
    a:hover {
      text-decoration: underline;
    }
    </style>
    