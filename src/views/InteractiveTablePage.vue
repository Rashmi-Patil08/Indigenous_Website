<template>
  <div class="interactive-table-page">
    <h1>Interactive Table Page</h1>
    <!-- Tables with accessible features -->
    <div class="table-container">
      <InteractiveTable 
        title="Australian Aboriginal Table" 
        dataUrl="/data/australian_aboriginal_users.json" 
      />
    </div>
    <div class="table-container">
      <InteractiveTable 
        title="Products Table" 
        dataUrl="/data/product.json" 
      />
    </div>
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
  
  <!-- <style scoped>
  h1 {
    text-align: center;
    margin-bottom: 2em;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    margin: auto;
  }
  </style>
   -->

   <style scoped>
   /* Page layout styling */
   .interactive-table-page {
     padding: 20px;
     max-width: 1200px;
     margin: 0 auto;
     text-align: center;
     background-color: #f8f9fa; 
   }
   
   /* Heading styles */
   h1 {
     text-align: center;
     margin-bottom: 1.5em;
     font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
     color: #333; 
     font-size: 36px; 
   }
   
   /* Table container for spacing and structure */
   .table-container {
     margin: 20px auto;
     padding: 20px;
     background-color: #ffffff; 
     border: 2px solid #ccc; /* Subtle border */
     border-radius: 8px; 
     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
     overflow-x: auto; 
   }
   
   /* Responsive design */
   @media (max-width: 768px) {
     .table-container {
       padding: 15px;
       margin: 10px auto;
     }
   
     h1 {
       font-size: 28px; 
     }
   }
   </style>
   