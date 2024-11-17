<template>
  <div class="user-dashboard">
    <h2>Welcome, {{ currentUser.username }}</h2>

    <!-- Admin Page Link Visible to Everyone -->
    <p>
      <router-link to="/adminpage" aria-label="Go to Admin Panel">Admin Panel</router-link>
    </p>

    <!-- Profile Information -->
    <div class="profile-card" tabindex="0" aria-label="Your profile information">
      <h3>Your Profile Information:</h3>
      <p><strong>Username:</strong> {{ currentUser.username }}</p>
      <p><strong>Email:</strong> {{ currentUser.email }}</p>
      <p><strong>Gender:</strong> {{ currentUser.gender }}</p>
      <p><strong>Citizenship:</strong> {{ currentUser.citizen }}</p>
    </div>

    <!-- Logout Button -->
    <button @click="logout" aria-label="Logout from the application">Logout</button>
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
  /* Container Styling */
  .user-dashboard {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    font-size: 1.8rem;
    color: #333;
  }
  
  .profile-card {
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .profile-card h3 {
    margin-bottom: 10px;
    font-size: 1.4rem;
    color: #444;
  }
  
  .profile-card p {
    margin: 5px 0;
    font-size: 1rem;
    color: #555;
  }
  
  /* Button Styling */
  button {
    padding: 10px 15px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px;
    width: 100%; /* Full-width button for better usability */
    transition: background-color 0.2s, opacity 0.2s;
  }
  
  button:hover {
    background-color: #d32f2f;
    opacity: 0.9;
  }
  
  button:focus {
    outline: 2px solid #f44336;
    outline-offset: 2px;
  }
  
  /* Link Styling */
  a {
    color: #4caf50;
    text-decoration: none;
    font-weight: bold;
    font-size: 1rem;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  a:focus {
    outline: 2px solid #4caf50;
    outline-offset: 2px;
  }
  
  /* Responsive Design */
  @media (max-width: 600px) {
    .user-dashboard {
      padding: 15px;
    }
  
    button {
      font-size: 0.9rem;
    }
  }
  </style>
  