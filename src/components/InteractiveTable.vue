<!-- InteractiveTable.vue -->

<template>
  <div class="table-container">
    <h2 class="table-title">{{ title }}</h2>
    <div class="table-wrapper">
      <vue-good-table
        :columns="columns"
        :rows="rows"
        :pagination-options="paginationOptions"
        :search-options="searchOptions"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataUrl: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Interactive Table',
    },
  },
  data() {
    return {
      columns: [],
      rows: [],
      paginationOptions: {
        enabled: true,
        perPage: 10,
      },
      searchOptions: {
        enabled: true,
        placeholder: 'Search entries...',
      },
    };
  },
  async mounted() {
    try {
      console.log('Fetching data from:', this.dataUrl);
      const response = await fetch(this.dataUrl);
      const data = await response.json();
      this.rows = data;

      if (data.length > 0) {
        this.columns = Object.keys(data[0]).map((key) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          field: key,
          sortable: true,
          filterable: true,
        }));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>


<style scoped>
.table-container {
  margin: 20px auto;
  padding: 20px; /* Add padding for spacing inside the container */
  max-width: 95%; /* Restrict the width to ensure it doesn't touch the edges */
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table-title {
  margin-bottom: 1em;
  font-size: 1.5rem;
  color: #333;
  text-align: center;
}

/* Add a wrapper to ensure the table is fully responsive */
.table-wrapper {
  overflow-x: auto; 
}

.vue-good-table {
  margin: 0 auto; 
  width: 100%; 
  border-spacing: 0;
}

.vue-good-table th, .vue-good-table td {
  padding: 10px; /* Add padding to table cells for better spacing */
  text-align: left;
}

.vue-good-table th {
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
}

.vue-good-table tr:nth-child(even) {
  background-color: #f9f9f9; /* Subtle background for alternating rows */
}

.vue-good-table tr:hover {
  background-color: #f1f1f1; /* Highlight row on hover */
}
</style>

