<template>
  <div class="error-page">
    <h1>Error 404: Page Not Found</h1>
    <p>The page you're looking for doesn't exist or you don't have permission to access it.</p>
    <router-link to="/userpage" class="redirect-link">Go to User Page</router-link>
  </div>
</template>

<script setup>
</script>

<style scoped>
/* Center the entire error page content */
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height */
  background-color: #f8f9fa; /* Light gray background for better readability */
  padding: 20px;
  box-sizing: border-box;
}

/* Styling the main heading */
h1 {
  font-size: 48px;
  font-weight: bold;
  color: #dc3545; /* Red for error indication */
  margin-bottom: 20px;
  text-align: center;
}

/* Styling the description paragraph */
p {
  font-size: 18px;
  color: #6c757d; /* Gray for less emphasis */
  margin-bottom: 30px;
  text-align: center;
}

/* Styling the router-link */
.redirect-link {
  font-size: 18px;
  color: #007bff; /* Blue for links */
  background-color: #ffffff;
  padding: 10px 20px;
  border: 1px solid #007bff;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for button-like feel */
}

/* Hover effect for the router-link */
.redirect-link:hover {
  background-color: #007bff;
  color: #ffffff;
  text-decoration: none;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow */
  transform: translateY(-2px); /* Subtle lift effect */
}

/* Responsive design adjustments */
@media (max-width: 768px) {
  h1 {
    font-size: 36px;
  }

  p {
    font-size: 16px;
  }

  .redirect-link {
    font-size: 16px;
    padding: 8px 16px;
  }
}
</style>
