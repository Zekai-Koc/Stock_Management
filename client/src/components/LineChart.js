import React from "react";
import {
   Chart as ChartJS,
   LineElement,
   CategoryScale,
   LinearScale,
   PointElement,
   Tooltip,
   Title,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary components for Chart.js
ChartJS.register(
   LineElement,
   CategoryScale,
   LinearScale,
   PointElement,
   Tooltip,
   Title
);

const LineChart = ({ title, data, labelKey, valueKey, showLegend = false }) => {
   // Transform the incoming data into chart.js format
   const chartData = {
      labels: data.map((item) => item[labelKey]),
      datasets: [
         {
            label: title,
            data: data.map((item) => parseInt(item[valueKey], 10)),
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            tension: 0.4, // Creates smooth curves on the line
         },
      ],
   };

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            display: showLegend, // Show/hide legend based on prop
         },
         title: {
            display: true,
            text: title,
            position: "top",
            align: "center",
            font: {
               size: 18,
               weight: "bold",
            },
            padding: {
               top: 10,
               bottom: 20,
            },
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
         <Line data={chartData} options={options} />
      </div>
   );
};

export default LineChart;
