<template>
  <div class="chart-container">
    <h2>Interactive Chart</h2>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { fetchChartData } from "@/services/firestoreService";
import Chart from "chart.js/auto";

export default {
  name: "ChartView",
  setup() {
    const chart = ref(null);

    onMounted(async () => {
      const chartData = await fetchChartData();

      // Define the order of months
      const monthOrder = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      // Sort chartData based on monthOrder
      const sortedChartData = chartData.sort(
        (a, b) => monthOrder.indexOf(a.label) - monthOrder.indexOf(b.label)
      );

      // Extract labels and values from the sorted data
      const labels = sortedChartData.map((item) => item.label);
      const values = sortedChartData.map((item) => item.value);

      // Render the chart
      chart.value = new Chart(document.getElementById("chart"), {
        type: "bar", // Can be 'line', 'pie', etc.
        data: {
          labels,
          datasets: [
            {
              label: "Value",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    });
  },
};
</script>

<style scoped>
.chart-container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
}
</style>
