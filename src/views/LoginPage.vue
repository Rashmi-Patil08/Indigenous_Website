<template>
  <div class="login-form">
    <h2>Login Page</h2>

    <!-- Registration Link at the Top -->
    <p>
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>

    <form @submit.prevent="handleSubmit">
      <!-- Email or Username -->
      <div class="form-group">
        <label for="emailOrUsername">Email:</label>
        <input type="text" id="emailOrUsername" v-model="emailOrUsername" :class="{ 'error': showErrors && !emailOrUsernameValid }" />
        <span v-if="showErrors && !emailOrUsernameValid" class="error-message">Please enter a valid email or username</span>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" :class="{ 'error': showErrors && !passwordValid }" />
        <span v-if="showErrors && !passwordValid" class="error-message">Password is required</span>
      </div>

      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit">Login</button>
        <button type="button" @click="clearForm">Clear</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';  // Import the useRouter function

const router = useRouter();  // Initialize the router

const emailOrUsername = ref('');
const password = ref('');
const showErrors = ref(false);

// Email/Username validation
const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|company\.com)$/;
const emailOrUsernameValid = computed(() => emailOrUsername.value.trim() !== '' && (emailRegex.test(emailOrUsername.value) || emailOrUsername.value.length >= 3));
const passwordValid = computed(() => password.value.trim() !== '');

// Function to hash password using Web Crypto API (same as in registration)
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Function to fetch user from local storage
const findUser = (emailOrUsername) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  return users.find(user => user.email === emailOrUsername || user.username === emailOrUsername);
};

const handleSubmit = async () => {
  showErrors.value = true;

  if (emailOrUsernameValid.value && passwordValid.value) {
    const user = findUser(emailOrUsername.value);

    if (user) {
      const hashedPassword = await hashPassword(password.value);

      if (user.password === hashedPassword) {
        // Store session data (username and role) in localStorage after successful login
        localStorage.setItem('currentUser', JSON.stringify({ username: user.username, role: user.role, email: user.email, gender: user.gender, citizen: user.citizen}));  // Include role
        
        // Redirect to user page after successful login
        router.push('/userpage');  // Adjust route as per your requirement
      } else {
        alert('Invalid email/username or password');
      }
    } else {
      alert('Invalid email/username or password');
    }
  }
};


// Clear form inputs
const clearForm = () => {
  emailOrUsername.value = '';
  password.value = '';
  showErrors.value = false;
};
</script>

<!-- CSS code for Login Page -->
<style scoped>
.login-form {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  text-align: center;
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input.error {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.9em;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="button"] {
  background-color: #f44336;
}

button:hover {
  opacity: 0.8;
}

a {
  color: #4caf50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
