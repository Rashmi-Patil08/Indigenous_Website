<template>
  <div>
    <h2>Indigenous People Health Data</h2>

    <!-- Form to Add New User -->
    <form @submit.prevent="addPerson">
      <input v-model="newPerson.name" placeholder="Enter Name" />
      <input v-model="newPerson.community" placeholder="Enter Community" />
      <input v-model="newPerson.language" placeholder="Enter Language" />
      <input v-model="newPerson.healthFocus" placeholder="Enter Health Focus" />
      <input v-model="newPerson.location" placeholder="Enter Location" />
      <textarea v-model="newPerson.description" placeholder="Enter Description"></textarea>
      <button>Add Person</button>
    </form>

    <!-- Display List of Indigenous People Data -->
    <ul>
      <li v-for="(person, index) in people" :key="index">
        <h3>{{ person.name }} ({{ person.community }})</h3>
        <p><strong>Language:</strong> {{ person.language }}</p>
        <p><strong>Health Focus:</strong> {{ person.healthFocus }}</p>
        <p><strong>Location:</strong> {{ person.location }}</p>
        <p><strong>Description:</strong> {{ person.description }}</p>
        <button @click="removePerson(index)">Remove</button>
      </li>
    </ul>

    <p>Total People: {{ totalPeople }}</p>
  </div>
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
/* Basic styling */
form {
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin-left: 10px;
}

textarea {
  display: block;
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
}
</style>
