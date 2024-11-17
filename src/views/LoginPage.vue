<template>
  <div class="login-form">
    <h2>Login Page</h2>

    <!-- Registration Link at the Top -->
    <p>
      Don't have an account?
      <router-link to="/register" aria-label="Register here">Register here</router-link>
    </p>

    <form @submit.prevent="handleSubmit" aria-labelledby="login-form-title">
      <!-- Email or Username -->
      <div class="form-group">
        <label for="emailOrUsername">Email or Username:</label>
        <input
          type="text"
          id="emailOrUsername"
          v-model="emailOrUsername"
          :class="{ 'error': showErrors && !emailOrUsernameValid }"
          aria-invalid="true"
          aria-required="true"
          placeholder="Enter your email or username"
        />
        <span
          v-if="showErrors && !emailOrUsernameValid"
          class="error-message"
          role="alert"
        >
          Please enter a valid email or username
        </span>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          :class="{ 'error': showErrors && !passwordValid }"
          aria-invalid="true"
          aria-required="true"
          placeholder="Enter your password"
        />
        <span
          v-if="showErrors && !passwordValid"
          class="error-message"
          role="alert"
        >
          Password is required
        </span>
      </div>

      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit" aria-label="Login to your account">Login</button>
        <button
          type="button"
          @click="clearForm"
          aria-label="Clear the form"
        >
          Clear
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';  // Import the useRouter function
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebaseConfig';


const router = useRouter();  // Initialize the router

const emailOrUsername = ref('');
const password = ref('');
const showErrors = ref(false);

// Email/Username validation
const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|company\.com)$/;
const emailOrUsernameValid = computed(() => emailOrUsername.value.trim() !== '' && (emailRegex.test(emailOrUsername.value) || emailOrUsername.value.length >= 3));
const passwordValid = computed(() => password.value.trim() !== '');


// // This code is also belongs to old logic
// // Function to hash password using Web Crypto API (same as in registration)
// async function hashPassword(password) {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(password);
//   const hash = await crypto.subtle.digest('SHA-256', data);
//   return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
// }

// // Function to fetch user from local storage
// const findUser = (emailOrUsername) => {
//   let users = JSON.parse(localStorage.getItem('users')) || [];
//   return users.find(user => user.email === emailOrUsername || user.username === emailOrUsername);
// };


// This is old logic from registration page with local storage

// const handleSubmit = async () => {
//   showErrors.value = true;

//   if (emailOrUsernameValid.value && passwordValid.value) {
//     const user = findUser(emailOrUsername.value);

//     if (user) {
//       const hashedPassword = await hashPassword(password.value);

//       if (user.password === hashedPassword) {
//         // Store session data (username and role) in localStorage after successful login
//         localStorage.setItem('currentUser', JSON.stringify({ username: user.username, role: user.role, email: user.email, gender: user.gender, citizen: user.citizen}));  // Include role
        
//         // Redirect to user page after successful login
//         router.push('/userpage');  // Adjust route as per your requirement
//       } else {
//         alert('Invalid email/username or password');
//       }
//     } else {
//       alert('Invalid email/username or password');
//     }
//   }
// };



const handleSubmit = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, emailOrUsername.value, password.value);
    const user = userCredential.user;

    // Fetch additional details from Firestore
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();

      // Store user details in localStorage
      localStorage.setItem('currentUser', JSON.stringify({
        uid: user.uid,
        email: user.email,
        ...userData
      }));

      alert('Login successful!');
      router.push('/userpage'); // Redirect after login
    } else {
      alert('No user data found in Firestore.');
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    alert('Login failed: ' + error.message);
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
}

p {
  text-align: center;
  margin-bottom: 15px;
  font-size: 16px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 16px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

input:focus {
  outline: 2px solid #4caf50;
  box-shadow: 0 0 5px #4caf50;
}

input.error {
  border-color: #f44336;
}

.error-message {
  color: #f44336;
  font-size: 0.9em;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="button"] {
  background-color: #f44336;
}

button:hover {
  background-color: #45a049;
}

button[type="button"]:hover {
  background-color: #e53935;
}

a {
  color: #4caf50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
