<template>
    <div class="add-chart-data">
      <h2>Add Data to Firestore</h2>
      <form @submit.prevent="addData">
        <input
          v-model="newData.label"
          placeholder="Enter Label (e.g., Jan)"
          required
        />
        <input
          v-model.number="newData.value"
          type="number"
          placeholder="Enter Value"
          required
        />
        <button type="submit">Add Data</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addChartData } from "../services/firestoreService";
  
  export default {
    data() {
      return {
        newData: {
          label: "",
          value: null,
        },
      };
    },
    methods: {
      async addData() {
        try {
          await addChartData(this.newData);
          alert("Data added successfully!");
          this.newData.label = "";
          this.newData.value = null;
        } catch (error) {
          alert("Failed to add data. Check the console for details.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-chart-data {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    padding: 10px 20px;
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
  