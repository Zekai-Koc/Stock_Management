import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import config from "../utils/config";
import styles from "../styles/UpdateDeviceStatus.module.css"; // Import the CSS module
import { statusOptions, defaultState } from "../utils/states"; // Import the states

const UpdateDeviceStatus = () => {
   const [imei, setIMEI] = useState(defaultState.imei);
   const [status, setStatus] = useState(defaultState.status);
   const [cost, setCost] = useState(defaultState.cost);
   const [devices, setDevices] = useState(defaultState.devices);
   const navigate = useNavigate(); // For navigation
   const [error, setError] = useState(null);

   const imeiInputRef = useRef(null);

   useEffect(() => {
      imeiInputRef.current.focus();
   }, []);

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "imei") {
         if (!/^\d*$/.test(value)) {
            alert("IMEI must contain only numeric characters.");
            return;
         }
         setIMEI(value);
      } else if (name === "status") {
         setStatus(parseInt(value));  // Set status to the selected option ID
      } else if (name === "cost") {
         if (!/^[-]?\d*\.?\d*$/.test(value)) {
            alert("Cost must be a valid number.");
            return;
         }
         setCost(value);
      }
   };
   
   // const handleChange = (e) => {
   //    const { name, value } = e.target;
   //    if (name === "imei") {
   //       if (!/^\d*$/.test(value)) {
   //          alert("IMEI must contain only numeric characters.");
   //          return;
   //       }
   //       setIMEI(value);
   //    } else if (name === "status") {
   //       const selectedStatus = statusOptions.find(
   //          (option) => option.id === parseInt(value)
   //       );
   //       if (selectedStatus) {
   //          setStatus(selectedStatus.name);
   //       }
   //    } else if (name === "cost") {
   //       if (!/^[-]?\d*\.?\d*$/.test(value)) {
   //          alert("Cost must be a valid number.");
   //          return;
   //       }
   //       setCost(value);
   //    }
   // };

   const handleUpdateStatus = async () => {
      if (!imei) {
         alert("Invalid IMEI. Please enter a valid IMEI number.");
         return;
      }

      if (!status) {
         alert("Please select a status.");
         return;
      }

      const parsedCost = cost ? parseFloat(cost) : 0;

      try {
         const response = await fetch(
            `${config.apiUrl}/devices/updatedevicestatus/${imei}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ status, cost: parsedCost }),
            }
         );

         if (response.ok) {
            const updatedDevice = await response.json();
            // console.log("Device status updated:", updatedDevice);

            // Reset form fields
            setIMEI(defaultState.imei);
            // setCost(defaultState.cost);
            document.querySelector('input[name="imei"]').focus();

            // Update devices list
            setDevices((prevDevices) => [...prevDevices, updatedDevice]);
         } else {
            const errorMessage = await response.text();
            console.error("Failed to update device status:", errorMessage);
            alert(`Failed to update device status: ${errorMessage}`);
         }
      } catch (err) {
         console.error("Failed to update device status:", err);
      }
   };

   const handleDelete = async (imei) => {
      const confirmDelete = window.confirm(
         "Are you sure you want to delete this device?"
      );
      if (confirmDelete) {
         try {
            const response = await fetch(`${config.apiUrl}/devices/${imei}`, {
               method: "DELETE",
            });
            if (!response.ok) {
               throw new Error(`Failed to delete device with IMEI: ${imei}`);
            }

            setDevices((prevDevices) =>
               prevDevices.filter((device) => device.imei !== imei)
            );
         } catch (err) {
            setError(err);
         }
      }
   };

   const handleEdit = (imei) => {
      navigate(`/update-device/${imei}`);
   };

   return (
      <div className={styles["update-device-status-container"]}>
         <h1 className={styles["update-device-status-title"]}>Update Device Status</h1>

         <div className={styles["update-device-status-three-elements"]}>
            <label className={styles["update-device-status-label"]}>
               IMEI:
               <input
                  type="text"
                  name="imei"
                  value={imei}
                  onChange={handleChange}
                  className={styles["update-device-status-input"]}
                  ref={imeiInputRef}
               />
            </label>

            <label className={styles["update-device-status-label"]}>
   Status:
   <select
      name="status"
      value={status}
      onChange={handleChange}
      className={styles["update-device-status-select"]}
   >
      <option value="">Select Status</option>
      {statusOptions.map((statusItem) => (
         <option key={statusItem.id} value={statusItem.id}>
            {statusItem.name}
         </option>
      ))}
   </select>
</label>

            {/* <label className={styles["update-device-status-label"]}>
               Status:
               <select
                  name="status"
                  value={status}
                  onChange={handleChange}
                  className={styles["update-device-status-select"]}
               >
                  <option value="">Select Status</option>
                  {statusOptions.map((statusItem) => (
                     <option key={statusItem.id} value={statusItem.id}>
                        {statusItem.name}
                     </option>
                  ))}
               </select>
            </label> */}

            <label className={styles["update-device-status-label"]}>
               Cost:
               <input
                  type="text"
                  name="cost"
                  value={cost}
                  onChange={handleChange}
                  placeholder="Enter cost"
                  className={styles["update-device-status-input"]}
               />
            </label>
         </div>
         <button onClick={handleUpdateStatus} className={styles["update-device-status-button"]}>
            Update
         </button>

         <section>
            <h2 className={styles["update-device-status-section-title-table"]}>
               Updated Devices
            </h2>
            <table id="devicesTable" className={styles["update-device-status-table"]}>
               <thead>
                  <tr>
                     <th>IMEI</th>
                     <th>Brand</th>
                     <th>Model</th>
                     <th>RAM</th>
                     <th>Storage</th>
                     <th>Color</th>
                     <th>Grade</th>
                     <th>Status</th>
                     <th>Melding</th>
                     <th>Catalog</th>
                     <th>Purchase Date</th>
                     <th>Edit</th>
                     <th>Delete</th>
                  </tr>
               </thead>
               <tbody>
                  {devices.length > 0 ? (
                     devices.map((device, index) => (
                        <tr key={index} className={styles["update-device-status-table-row"]}>
                           <td>{device.imei}</td>
                           <td>{device.brand}</td>
                           <td>{device.model}</td>
                           <td>{device.ram}</td>
                           <td>{device.storage}</td>
                           <td>{device.color}</td>
                           <td>{device.grade}</td>
                           <td>{device.status}</td>
                           <td>{device.melding ? "Yes" : "No"}</td>
                           <td>{device.catalog}</td>
                           <td>
                              {new Date(
                                 device.purchaseDate
                              ).toLocaleDateString()}
                           </td>
                           <td>
                              <button
                                 onClick={() => handleEdit(device.imei)}
                                 className={styles["update-device-status-edit-button"]}
                              >
                                 <FontAwesomeIcon icon={faEdit} />
                              </button>
                           </td>
                           <td>
                              <button
                                 onClick={() => handleDelete(device.imei)}
                                 className={styles["update-device-status-delete-button"]}
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </button>
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="13">No devices found.</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </section>
      </div>
   );
};

export default UpdateDeviceStatus;














// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import config from "../utils/config";
// import styles from "../styles/UpdateDeviceStatus.module.css"; // Import the CSS module
// import { statusOptions, defaultState } from "../utils/states"; // Import the states

// const UpdateDeviceStatus = () => {
//    const [imei, setIMEI] = useState(defaultState.imei);
//    const [status, setStatus] = useState(defaultState.status);
//    const [cost, setCost] = useState(defaultState.cost);
//    const [devices, setDevices] = useState(defaultState.devices);
//    const navigate = useNavigate(); // For navigation
//    const [error, setError] = useState(null);

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       if (name === "imei") {
//          if (!/^\d*$/.test(value)) {
//             alert("IMEI must contain only numeric characters.");
//             return;
//          }
//          setIMEI(value);
//       } else if (name === "status") {
//          const selectedStatus = statusOptions.find(
//             (option) => option.id === parseInt(value)
//          );
//          if (selectedStatus) {
//             setStatus(selectedStatus.name);
//          }
//       } else if (name === "cost") {
//          if (!/^[-]?\d*\.?\d*$/.test(value)) {
//             alert("Cost must be a valid number.");
//             return;
//          }
//          setCost(value);
//       }
//    };

//    const handleUpdateStatus = async () => {
//       if (!imei) {
//          alert("Invalid IMEI. Please enter a valid IMEI number.");
//          return;
//       }

//       if (!status) {
//          alert("Please select a status.");
//          return;
//       }

//       const parsedCost = cost ? parseFloat(cost) : 0;

//       try {
//          const response = await fetch(
//             `${config.apiUrl}/devices/updatedevicestatus/${imei}`,
//             {
//                method: "PATCH",
//                headers: {
//                   "Content-Type": "application/json",
//                },
//                body: JSON.stringify({ status, cost: parsedCost }),
//             }
//          );

//          if (response.ok) {
//             const updatedDevice = await response.json();
//             // console.log("Device status updated:", updatedDevice);

//             // Reset form fields
//             setIMEI(defaultState.imei);
//             setCost(defaultState.cost);
//             document.querySelector('input[name="imei"]').focus();

//             // Update devices list
//             setDevices((prevDevices) => [...prevDevices, updatedDevice]);
//          } else {
//             const errorMessage = await response.text();
//             console.error("Failed to update device status:", errorMessage);
//             alert(`Failed to update device status: ${errorMessage}`);
//          }
//       } catch (err) {
//          console.error("Failed to update device status:", err);
//       }
//    };

//    const handleDelete = async (imei) => {
//       const confirmDelete = window.confirm(
//          "Are you sure you want to delete this device?"
//       );
//       if (confirmDelete) {
//          try {
//             const response = await fetch(`${config.apiUrl}/devices/${imei}`, {
//                method: "DELETE",
//             });
//             if (!response.ok) {
//                throw new Error(`Failed to delete device with IMEI: ${imei}`);
//             }

//             setDevices((prevDevices) =>
//                prevDevices.filter((device) => device.imei !== imei)
//             );
//          } catch (err) {
//             setError(err);
//          }
//       }
//    };

//    const handleEdit = (imei) => {
//       navigate(`/update-device/${imei}`);
//    };

//    return (
//       <div className={styles.container}>
//          <h1>Update Device Status</h1>

//          <div className={styles["three-elements"]}>
//             <label>
//                IMEI:
//                <input
//                   type="text"
//                   name="imei"
//                   value={imei}
//                   onChange={handleChange}
//                />
//             </label>

//             <label>
//                Status:
//                <select name="status" value={status} onChange={handleChange}>
//                   <option value="">Select Status</option>
//                   {statusOptions.map((statusItem) => (
//                      <option key={statusItem.id} value={statusItem.id}>
//                         {statusItem.name}
//                      </option>
//                   ))}
//                </select>
//             </label>

//             <label>
//                Cost:
//                <input
//                   type="text"
//                   name="cost"
//                   value={cost}
//                   onChange={handleChange}
//                   placeholder="Enter cost"
//                />
//             </label>
//          </div>
//          <button onClick={handleUpdateStatus}>Update</button>

//          <section>
//             <h2 className={styles["section-title-table"]}>Updated Devices</h2>
//             <table id="devicesTable">
//                <thead>
//                   <tr>
//                      <th>IMEI</th>
//                      <th>Brand</th>
//                      <th>Model</th>
//                      <th>RAM</th>
//                      <th>Storage</th>
//                      <th>Color</th>
//                      <th>Grade</th>
//                      <th>Status</th>
//                      <th>Melding</th>
//                      <th>Catalog</th>
//                      <th>Purchase Date</th>
//                      <th>Edit</th>
//                      <th>Delete</th>
//                   </tr>
//                </thead>
//                <tbody>
//                   {devices.length > 0 ? (
//                      devices.map((device, index) => (
//                         <tr key={index}>
//                            <td>{device.imei}</td>
//                            <td>{device.brand}</td>
//                            <td>{device.model}</td>
//                            <td>{device.ram}</td>
//                            <td>{device.storage}</td>
//                            <td>{device.color}</td>
//                            <td>{device.grade}</td>
//                            <td>{device.status}</td>
//                            <td>{device.melding ? "Yes" : "No"}</td>
//                            <td>{device.catalog}</td>
//                            <td>
//                               {new Date(
//                                  device.purchaseDate
//                               ).toLocaleDateString()}
//                            </td>
//                            <td>
//                               <button
//                                  onClick={() => handleEdit(device.imei)}
//                                  className="edit-button"
//                               >
//                                  <FontAwesomeIcon icon={faEdit} />
//                               </button>
//                            </td>
//                            <td>
//                               <button
//                                  onClick={() => handleDelete(device.imei)}
//                                  className="delete-button"
//                               >
//                                  <FontAwesomeIcon icon={faTrash} />
//                               </button>
//                            </td>
//                         </tr>
//                      ))
//                   ) : (
//                      <tr>
//                         <td colSpan="13">No devices found.</td>
//                      </tr>
//                   )}
//                </tbody>
//             </table>
//          </section>
//       </div>
//    );
// };

// export default UpdateDeviceStatus;