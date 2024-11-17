<template>
    <div>
      <h1>Interactive Table Page</h1>
      <!-- Use the InteractiveTable component and pass the correct URLs to the JSON files -->
      <InteractiveTable title="Australian Aboriginal Table" dataUrl="/data/australian_aboriginal_users.json" />
      <InteractiveTable title="Products Table" dataUrl="/data/product.json" />
    </div>
  </template>
  
  <script>
  // Import the InteractiveTable component from the components folder
  import InteractiveTable from '@/components/InteractiveTable.vue';
  
  export default {
    components: {
      InteractiveTable,
    },
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 2em;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: auto;
  }
  </style>
  