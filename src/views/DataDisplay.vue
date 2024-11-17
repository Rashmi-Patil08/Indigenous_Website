<template>
  <section class="form-section">
    <h1>Indigenous People Health Data</h1>

    <!-- Form to Add New User -->
    <form @submit.prevent="addPerson" aria-label="Add New Person Form" class="form-container">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="newPerson.name" placeholder="Enter Name" required />
      </div>

      <div class="form-group">
        <label for="community">Community</label>
        <input id="community" v-model="newPerson.community" placeholder="Enter Community" required />
      </div>

      <div class="form-group">
        <label for="language">Language</label>
        <input id="language" v-model="newPerson.language" placeholder="Enter Language" required />
      </div>

      <div class="form-group">
        <label for="healthFocus">Health Focus</label>
        <input id="healthFocus" v-model="newPerson.healthFocus" placeholder="Enter Health Focus" required />
      </div>

      <div class="form-group">
        <label for="location">Location</label>
        <input id="location" v-model="newPerson.location" placeholder="Enter Location" required />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="newPerson.description"
          placeholder="Enter Description"
          required
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Add Person</button>
    </form>

    <!-- Display List of Indigenous People Data -->
    <ul class="people-list">
      <li v-for="(person, index) in people" :key="index" class="person-card">
        <h3>{{ person.name }} ({{ person.community }})</h3>
        <p><strong>Language:</strong> {{ person.language }}</p>
        <p><strong>Health Focus:</strong> {{ person.healthFocus }}</p>
        <p><strong>Location:</strong> {{ person.location }}</p>
        <p><strong>Description:</strong> {{ person.description }}</p>
        <button @click="removePerson(index)" aria-label="Remove {{ person.name }}" class="remove-btn">
          Remove
        </button>
      </li>
    </ul>

    <p class="total-people">Total People: {{ totalPeople }}</p>
  </section>
</template>

<script>
export default {
  data() {
    return {
      newPerson: {
        name: '',
        community: '',
        language: '',
        healthFocus: '',
        location: '',
        description: ''
      },
      people: [] // Store people data
    };
  },
  computed: {
    totalPeople() {
      return this.people.length; // Reactive count of total people
    }
  },
  mounted() {
    // Load data from localStorage when the component is mounted
    const storedPeople = JSON.parse(localStorage.getItem('people')) || [];
    this.people = storedPeople;
  },
  methods: {
    // Add a new person and store in localStorage
    addPerson() {
      if (this.newPerson.name.trim() && this.newPerson.community.trim()) {
        this.people.push({ ...this.newPerson }); // Add new person to array
        localStorage.setItem('people', JSON.stringify(this.people)); // Save to localStorage
        // Clear the input fields
        this.newPerson = {
          name: '',
          community: '',
          language: '',
          healthFocus: '',
          location: '',
          description: ''
        };
      }
    },
    // Remove a person and update localStorage
    removePerson(index) {
      this.people.splice(index, 1); // Remove person from array
      localStorage.setItem('people', JSON.stringify(this.people)); // Update localStorage
    }
  }
};
</script>

<style scoped>
/* Section styling */
.form-section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Form container styling */
.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

/* Form group styling */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

/* Submit button styling */
.submit-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.submit-btn:hover {
  background-color: #0056b3;
}

/* People list styling */
.people-list {
  list-style: none;
  padding: 0;
}

.person-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
}

.person-card h3 {
  margin: 0 0 10px;
}

.person-card p {
  margin: 5px 0;
}

.remove-btn {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.remove-btn:hover {
  background-color: #a71d2a;
}

/* Total people count */
.total-people {
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
}
</style>
