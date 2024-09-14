<template>
  <div class="registration-form">
    <h2>Registration Form</h2>
    
    <form @submit.prevent="handleSubmit">
      <!-- First Name -->
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" :class="{ 'error': showErrors && !firstNameValid }" />
        <span v-if="showErrors && !firstNameValid" class="error-message">First name is required</span>
      </div>

      <!-- Last Name -->
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" :class="{ 'error': showErrors && !lastNameValid }" />
        <span v-if="showErrors && !lastNameValid" class="error-message">Last name is required</span>
      </div>

      <!-- Email -->
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" :class="{ 'error': showErrors && !emailValid }" />
        <span v-if="showErrors && !emailValid" class="error-message">Invalid email format (must be @gmail.com or @company.com)</span>
      </div>

      <!-- Username -->
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" :class="{ 'error': showErrors && !usernameValid }" />
        <span v-if="showErrors && !usernameValid" class="error-message">Username is required</span>
      </div>

      <!-- Gender -->
      <div class="form-group">
        <label>Gender:</label>
        <div class="horizontal-radio">
          <input type="radio" id="male" value="Male" v-model="gender" />
          <label for="male">Male</label>
          
          <input type="radio" id="female" value="Female" v-model="gender" />
          <label for="female">Female</label>
          
          <input type="radio" id="other" value="Other" v-model="gender" />
          <label for="other">Other</label>
        </div>
        <span v-if="showErrors && !genderValid" class="error-message">Please select a gender</span>
      </div>

      <!-- Australian Citizen -->
      <div class="form-group">
        <label>Are you an Australian Citizen?</label>
        <div class="horizontal-radio">
          <input type="radio" id="yes" value="Yes" v-model="citizen" />
          <label for="yes">Yes</label>
          
          <input type="radio" id="no" value="No" v-model="citizen" />
          <label for="no">No</label>
        </div>
        <span v-if="showErrors && !citizenValid" class="error-message">Please select citizenship status</span>
      </div>

      <!-- Password -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" :class="{ 'error': showErrors && !passwordValid }" />
        <span v-if="showErrors && !passwordValid" class="error-message">
          Password must be at least 8 characters, include an uppercase letter, a number, and a special character
        </span>
      </div>

      <!-- Confirm Password -->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" :class="{ 'error': showErrors && !confirmPasswordValid }" />
        <span v-if="showErrors && !confirmPasswordValid" class="error-message">Passwords do not match</span>
      </div>

      <!-- Buttons -->
      <div class="form-actions">
        <button type="submit">Submit</button>
        <button type="button" @click="clearForm">Clear</button>
      </div>
    </form>
  </div>
</template>


<!-- JavaScript for RegistrationPage -->

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import the useRouter function

const router = useRouter(); // Initialize the router

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const username = ref('');
const gender = ref('');
const citizen = ref('');
const password = ref('');
const confirmPassword = ref('');
const showErrors = ref(false);

// Password validation regex to check the criteria
const passwordCriteria = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

// Validations
const firstNameValid = computed(() => firstName.value.trim() !== '');
const lastNameValid = computed(() => lastName.value.trim() !== '');
const emailValid = computed(() => /^[a-zA-Z0-9._-]+@(gmail\.com|company\.com)$/.test(email.value));
const usernameValid = computed(() => username.value.trim() !== '');
const genderValid = computed(() => gender.value !== '');
const citizenValid = computed(() => citizen.value !== '');
const passwordValid = computed(() => passwordCriteria.test(password.value));
const confirmPasswordValid = computed(() => password.value === confirmPassword.value);

// Function to hash password using Web Crypto API
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

// Store users in local storage in JSON format
const saveUserToLocalStorage = (user) => {
  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

const handleSubmit = async () => {
  showErrors.value = true;

  if (firstNameValid.value && lastNameValid.value && emailValid.value && usernameValid.value && genderValid.value && citizenValid.value && passwordValid.value && confirmPasswordValid.value) {
    
    // Hash the password using Web Crypto API (SHA-256)
    const hashedPassword = await hashPassword(password.value);
    
    // Ensure password is hashed before storing
    const newUser = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      gender: gender.value,
      citizen: citizen.value,
      password: hashedPassword,  // Save the hashed password
    };

    // Save user to local storage
    saveUserToLocalStorage(newUser);

    alert('Registration successful!');
    clearForm();

    // Redirect to login page after successful registration
    router.push('/login');
  }
};

const clearForm = () => {
  firstName.value = '';
  lastName.value = '';
  email.value = '';
  username.value = '';
  gender.value = '';
  citizen.value = '';
  password.value = '';
  confirmPassword.value = '';
  showErrors.value = false;
};

</script>






<!-- CSS for RegistrationPage -->
<style scoped>
.registration-form {
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

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
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

.horizontal-radio {
  display: flex;
  gap: 15px;
  align-items: center;
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
</style>
