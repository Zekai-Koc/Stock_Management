document.addEventListener("DOMContentLoaded", function () {
   const app = document.getElementById("app");
   const homeBtn = document.getElementById("homeBtn");
   const addDeviceBtn = document.getElementById("addDeviceBtn");
   const viewDevicesBtn = document.getElementById("viewDevicesBtn");

   // Load initial view (Dashboard)
   loadHome();

   homeBtn.addEventListener("click", loadHome);
   addDeviceBtn.addEventListener("click", loadAddDevice);
   viewDevicesBtn.addEventListener("click", loadViewDevices);

   function loadHome() {
      app.innerHTML = `
            <section>
                <h2>Dashboard</h2>
                <div class="summary">
                    <div>Total Devices: <span id="totalDevices">0</span></div>
                    <div>In Stock: <span id="inStock">0</span></div>
                    <div>Sold: <span id="sold">0</span></div>
                    <div>Pending: <span id="pending">0</span></div>
                </div>
            </section>
        `;
      updateSummary();
   }

   function loadAddDevice() {
      app.innerHTML = `
            <section>
                <h2>Add New Device</h2>
                <form id="deviceForm">
                    <label for="brand">Brand:</label>
                    <input type="text" id="brand" name="brand" required>
                    
                    <label for="model">Model:</label>
                    <input type="text" id="model" name="model" required>
                    
                    <label for="ram">RAM:</label>
                    <input type="text" id="ram" name="ram" required>
                    
                    <label for="storage">Storage Capacity:</label>
                    <input type="text" id="storage" name="storage" required>
                    
                    <label for="color">Color:</label>
                    <input type="text" id="color" name="color" required>
                    
                    <label for="grade">Grade:</label>
                    <input type="text" id="grade" name="grade" required>
                    
                    <label for="imei">IMEI:</label>
                    <input type="text" id="imei" name="imei" required>
                    
                    <label for="serialNumber">Serial Number:</label>
                    <input type="text" id="serialNumber" name="serialNumber" required>
                    
                    <label for="purchaseDate">Purchase Date:</label>
                    <input type="date" id="purchaseDate" name="purchaseDate" required>
                    
                    <label for="status">Status:</label>
                    <input type="text" id="status" name="status" required>
                    
                    <label for="notes">Notes:</label>
                    <textarea id="notes" name="notes"></textarea>
                    
                    <button type="submit">Save Device</button>
                </form>
            </section>
        `;
      const deviceForm = document.getElementById("deviceForm");

      deviceForm.addEventListener("submit", function (e) {
         e.preventDefault();
         const newDevice = {
            brand: deviceForm.brand.value,
            model: deviceForm.model.value,
            ram: deviceForm.ram.value,
            storage: deviceForm.storage.value,
            color: deviceForm.color.value,
            grade: deviceForm.grade.value,
            imei: deviceForm.imei.value,
            serialNumber: deviceForm.serialNumber.value,
            purchaseDate: deviceForm.purchaseDate.value,
            status: deviceForm.status.value,
            notes: deviceForm.notes.value,
         };
         saveDevice(newDevice);
         loadHome();
      });
   }

   async function loadViewDevices() {
      app.innerHTML = `
            <section>
                <h2>All Devices</h2>
                <div id="deviceList"></div>
            </section>
        `;
      const deviceList = document.getElementById("deviceList");
      try {
         const devices = await getDevices();
         devices.forEach((device) => {
            const deviceCard = document.createElement("div");
            deviceCard.className = "deviceCard";
            deviceCard.innerHTML = `
                    <strong>${device.brand} ${device.model}</strong><br>
                    IMEI: ${device.imei}<br>
                    Status: ${device.status}
                `;
            deviceList.appendChild(deviceCard);
         });
      } catch (error) {
         console.error("Error fetching devices:", error);
         deviceList.innerHTML = "Failed to load devices.";
      }
   }

   async function saveDevice(device) {
      try {
         const response = await fetch("http://localhost:3000/api/v1/devices", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(device),
         });
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         await response.json();
      } catch (error) {
         console.error("Error saving device:", error);
      }
   }

   async function getDevices() {
      try {
         const response = await fetch("http://localhost:3000/api/v1/devices");
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         return await response.json();
      } catch (error) {
         console.error("Error fetching devices:", error);
         return []; // Return an empty array in case of error
      }
   }

   async function updateSummary() {
      try {
         const result = await getDevices();
         console.log(result);

         const devices = result.devices;
         const totalDevices = result.count;
         document.getElementById("totalDevices").textContent = totalDevices;

         console.log(devices);

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
