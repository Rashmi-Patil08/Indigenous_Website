<template>
    <div class="export-page">
      <h1>Export Data</h1>
      <p class="instructions">
        Use the export tools below to download the data in your desired format.
      </p>
  
      <!-- Accessible table preview -->
      <table class="data-table" aria-label="Preview of data to export">
        <thead>
          <tr>
            <th v-for="column in columns" :key="column">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in data" :key="index">
            <td v-for="column in columns" :key="column">{{ row[column] }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Export Tool -->
      <ExportTool :data="data" :columns="columns" />
  
      <!-- Accessibility note -->
      <p class="accessibility-note">
        <em>Note:</em> Ensure your exported files are accessible and meet your audience's needs.
      </p>
    </div>
  </template>
  
  <script>
  import ExportTool from "@/components/ExportTool.vue";
  
  export default {
    components: { ExportTool },
    data() {
      return {
        data: [
          { name: "Zharali", community: "Aboriginal", language: "English" },
          { name: "Sheremus", community: "Torres Strait Islander", language: "Kala Lagaw Ya" },
        ],
        columns: ["name", "community", "language"],
      };
    },
  };
  </script>
  
  <style scoped>
  .export-page {
    max-width: 800px;
    margin: 30px auto;
    text-align: center;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .instructions {
    font-size: 16px;
    margin-bottom: 20px;
    color: #555;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .data-table th,
  .data-table td {
    border: 1px solid #ccc;
    padding: 10px;
    text-align: left;
  }
  
  .data-table th {
    background-color: #f0f0f0;
  }
  
  .data-table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    opacity: 0.8;
  }
  
  .accessibility-note {
    font-size: 14px;
    color: #777;
    margin-top: 20px;
  }
  </style>
  
  