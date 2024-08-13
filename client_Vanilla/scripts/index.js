document.addEventListener("DOMContentLoaded", function () {
   const app = document.getElementById("app");
   // const homeBtn = document.getElementById("homeBtn");
   // const addDeviceBtn = document.getElementById("addDeviceBtn");
   // const viewDevicesBtn = document.getElementById("viewDevicesBtn");

   // Load initial view (Dashboard)
   loadHome();

   // homeBtn.addEventListener("click", loadHome);
   // addDeviceBtn.addEventListener("click", loadAddDevice);
   // viewDevicesBtn.addEventListener("click", loadViewDevices);

   async function loadHome() {
      app.innerHTML = `
         <section>
            <h2>Dashboard</h2>
            <div class="summary">
               <div>Total Devices: <span id="totalDevices">0</span></div>
               <div>In Stock: <span id="inStock">0</span></div>
               <div>Sold: <span id="sold">0</span></div>
               <div>Pending: <span id="pending">0</span></div>
            </div>
            <div>
               <canvas id="brandChart" width="400" height="400"></canvas>
            </div>
            <div>
               <canvas id="statusChart" width="400" height="400"></canvas>
            </div>
            <div>
               <canvas id="gradeChart" width="400" height="400"></canvas>
            </div>
         </section>
      `;
      // console.log("Before updateSummary");
      // await updateSummary(); // Direct call to updateSummary
      // console.log("After updateSummary");
      await loadBrandChart(); // Load chart data after summary
      // await loadStatusChart(); // Load status chart
      await loadGradeChart(); // Load grade chart
   }

   async function loadBrandChart() {
      try {
         const result = await getDevices();
         const devicesByBrand = result.devicesByBrand;

         // Prepare data for chart
         const brandCounts = {};
         for (const brand in devicesByBrand) {
            brandCounts[brand] = devicesByBrand[brand].length;
         }

         const labels = Object.keys(brandCounts);
         const data = Object.values(brandCounts);

         const ctx = document.getElementById("brandChart").getContext("2d");
         new Chart(ctx, {
            type: "pie",
            data: {
               labels: labels, // Array of brand names
               datasets: [
                  {
                     data: data, // Array of device counts corresponding to each brand
                     backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                     ],
                  },
               ],
            },
            options: {
               responsive: true,
               maintainAspectRatio: false,
               plugins: {
                  legend: {
                     display: false, // Disable the legend
                  },
                  tooltip: {
                     enabled: false, // Disable the tooltip
                  },
                  datalabels: {
                     color: "#fff", // Label color
                     formatter: (value, context) => {
                        const label =
                           context.chart.data.labels[context.dataIndex];
                        return `${label}: ${value}`;
                     },
                     font: {
                        weight: "bold",
                        size: 14, // Font size of the labels
                     },
                  },
               },
            },
            plugins: [ChartDataLabels], // Register the plugin
         });
      } catch (error) {
         console.error("Error loading brand chart:", error);
      }
   }

   async function loadStatusChart() {
      try {
         const result = await getStatusStats();
         const devicesByStatus = result.devicesByStatus;

         // Prepare data for status chart
         const statusCounts = {};
         for (const device of devicesByStatus) {
            const statusName = device.statusName;
            statusCounts[statusName] =
               (statusCounts[statusName] || 0) + device.count;
         }

         const labels = Object.keys(statusCounts);
         const data = Object.values(statusCounts);

         const ctx = document.getElementById("statusChart").getContext("2d");
         new Chart(ctx, {
            type: "bar",
            data: {
               labels: labels,
               datasets: [
                  {
                     data: data,
                     backgroundColor: "#4BC0C0",
                  },
               ],
            },
            options: {
               responsive: true,
               maintainAspectRatio: false,
               plugins: {
                  legend: { display: true },
                  tooltip: { enabled: true },
                  datalabels: {
                     color: "#fff",
                     formatter: (value) => `${value}`,
                     font: { weight: "bold", size: 14 },
                  },
               },
               scales: {
                  x: { beginAtZero: true },
                  y: { beginAtZero: true },
               },
            },
            plugins: [ChartDataLabels],
         });
      } catch (error) {
         console.error("Error loading status chart:", error);
      }
   }

   async function loadGradeChart() {
      try {
         const response = await fetch(
            "http://localhost:3000/api/v1/stats/getGroupedDevicesByGradeWithCounts"
         );
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         const devicesByGrade = await response.json();

         // Prepare data for chart
         const labels = devicesByGrade.map((item) => item.gradeName);
         const data = devicesByGrade.map((item) => item.count);

         const ctx = document.getElementById("gradeChart").getContext("2d");
         new Chart(ctx, {
            type: "bar",
            data: {
               labels: labels,
               datasets: [
                  {
                     label: "Device Count",
                     data: data,
                     backgroundColor: "#36A2EB",
                     borderColor: "#1F77B4",
                     borderWidth: 1,
                  },
               ],
            },
            options: {
               responsive: true,
               maintainAspectRatio: false,
               scales: {
                  x: {
                     beginAtZero: true,
                  },
                  y: {
                     beginAtZero: true,
                  },
               },
               plugins: {
                  legend: { display: true },
                  datalabels: {
                     color: "#fff",
                     formatter: (value) => value,
                     font: { weight: "bold", size: 14 },
                  },
               },
            },
            plugins: [ChartDataLabels],
         });
      } catch (error) {
         console.error("Error loading grade chart:", error);
      }
   }

   // async function loadGradeChart() {
   //    try {
   //       const result = await getGrades();
   //       console.log("result", result);
   //       const devicesByGrade = result.devicesByGrade;

   //       // Prepare data for grade chart
   //       const gradeCounts = {};
   //       for (const device of devicesByGrade) {
   //          const gradeName = device.gradeName;
   //          gradeCounts[gradeName] =
   //             (gradeCounts[gradeName] || 0) + device.count;
   //       }

   //       const labels = Object.keys(gradeCounts);
   //       const data = Object.values(gradeCounts);

   //       const ctx = document.getElementById("gradeChart").getContext("2d");
   //       new Chart(ctx, {
   //          type: "doughnut",
   //          data: {
   //             labels: labels,
   //             datasets: [
   //                {
   //                   data: data,
   //                   backgroundColor: [
   //                      "#FF6384",
   //                      "#36A2EB",
   //                      "#FFCE56",
   //                      "#4BC0C0",
   //                      "#9966FF",
   //                   ],
   //                },
   //             ],
   //          },
   //          options: {
   //             responsive: true,
   //             maintainAspectRatio: false,
   //             plugins: {
   //                legend: { display: true },
   //                tooltip: { enabled: true },
   //                datalabels: {
   //                   color: "#fff",
   //                   formatter: (value, context) =>
   //                      `${
   //                         context.chart.data.labels[context.dataIndex]
   //                      }: ${value}`,
   //                   font: { weight: "bold", size: 14 },
   //                },
   //             },
   //          },
   //          plugins: [ChartDataLabels],
   //       });
   //    } catch (error) {
   //       console.error("Error loading grade chart:", error);
   //    }
   // }

   async function getDevices() {
      try {
         const response = await fetch("http://localhost:3000/api/v1/devices");
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         const result = await response.json();
         return result;
      } catch (error) {
         console.error("Error fetching devices:", error);
         return { devicesByBrand: {} }; // Return a default empty object if error occurs
      }
   }

   async function getStatusStats() {
      try {
         const response = await fetch(
            "http://localhost:3000/api/v1/devices/statusstats"
         );
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         return await response.json();
      } catch (error) {
         console.error("Error fetching status stats:", error);
         return { devicesByStatus: [] }; // Return a default empty array if error occurs
      }
   }

   async function getGrades() {
      try {
         const response = await fetch(
            "http://localhost:3000/api/v1/stats/getGroupedDevicesByGradeWithCounts"
         );
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         return await response.json();
      } catch (error) {
         console.error("Error fetching grades:", error);
         return { devicesByGrade: [] }; // Return a default empty array if error occurs
      }
   }

   async function getStatusStats() {
      console.log("getStatusStats called"); // Log at the start

      try {
         const response = await fetch(
            "http://localhost:3000/api/v1/devices/statusstats"
         );
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         const result = await response.json();
         console.log("getStatusStats result JSON:", result); // Log the parsed JSON

         return result;
      } catch (error) {
         console.error("Error fetching devices:", error);
         return { devicesByBrand: {} }; // Return a default empty object if error occurs
      }
   }

   async function updateSummary() {
      console.log("updateSummary called"); // Log at the start

      try {
         const result = await getStatusStats();
         console.log("*************", result);
         const devices = result.devices;
         const totalDevices = result.count;
         document.getElementById("totalDevices").textContent = totalDevices;

         const inStock = devices.filter((d) => d.statusId === 1).length;
         const sold = devices.filter((d) => d.statusId === 2).length;
         const pending = devices.filter((d) => d.statusId === 3).length;

         document.getElementById("inStock").textContent = inStock;
         document.getElementById("sold").textContent = sold;
         document.getElementById("pending").textContent = pending;
      } catch (error) {
         console.error("Error updating summary:", error);
      }
   }
});

//
//
//
// function loadAddDevice() {
//    app.innerHTML = `
//       <section>
//          <h2>Add New Device</h2>
//          <form id="deviceForm">
//             <!-- form fields here -->
//             <button type="submit">Save Device</button>
//          </form>
//       </section>
//    `;
//    const deviceForm = document.getElementById("deviceForm");

//    deviceForm.addEventListener("submit", function (e) {
//       e.preventDefault();
//       const newDevice = {
//          brand: deviceForm.brand.value,
//          model: deviceForm.model.value,
//          ram: deviceForm.ram.value,
//          storage: deviceForm.storage.value,
//          color: deviceForm.color.value,
//          grade: deviceForm.grade.value,
//          imei: deviceForm.imei.value,
//          serialNumber: deviceForm.serialNumber.value,
//          purchaseDate: deviceForm.purchaseDate.value,
//          status: deviceForm.status.value,
//          notes: deviceForm.notes.value,
//       };
//       saveDevice(newDevice);
//       loadHome();
//    });
// }

// async function loadViewDevices() {
//    app.innerHTML = `
//       <section>
//          <h2>All Devices</h2>
//          <table id="deviceTable">
//             <thead>
//                <tr>
//                   <th>No.</th>
//                   <th>Brand</th>
//                   <th>Model</th>
//                   <th>IMEI</th>
//                   <th>RAM (GB)</th>
//                   <th>Storage (GB)</th>
//                   <th>Color</th>
//                   <th>Grade</th>
//                   <th>Status</th>
//                   <th>Melded</th>
//                   <th>Purchase Date</th>
//                </tr>
//             </thead>
//             <tbody id="deviceTableBody"></tbody>
//          </table>
//       </section>
//    `;
//    const deviceTableBody = document.getElementById("deviceTableBody");

//    try {
//       const response = await getDevices(); // Fetch JSON data
//       const devicesByBrand = response.devicesByBrand; // Extract devicesByBrand from the response
//       const devices = [];

//       // Flatten the devicesByBrand object into a single list
//       for (const brand in devicesByBrand) {
//          if (devicesByBrand.hasOwnProperty(brand)) {
//             devicesByBrand[brand].forEach((device) => {
//                devices.push({ brand, ...device });
//             });
//          }
//       }

//       // Sort devices: prioritize Apple and Samsung first
//       devices.sort((a, b) => {
//          const priority = ["Apple", "Samsung"];
//          const aPriority = priority.indexOf(a.brand);
//          const bPriority = priority.indexOf(b.brand);

//          // If both brands are in the priority list, sort them accordingly
//          if (aPriority > -1 && bPriority > -1) {
//             return aPriority - bPriority;
//          }
//          // Place priority brands (Apple, Samsung) first
//          if (aPriority > -1) {
//             return -1; // a is a priority brand, so it should come first
//          }
//          if (bPriority > -1) {
//             return 1; // b is a priority brand, so it should come first
//          }
//          // If neither are priority brands, maintain original order
//          return 0;
//       });

//       // Create and append rows to the table
//       devices.forEach((device, index) => {
//          const row = document.createElement("tr");
//          row.innerHTML = `
//             <td>${index + 1}</td>
//             <td>${device.brand}</td>
//             <td>${device.model}</td>
//             <td>${device.imei}</td>
//             <td>${device.ram}</td>
//             <td>${device.storage}</td>
//             <td>${device.color}</td>
//             <td>${device.grade}</td>
//             <td>${device.status}</td>
//             <td>${device.melding ? "Yes" : "No"}</td>
//             <td>${new Date(device.purchaseDate).toLocaleDateString()}</td>
//          `;
//          deviceTableBody.appendChild(row);
//       });
//    } catch (error) {
//       console.error("Error fetching devices:", error);
//       deviceTableBody.innerHTML =
//          "<tr><td colspan='11'>Failed to load devices.</td></tr>";
//    }
// }

// async function saveDevice(device) {
//    try {
//       const response = await fetch("http://localhost:3000/api/v1/devices", {
//          method: "POST",
//          headers: {
//             "Content-Type": "application/json",
//          },
//          body: JSON.stringify(device),
//       });
//       if (!response.ok) {
//          throw new Error("Network response was not ok.");
//       }
//       await response.json();
//    } catch (error) {
//       console.error("Error saving device:", error);
//    }
// }
