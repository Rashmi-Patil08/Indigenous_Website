<template>
    <div class="export-tool">
      <button @click="exportAsCSV" class="export-button">Export as CSV</button>
      <button @click="exportAsPDF" class="export-button">Export as PDF</button>
    </div>
  </template>
  
  <script>
  import jsPDF from "jspdf";
  import "jspdf-autotable";
  
  export default {
    props: {
      data: {
        type: Array,
        required: true,
      },
      columns: {
        type: Array,
        required: true,
      },
    },
    methods: {
      exportAsCSV() {
        const header = this.columns.join(",");
        const rows = this.data
          .map((row) => this.columns.map((col) => row[col]).join(","))
          .join("\n");
        const csvContent = `${header}\n${rows}`;
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "exported_data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      exportAsPDF() {
        const doc = new jsPDF();
        doc.text("Exported Data", 10, 10);
        doc.autoTable({
          head: [this.columns],
          body: this.data.map((row) => this.columns.map((col) => row[col])),
        });
        doc.save("exported_data.pdf");
      },
    },
  };
  </script>
  
  