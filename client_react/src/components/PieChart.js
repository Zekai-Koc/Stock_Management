// src/components/PieChart.js
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
   const data = {
      labels: ["Red", "Blue", "Yellow"],
      datasets: [
         {
            label: "# of Votes",
            data: [12, 19, 3],
            backgroundColor: [
               "rgba(255, 99, 132, 0.2)",
               "rgba(54, 162, 235, 0.2)",
               "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
               "rgba(255, 99, 132, 1)",
               "rgba(54, 162, 235, 1)",
               "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
         },
      ],
   };

   const options = {
      responsive: true,
      maintainAspectRatio: false, // Disable aspect ratio maintenance
      aspectRatio: 1, // Set aspect ratio (1:1 for square)
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
   };

   return (
      <div style={{ height: "300px" }}>
         <h2>Pie Chart</h2>
         <Pie data={data} options={options} />
      </div>
   );
};

export default PieChart;
