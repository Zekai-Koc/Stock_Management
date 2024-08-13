import React from "react";
import {
   Chart as ChartJS,
   BarElement,
   CategoryScale,
   LinearScale,
   Tooltip,
   Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register necessary components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BarChart = () => {
   const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
         {
            label: "Sales",
            data: [65, 59, 80, 81, 56, 55, 40],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
         },
      ],
   };

   const options = {
      responsive: true,
      plugins: {
         legend: {
            position: "top",
         },
         tooltip: {
            callbacks: {
               label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
               },
            },
         },
      },
      scales: {
         x: {
            beginAtZero: true,
         },
         y: {
            beginAtZero: true,
         },
      },
   };

   return (
      <div style={{ width: "600px", height: "400px" }}>
         <h2>Bar Chart</h2>
         <Bar data={data} options={options} />
      </div>
   );
};

export default BarChart;
