document.addEventListener("DOMContentLoaded", function () {
   const app = document.getElementById("app");

   async function loadViewDevices() {
      app.innerHTML = `
         <section>
            <h2>All Devices</h2>
            <table id="deviceTable">
               <thead>
                  <tr>
                     <th>No.</th> 
                     <th>IMEI</th>
                     <th>Catalog</th>
                     <th>Brand</th>
                     <th>Model</th>
                     <th>RAM (GB)</th>
                     <th>Storage (GB)</th>
                     <th>Color</th>
                     <th>Grade</th>
                     <th>Status</th>
                     <th>Melded</th>
                     <th>Purchase Date</th>
                  </tr>
               </thead>
               <tbody id="deviceTableBody"></tbody>
            </table>
         </section>
      `;
      const deviceTableBody = document.getElementById("deviceTableBody");

      try {
         const response = await getDevices(); // Fetch JSON data
         console.log("Response:", response); // Log the response to the console
         const devicesByBrand = response.devicesByBrand || {}; // Default to empty object if not defined
         const devices = [];

         // Flatten the devicesByBrand object into a single list
         for (const brand in devicesByBrand) {
            if (devicesByBrand.hasOwnProperty(brand)) {
               devicesByBrand[brand].forEach((device) => {
                  devices.push({ brand, ...device });
               });
            }
         }

         // Sort devices: prioritize Apple and Samsung first
         devices.sort((a, b) => {
            const priority = ["Apple", "Samsung"];
            const aPriority = priority.indexOf(a.brand);
            const bPriority = priority.indexOf(b.brand);

            // If both brands are in the priority list, sort them accordingly
            if (aPriority > -1 && bPriority > -1) {
               return aPriority - bPriority;
            }
            // Place priority brands (Apple, Samsung) first
            if (aPriority > -1) {
               return -1; // a is a priority brand, so it should come first
            }
            if (bPriority > -1) {
               return 1; // b is a priority brand, so it should come first
            }
            // If neither are priority brands, maintain original order
            return 0;
         });

         // Create and append rows to the table
         devices.forEach((device, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
               <td>${index + 1}</td>
               <td>${device.imei}</td>
               <td>${device.catalog}</td>
               <td>${device.brand}</td>
               <td>${device.model}</td>
               <td>${device.ram}</td>
               <td>${device.storage}</td>
               <td>${device.color}</td>
               <td>${device.grade}</td>
               <td>${device.status}</td>
               <td>${device.melding ? "Yes" : "No"}</td>
               <td>${new Date(device.purchaseDate).toLocaleDateString()}</td>
            `;
            deviceTableBody.appendChild(row);
         });
      } catch (error) {
         console.error("Error fetching devices:", error);
         deviceTableBody.innerHTML =
            "<tr><td colspan='11'>Failed to load devices.</td></tr>";
      }
   }

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

   loadViewDevices();
});

// document.addEventListener("DOMContentLoaded", function () {
//    const app = document.getElementById("app");
//    const homeBtn = document.getElementById("homeBtn");
//    const addDeviceBtn = document.getElementById("addDeviceBtn");
//    const viewDevicesBtn = document.getElementById("viewDevicesBtn");

//    async function loadViewDevices() {
//       app.innerHTML = `
//          <section>
//             <h2>All Devices</h2>
//             <table id="deviceTable">
//                <thead>
//                   <tr>
//                      <th>No.</th>
//                      <th>Brand</th>
//                      <th>Model</th>
//                      <th>IMEI</th>
//                      <th>RAM (GB)</th>
//                      <th>Storage (GB)</th>
//                      <th>Color</th>
//                      <th>Grade</th>
//                      <th>Status</th>
//                      <th>Melded</th>
//                      <th>Purchase Date</th>
//                   </tr>
//                </thead>
//                <tbody id="deviceTableBody"></tbody>
//             </table>
//          </section>
//       `;
//       const deviceTableBody = document.getElementById("deviceTableBody");

//       try {
//          const response = await getDevices(); // Fetch JSON data
//          console.log(response); // Log the response to the console
//          const devicesByBrand = response.devicesByBrand; // Extract devicesByBrand from the response
//          const devices = [];

//          // Flatten the devicesByBrand object into a single list
//          for (const brand in devicesByBrand) {
//             if (devicesByBrand.hasOwnProperty(brand)) {
//                devicesByBrand[brand].forEach((device) => {
//                   devices.push({ brand, ...device });
//                });
//             }
//          }

//          // Sort devices: prioritize Apple and Samsung first
//          devices.sort((a, b) => {
//             const priority = ["Apple", "Samsung"];
//             const aPriority = priority.indexOf(a.brand);
//             const bPriority = priority.indexOf(b.brand);

//             // If both brands are in the priority list, sort them accordingly
//             if (aPriority > -1 && bPriority > -1) {
//                return aPriority - bPriority;
//             }
//             // Place priority brands (Apple, Samsung) first
//             if (aPriority > -1) {
//                return -1; // a is a priority brand, so it should come first
//             }
//             if (bPriority > -1) {
//                return 1; // b is a priority brand, so it should come first
//             }
//             // If neither are priority brands, maintain original order
//             return 0;
//          });

//          // Create and append rows to the table
//          devices.forEach((device, index) => {
//             const row = document.createElement("tr");
//             row.innerHTML = `
//                <td>${index + 1}</td>
//                <td>${device.brand}</td>
//                <td>${device.model}</td>
//                <td>${device.imei}</td>
//                <td>${device.ram}</td>
//                <td>${device.storage}</td>
//                <td>${device.color}</td>
//                <td>${device.grade}</td>
//                <td>${device.status}</td>
//                <td>${device.melding ? "Yes" : "No"}</td>
//                <td>${new Date(device.purchaseDate).toLocaleDateString()}</td>
//             `;
//             deviceTableBody.appendChild(row);
//          });
//       } catch (error) {
//          console.error("Error fetching devices:", error);
//          deviceTableBody.innerHTML =
//             "<tr><td colspan='11'>Failed to load devices.</td></tr>";
//       }
//    }

//    async function getDevices() {
//       try {
//          const response = await fetch("http://localhost:3000/api/v1/devices");
//          if (!response.ok) {
//             throw new Error("Network response was not ok.");
//          }
//          const result = await response.json();
//          return result;
//       } catch (error) {
//          console.error("Error fetching devices:", error);
//          return { devicesByBrand: {} }; // Return a default empty object if error occurs
//       }
//    }

//    loadViewDevices();
// });
