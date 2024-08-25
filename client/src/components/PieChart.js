import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, Title);

const PieChart = ({ title, data, labelKey, valueKey }) => {
   // Transform the incoming data into chart.js format
   const chartData = {
      labels: data.map((item) => item[labelKey]),
      datasets: [
         {
            label: title,
            data: data.map((item) => parseInt(item[valueKey], 10)),
            backgroundColor: [
               "rgba(255, 99, 132, 0.6)",
               "rgba(54, 162, 235, 0.6)",
               "rgba(255, 206, 86, 0.6)",
               "rgba(75, 192, 192, 0.6)",
               "rgba(153, 102, 255, 0.6)",
               "rgba(255, 159, 64, 0.6)",
               "rgba(201, 203, 207, 0.6)",
            ],
            borderColor: [
               "rgba(255, 99, 132, 1)",
               "rgba(54, 162, 235, 1)",
               "rgba(255, 206, 86, 1)",
               "rgba(75, 192, 192, 1)",
               "rgba(153, 102, 255, 1)",
               "rgba(255, 159, 64, 1)",
               "rgba(201, 203, 207, 1)",
            ],
            borderWidth: 1,
         },
      ],
   };

   const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
         legend: {
            display: false, // Hide legend
         },
         title: {
            display: true,
            text: title,
            position: "top", // Position title at the top
            align: "center", // Center the title
            font: {
               size: 18,
               weight: "bold",
            },
            padding: {
               top: 10,
               bottom: 20,
            },
         },
         datalabels: {
            color: "#000", // Label color
            formatter: (value, context) => {
               let label = context.chart.data.labels[context.dataIndex];
               return `${label}: ${value}`;
            },
            anchor: "center",
            align: "center",
            font: {
               weight: "bold",
               size: 14,
            },
         },
      },
   };

   return (
      <div style={{ height: "500px", width: "500px" }}>
         <Pie data={chartData} options={options} />
      </div>
   );
};

export default PieChart;

// import React from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// // Register necessary components for Chart.js
// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// const PieChart = ({ title, data, labelKey, valueKey }) => {
//    // Transform the incoming data into chart.js format
//    const chartData = {
//       labels: data.map((item) => item[labelKey]),
//       datasets: [
//          {
//             label: title,
//             data: data.map((item) => parseInt(item[valueKey], 10)),
//             backgroundColor: [
//                "rgba(255, 99, 132, 0.6)",
//                "rgba(54, 162, 235, 0.6)",
//                "rgba(255, 206, 86, 0.6)",
//                "rgba(75, 192, 192, 0.6)",
//                "rgba(153, 102, 255, 0.6)",
//                "rgba(255, 159, 64, 0.6)",
//                "rgba(201, 203, 207, 0.6)",
//             ],
//             borderColor: [
//                "rgba(255, 99, 132, 1)",
//                "rgba(54, 162, 235, 1)",
//                "rgba(255, 206, 86, 1)",
//                "rgba(75, 192, 192, 1)",
//                "rgba(153, 102, 255, 1)",
//                "rgba(255, 159, 64, 1)",
//                "rgba(201, 203, 207, 1)",
//             ],
//             borderWidth: 1,
//          },
//       ],
//    };

//    const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//          legend: {
//             display: false, // Hide legend
//          },
//          datalabels: {
//             color: "#000", // Label color
//             formatter: (value, context) => {
//                let label = context.chart.data.labels[context.dataIndex];
//                return `${label}: ${value}`;
//             },
//             anchor: "center",
//             align: "center",
//             font: {
//                weight: "bold",
//                size: 14,
//             },
//          },
//       },
//    };

//    return (
//       <div style={{ height: "500px", width: "500px" }}>
//          <h2>{title}</h2>
//          <Pie data={chartData} options={options} />
//       </div>
//    );
// };

// export default PieChart;

// // import React from "react";
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// // import { Pie } from "react-chartjs-2";

// // // Register necessary components for Chart.js
// // ChartJS.register(ArcElement, Tooltip, Legend);

// // const PieChart = ({ title, data, labelKey, valueKey }) => {
// //    // Transform the incoming data into chart.js format
// //    const chartData = {
// //       labels: data.map((item) => item[labelKey]),
// //       datasets: [
// //          {
// //             label: title,
// //             data: data.map((item) => parseInt(item[valueKey], 10)),
// //             backgroundColor: [
// //                "rgba(255, 99, 132, 0.2)",
// //                "rgba(54, 162, 235, 0.2)",
// //                "rgba(255, 206, 86, 0.2)",
// //                "rgba(75, 192, 192, 0.2)",
// //                "rgba(153, 102, 255, 0.2)",
// //                "rgba(255, 159, 64, 0.2)",
// //             ],
// //             borderColor: [
// //                "rgba(255, 99, 132, 1)",
// //                "rgba(54, 162, 235, 1)",
// //                "rgba(255, 206, 86, 1)",
// //                "rgba(75, 192, 192, 1)",
// //                "rgba(153, 102, 255, 1)",
// //                "rgba(255, 159, 64, 1)",
// //             ],
// //             borderWidth: 1,
// //          },
// //       ],
// //    };

// //    const options = {
// //       responsive: true,
// //       maintainAspectRatio: false, // Disable aspect ratio maintenance
// //       aspectRatio: 1, // Set aspect ratio (1:1 for square)
// //       plugins: {
// //          legend: {
// //             position: "top",
// //          },
// //          tooltip: {
// //             callbacks: {
// //                label: function (tooltipItem) {
// //                   return `${tooltipItem.label}: ${tooltipItem.raw}`;
// //                },
// //             },
// //          },
// //       },
// //    };

// //    return (
// //       <div style={{ height: "400px" }}>
// //          <h2>{title}</h2>
// //          <Pie data={chartData} options={options} />
// //       </div>
// //    );
// // };

// // export default PieChart;

// // // // src/components/PieChart.js
// // // import React from "react";
// // // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// // // import { Pie } from "react-chartjs-2";

// // // // Register necessary components for Chart.js
// // // ChartJS.register(ArcElement, Tooltip, Legend);

// // // const PieChart = () => {
// // //    const data = {
// // //       labels: ["Red", "Blue", "Yellow"],
// // //       datasets: [
// // //          {
// // //             label: "# of Votes",
// // //             data: [12, 19, 3],
// // //             backgroundColor: [
// // //                "rgba(255, 99, 132, 0.2)",
// // //                "rgba(54, 162, 235, 0.2)",
// // //                "rgba(255, 206, 86, 0.2)",
// // //             ],
// // //             borderColor: [
// // //                "rgba(255, 99, 132, 1)",
// // //                "rgba(54, 162, 235, 1)",
// // //                "rgba(255, 206, 86, 1)",
// // //             ],
// // //             borderWidth: 1,
// // //          },
// // //       ],
// // //    };

// // //    const options = {
// // //       responsive: true,
// // //       maintainAspectRatio: false, // Disable aspect ratio maintenance
// // //       aspectRatio: 1, // Set aspect ratio (1:1 for square)
// // //       plugins: {
// // //          legend: {
// // //             position: "top",
// // //          },
// // //          tooltip: {
// // //             callbacks: {
// // //                label: function (tooltipItem) {
// // //                   return `${tooltipItem.label}: ${tooltipItem.raw}`;
// // //                },
// // //             },
// // //          },
// // //       },
// // //    };

// // //    return (
// // //       <div style={{ height: "400px" }}>
// // //          <h2>Pie Chart</h2>
// // //          <Pie data={data} options={options} />
// // //       </div>
// // //    );
// // // };

// // // export default PieChart;
