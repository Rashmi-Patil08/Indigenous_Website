<template>
    <div class="charts-page">
      <h1>Charts and Data Visualization</h1>
      <ChartView />
    </div>
  </template>
  
  <script>
  import ChartView from "@/components/ChartView.vue";
  
  export default {
    components: {
      ChartView,
    },
  };
  </script>
  
  <style scoped>
  .charts-page {
    text-align: center;
    padding: 20px;
  }
  </style>
  