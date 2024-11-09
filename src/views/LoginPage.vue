<template>
  <div class="login-form">
    <h2>Login Page</h2>

    <!-- Registration Link at the Top -->
    <p>
      Don't have an account?
      <router-link to="/register">Register here</router-link>
    </p>

    <form @submit.prevent="handleSubmit">
      <!-- Email Input -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" :class="{ 'error': showErrors && !emailValid }" />
        <span v-if="showErrors && !emailValid" class="error-message">Please enter a valid email</span>
      </div>

      <!-- Password Input -->
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
import { useRouter } from 'vue-router';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();

const email = ref('');
const password = ref('');
const showErrors = ref(false);

const emailValid = computed(() => email.value.trim() !== '');
const passwordValid = computed(() => password.value.trim() !== '');

// Primary form submission handling function
const handleSubmit = async () => {
  showErrors.value = true;

  if (emailValid.value && passwordValid.value) {
    try {
      // Attempt Firebase sign-in
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
      const user = userCredential.user;

      // Save user info locally and redirect
      localStorage.setItem('currentUser', JSON.stringify({ uid: user.uid, email: user.email }));
      router.push('/userpage');
    } catch (error) {
  console.error("Firebase login error:", error.message); // Logs specific Firebase error
  alert('Invalid email or password. Please try again.');
}

  }
};


// Basic authentication fallback logic
// const handleBasicAuth = () => {
//   // Replace with your existing basic authentication logic
//   const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//   const matchedUser = storedUsers.find(user => user.email === email.value && user.password === password.value);

//   if (matchedUser) {
//     localStorage.setItem('currentUser', JSON.stringify({ email: matchedUser.email, authType: 'basic' }));
//     router.push('/userpage');
//   } else {
//     alert('Invalid email or password. Please try again.');
//   }
// };

// Clear form inputs
const clearForm = () => {
  email.value = '';
  password.value = '';
  showErrors.value = false;
};
</script>

<style scoped>
/* CSS code remains unchanged */
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

input[type="email"],
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
