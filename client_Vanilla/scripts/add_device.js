document.addEventListener("DOMContentLoaded", async function () {
   try {
      const response = await fetch(
         "http://localhost:3000/api/v1/selectoptions"
      );
      const data = await response.json();

      console.log("Data fetched:", data);

      populateSelect("brand", data.brands);
      populateSelect("ram", data.rams, "size");
      populateSelect("storage", data.storages, "capacity");
      populateSelect("color", data.colors);
      populateSelect("grade", data.grades);
      populateSelect("status", data.statuses);
      populateSelect("catalog", data.catalog, "catalog_number");

      // Dynamically populate models based on selected brand
      const brandSelect = document.getElementById("brand");
      // const modelSelect = document.getElementById("model");

      brandSelect.addEventListener("change", function () {
         const selectedBrandId = parseInt(this.value);
         console.log("Selected Brand ID:", selectedBrandId);

         const filteredModels = data.models.filter(
            (model) => model.brandId === selectedBrandId
         );
         console.log("Filtered Models:", filteredModels);

         populateSelect("model", filteredModels);
      });
   } catch (error) {
      console.error("Error fetching select options:", error);
   }
});

function populateSelect(selectId, items, textProperty = "name") {
   const select = document.getElementById(selectId);
   select.innerHTML = ""; // Clear existing options

   items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item[textProperty];
      select.appendChild(option);
   });

   // Add a default "Select" option
   const defaultOption = document.createElement("option");
   defaultOption.value = "";
   defaultOption.textContent = "Select an option";
   defaultOption.selected = true;
   defaultOption.disabled = true;
   select.insertBefore(defaultOption, select.firstChild);

   // select.selectedIndex = 0;
}

// Set the purchase date to today's date by default
document.getElementById("purchaseDate").value = new Date()
   .toISOString()
   .slice(0, 10);

// Function to refocus on the IMEI input
function refocusIMEI() {
   document.getElementById("imei").focus();
}

// Add event listeners to all form elements to refocus IMEI input after change
const formElements = document.querySelectorAll(
   '#deviceForm select, #deviceForm input[type="date"], #deviceForm input[type="checkbox"]'
);
formElements.forEach((element) => {
   element.addEventListener("change", refocusIMEI);
   element.addEventListener("blur", refocusIMEI);
});

// Refocus IMEI input on page load
refocusIMEI();

// // Add device to the table when IMEI is fully entered
// document.getElementById("imei").addEventListener("input", function (event) {
//    const imeiLength = 15; // IMEI numbers are 15 digits long

//    // Check if the IMEI length matches the required length
//    if (event.target.value.length === imeiLength) {
//       event.preventDefault(); // Prevent default action

//       if (!validateIMEI(event.target.value)) {
//          throw new Error(
//             "IMEI must be a valid 15-digit number with a valid checksum"
//          );
//       }

//       // Get values from the form
//       const brandId = document.getElementById("brand").value;
//       const modelId = document.getElementById("model").value;
//       const ramId = document.getElementById("ram").value;
//       const storageId = document.getElementById("storage").value;
//       const colorId = document.getElementById("color").value;
//       const gradeId = document.getElementById("grade").value;
//       const imei = document.getElementById("imei").value;
//       const purchaseDate = document.getElementById("purchaseDate").value;
//       const statusId = document.getElementById("status").value;
//       const catalogId = document.getElementById("catalog").value;
//       const melding = document.getElementById("melding").checked ? "Yes" : "No";

//       const device = {
//          brandId,
//          modelId,
//          ramId,
//          storageId,
//          colorId,
//          gradeId,
//          imei,
//          purchaseDate,
//          catalogId,
//          statusId,
//          melding,
//       };

//       sendDevice(device);

//       // Create a new row for the table
//       const table = document
//          .getElementById("devicesTable")
//          .querySelector("tbody");
//       const newRow = document.createElement("tr");

//       // Add data to the new row
//       newRow.innerHTML = `
//            <td>${brand}</td>
//            <td>${model}</td>
//            <td>${ram}</td>
//            <td>${storage}</td>
//            <td>${color}</td>
//            <td>${grade}</td>
//            <td>${purchaseDate}</td>
//            <td>${status}</td>
//            <td>${imei}</td>
//            <td>${melding}</td>
//            <td><button type="button" class="delete-btn">Delete</button></td>
//        `;

//       // Append the new row to the table
//       table.appendChild(newRow);

//       // Clear the IMEI field and reset the melding checkbox for the next scan/input
//       document.getElementById("imei").value = "";
//       document.getElementById("melding").checked = false;

//       // Refocus on the IMEI input field
//       refocusIMEI();
//    }
// });

document.getElementById("imei").addEventListener("input", function (event) {
   const imeiLength = 15; // IMEI numbers are 15 digits long

   if (event.target.value.length === imeiLength) {
      event.preventDefault(); // Prevent default action

      console.log("IMEI entered:", event.target.value);

      const validation = validateIMEI(event.target.value);

      if (!validation.isValid) {
         // Show an alert to the user
         alert(validation.errorMessage);

         // Clear the IMEI field
         event.target.value = "";

         // Refocus on the IMEI input field
         refocusIMEI();

         return; // Stop further processing
      }

      // Get values from the form
      const brandId = document.getElementById("brand").value;
      const modelId = document.getElementById("model").value;
      const ramId = document.getElementById("ram").value;
      const storageId = document.getElementById("storage").value;
      const colorId = document.getElementById("color").value;
      const gradeId = document.getElementById("grade").value;
      const imei = document.getElementById("imei").value;
      const purchaseDate = document.getElementById("purchaseDate").value;
      const statusId = document.getElementById("status").value;
      const catalogId = document.getElementById("catalog").value;
      const melding = document.getElementById("melding").checked ? "Yes" : "No";

      const device = {
         brandId,
         modelId,
         ramId,
         storageId,
         colorId,
         gradeId,
         imei,
         purchaseDate,
         catalogId,
         statusId,
         melding,
      };

      sendDevice(device);

      // Create a new row for the table
      const table = document
         .getElementById("devicesTable")
         .querySelector("tbody");
      const newRow = document.createElement("tr");

      // Add data to the new row
      newRow.innerHTML = `
           <td>${brand}</td>
           <td>${model}</td>
           <td>${ram}</td>
           <td>${storage}</td>
           <td>${color}</td>
           <td>${grade}</td>
           <td>${purchaseDate}</td>
           <td>${status}</td>
           <td>${imei}</td>
           <td>${melding}</td>
           <td><button type="button" class="delete-btn">Delete</button></td>
       `;

      // Append the new row to the table
      table.appendChild(newRow);

      // Clear the IMEI field and reset the melding checkbox for the next scan/input
      document.getElementById("imei").value = "";
      document.getElementById("melding").checked = false;

      // Refocus on the IMEI input field
      refocusIMEI();
   }
});

// Handle table row deletion
document
   .getElementById("devicesTable")
   .addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("delete-btn")) {
         // Remove the row containing the clicked delete button
         const row = event.target.closest("tr");
         row.remove();
      }
   });

const sendDevice = async (device) => {
   console.log("Sending device:", device);
   // Post the data using fetch
   fetch("http://localhost:3000/api/v1/devices", {
      // Change this URL to your actual API endpoint
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(device),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log("Success:", data);
         // Optionally, handle success (e.g., display a message to the user)
      })
      .catch((error) => {
         console.error("Error:", error);
         // Optionally, handle error (e.g., display an error message to the user)
      });
};

// valid IMEI number: 356766086875164
// valid IMEI number: 353067102354511

const validateIMEI = (imei) => {
   const isValidLength = /^\d{15}$/.test(imei);

   const isValidChecksum = (number) => {
      let sum = 0;
      let shouldDouble = false;
      for (let i = number.length - 1; i >= 0; i--) {
         let digit = parseInt(number.charAt(i), 10);
         if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
         }
         sum += digit;
         shouldDouble = !shouldDouble;
      }
      return sum % 10 === 0;
   };

   const isValid = isValidLength && isValidChecksum(imei);
   return {
      isValid,
      errorMessage: isValid
         ? ""
         : "IMEI must be a valid 15-digit number with a valid checksum.",
   };
};
