import React from "react";
import {
   Chart as ChartJS,
   LineElement,
   CategoryScale,
   LinearScale,
   Tooltip,
   Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const LineChart = () => {
   const data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
         {
            label: "Monthly Sales",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
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
         <h2>Line Chart</h2>
         <Line data={data} options={options} />
      </div>
   );
};

export default LineChart;
