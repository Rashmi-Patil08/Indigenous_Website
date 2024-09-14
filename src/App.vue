<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/support-service">Support Service</router-link> |
      <router-link to="/rating">Rating</router-link>|
      <router-link to="/DataDisplay">Data Display</router-link>

      <!-- <a href="#">Testing</a> -->
      
    </nav>
    <router-view></router-view>
  </div>
</template>

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