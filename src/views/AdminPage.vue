<template>
  <div v-if="isAdmin" class="admin-dashboard">
    <h2>Welcome, Admin</h2>

    <!-- List of Registered Users -->
    <div v-if="allUsers.length > 0">
      <h3>List of Registered Users</h3>
      <ul>
        <li v-for="(user, index) in allUsers" :key="index">
          <!-- Display user details, link to edit/view the user -->
          <span>{{ user.username }} (Role: {{ user.role }})</span>
          <button @click="editUser(user)">Edit</button>
        </li>
      </ul>
    </div>

    <div v-else>
      <p>No users found.</p>
    </div>

    <!-- Logout Button -->
    <!-- Example in NavBar.vue or AdminPage.vue -->
<button v-if="currentUser" @click="handleLogout">Logout</button>


    <!-- Modal for Editing User Details -->
    <div v-if="showModal" class="modal">
      <h3>Edit User: {{ selectedUser.username }}</h3>
      <label for="email">Email:</label>
      <input type="email" v-model="selectedUser.email" />

      <label for="gender">Gender:</label>
      <input type="text" v-model="selectedUser.gender" />

      <label for="citizenship">Citizenship:</label>
      <input type="text" v-model="selectedUser.citizen" />

      <button @click="saveChanges">Save Changes</button>
      <button @click="closeModal">Cancel</button>
    </div>
  </div>

  <div v-else>
    <!-- Unauthorized access message for non-admin users -->
    <h2>Error 404: Unauthorized Access</h2>
    <p>You do not have permission to access this page.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { logoutUser } from '../utils/authUtils';

// Call the logoutUser function from authUtils.js
const handleLogout = () => {
  logoutUser();
};

const router = useRouter();
const allUsers = ref([]);
const currentUser = ref({});
const showModal = ref(false);
const selectedUser = ref({});
const isAdmin = computed(() => currentUser.value.role === 'user');

// Fetch all users from localStorage on mounted and check if user is admin
// Fetch all users from localStorage on mounted and check if user is admin
onMounted(() => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user && user.role === 'admin') {
    currentUser.value = user;
    const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];
    allUsers.value = usersFromLocalStorage;
  } else {
    router.push('/errorpage');
  }
});


// Function to edit user details
const editUser = (user) => {
  selectedUser.value = { ...user }; // Copy the user data to the modal
  showModal.value = true; // Open the modal
};

// Function to save changes to the user
const saveChanges = () => {
  const index = allUsers.value.findIndex(u => u.username === selectedUser.value.username);
  if (index !== -1) {
    // Update the user in the list
    allUsers.value.splice(index, 1, selectedUser.value);
    localStorage.setItem('users', JSON.stringify(allUsers.value)); // Save updated list to localStorage
    alert('User details updated successfully!');
  }
  closeModal();
};

// Function to close the modal
const closeModal = () => {
  showModal.value = false;
};

// Function to log out the admin
// const logout = () => {
//   localStorage.removeItem('currentUser');
//   router.push('/login'); // Redirect to login after logout
// };


</script>

<style scoped>
.admin-dashboard {
  max-width: 800px;
  margin: 50px auto;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

button {
  margin-left: 10px;
}

.modal {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
