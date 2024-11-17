<template>
  <section v-if="isAdmin" class="admin-dashboard">
    <h2>Welcome, Admin</h2>

    <!-- List of Registered Users -->
    <div v-if="allUsers.length > 0" class="user-list">
      <h3>List of Registered Users</h3>
      <ul>
        <li v-for="(user, index) in allUsers" :key="index" class="user-item">
          <!-- Display user details, link to edit/view the user -->
          <span class="user-info">
            {{ user.username }} (Role: {{ user.role }})
          </span>
          <button @click="editUser(user)" class="edit-btn" aria-label="Edit user {{ user.username }}">
            Edit
          </button>
        </li>
      </ul>
    </div>

    <div v-else class="no-users">
      <p>No users found.</p>
    </div>

    <!-- Logout Button -->
    <button @click="logout" class="logout-btn">Logout</button>

    <!-- Modal for Editing User Details -->
    <div v-if="showModal" class="modal" role="dialog" aria-modal="true" aria-labelledby="editModalTitle">
      <h3 id="editModalTitle">Edit User: {{ selectedUser.username }}</h3>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="selectedUser.email" required />

      <label for="gender">Gender:</label>
      <input type="text" id="gender" v-model="selectedUser.gender" />

      <label for="citizenship">Citizenship:</label>
      <input type="text" id="citizenship" v-model="selectedUser.citizen" />

      <button @click="saveChanges" class="save-btn">Save Changes</button>
      <button @click="closeModal" class="cancel-btn">Cancel</button>
    </div>
  </section>

  <section v-else class="unauthorized-access">
    <!-- Unauthorized access message for non-admin users -->
    <h2>Error 403: Unauthorized Access</h2>
    <p>You do not have permission to access this page.</p>
  </section>
</template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { collection, getDocs } from 'firebase/firestore';
  import { firestore } from '../firebaseConfig';

  const allUsers = ref([]);


  
  const router = useRouter();
  // const allUsers = ref([]);
  const currentUser = ref({});
  const showModal = ref(false);
  const selectedUser = ref({});
  const isAdmin = computed(() => currentUser.value.role === 'admin');

  onMounted(async () => {
  const querySnapshot = await getDocs(collection(firestore, 'users'));
  allUsers.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});
  
  // Fetch all users from localStorage on mounted and check if user is admin
  onMounted(() => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      currentUser.value = user;
      if (user.role === 'admin') {
        // Fetch all users from localStorage
        const usersFromLocalStorage = JSON.parse(localStorage.getItem('users')) || [];
        allUsers.value = usersFromLocalStorage;
      } else {
        router.push('/errorpage'); // Redirect non-admin users to 404
      }
    } else {
      router.push('/userpage'); // Redirect unauthenticated users to login
    }
  });
  
  // Function to edit user details
  const editUser = (user) => {
    selectedUser.value = { ...user }; // Copy the user data to the modal
    showModal.value = true; // Open the modal
  };
  
  // Function to save changes to the user
  // const saveChanges = () => {
  //   const index = allUsers.value.findIndex(u => u.username === selectedUser.value.username);
  //   if (index !== -1) {
  //     // Update the user in the list
  //     allUsers.value.splice(index, 1, selectedUser.value);
  //     localStorage.setItem('users', JSON.stringify(allUsers.value)); // Save updated list to localStorage
  //     alert('User details updated successfully!');
  //   }
  //   closeModal();
  // };

  import { doc, updateDoc } from 'firebase/firestore';

  const saveChanges = async () => {
  try {
    const userDocRef = doc(firestore, 'users', selectedUser.value.id);
    
    // Log the data to be updated
    console.log("Updating Document:", selectedUser.value);

    await updateDoc(userDocRef, {
      email: selectedUser.value.email,
      gender: selectedUser.value.gender,
      citizen: selectedUser.value.citizen
    });

    alert('User details updated successfully!');
    closeModal();
  } catch (error) {
    console.error('Failed to update user details:', error.message);
    alert('Failed to update user details: ' + error.message);
  }
};

  
  // Function to close the modal
  const closeModal = () => {
    showModal.value = false;
  };
  
  // Function to log out the admin
  const logout = () => {
    localStorage.removeItem('currentUser');
    router.push('/login'); // Redirect to login after logout
  };
  </script>



  
  <style scoped>
  /* Admin Dashboard Container */
  .admin-dashboard {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  /* User List Styling */
  .user-list {
    margin-bottom: 30px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  .user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .user-info {
    font-size: 16px;
    font-weight: bold;
  }
  
  /* Buttons */
  button {
    padding: 10px 15px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: #007bff;
    color: #fff;
  }
  
  .logout-btn {
    background-color: #dc3545;
    color: #fff;
    margin-top: 20px;
  }
  
  .save-btn {
    background-color: #4caf50;
    color: white;
  }
  
  .cancel-btn {
    background-color: #6c757d;
    color: white;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  /* Modal Styling */
  .modal {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 90%;
    max-width: 500px;
  }
  
  .modal h3 {
    margin-bottom: 20px;
  }
  
  .modal label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  .modal input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  /* Unauthorized Access Section */
  .unauthorized-access {
    max-width: 600px;
    margin: 50px auto;
    text-align: center;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .unauthorized-access h2 {
    color: #dc3545;
  }
  </style>
  