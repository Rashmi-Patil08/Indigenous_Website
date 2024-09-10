<template>
    <div class="data-display">
      <h2>Indigenous People Health Data</h2>
      <ul v-if="items.length > 0">
        <!-- Loop through the items and display each person's data -->
        <li v-for="item in items" :key="item.id" class="person-card">
          <h3>{{ item.name }}</h3>
          <p><strong>Community:</strong> {{ item.community }}</p>
          <p><strong>Language:</strong> {{ item.language }}</p>
          <p><strong>Health Focus:</strong> {{ item.healthFocus }}</p>
          <p><strong>Location:</strong> {{ item.location }}</p>
          <p><strong>Description:</strong> {{ item.description }}</p>
        </li>
      </ul>
      <p v-else>No data available</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [] // This array will store the fetched data from data.json
      };
    },
    mounted() {
      this.fetchData(); // Fetch the data when the component is mounted
    },
    methods: {
      async fetchData() {
        try {
          // Fetch the data from the local data.json file
          const response = await fetch('/data.json');
          if (!response.ok) throw new Error('Failed to fetch data');
          const data = await response.json(); // Parse the JSON response
          this.items = data; // Assign the fetched data to the items array
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .data-display {
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .person-card {
    list-style-type: none;
    padding: 1rem;
    margin: 1rem 0;
    border-bottom: 1px solid #ccc;
  }
  
  .person-card h3 {
    margin-bottom: 0.5rem;
  }
  
  .person-card p {
    margin: 0.25rem 0;
  }
  </style>
  