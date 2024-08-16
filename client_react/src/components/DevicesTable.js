import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


const DevicesTable = ({ devices, setDevices }) => {
   const navigate = useNavigate(); // For navigation
   const [error, setError] = useState(null);

      // Function to handle deletion of a device with confirmation
      const handleDelete = async (imei) => {
         const confirmDelete = window.confirm(
            "Are you sure you want to delete this device?"
         );
         if (confirmDelete) {
            try {
               const response = await fetch(
                  `http://localhost:7000/api/v1/devices/${imei}`,
                  {
                     method: "DELETE",
                  }
               );
               if (!response.ok) {
                  throw new Error(`Failed to delete device with IMEI: ${imei}`);
               }
               // Remove the device from the local state after successful deletion
               // setDevices((prevDevices) => {
               //    const updatedDevices = { ...prevDevices };
               //    Object.keys(updatedDevices).forEach((brand) => {
               //       updatedDevices[brand] = updatedDevices[brand].filter(
               //          (device) => device.imei !== imei
               //       );
               //    });
               //    return updatedDevices;
               // });
               setDevices((prevDevices) => prevDevices.filter(device => device.imei !== imei));

            } catch (err) {
               setError(err);
            }
         }
      };
   
      const handleEdit = (imei) => {
         navigate(`/update-device/${imei}`); // Navigate to the update page
      };


   return (
      <table id="devicesTable">
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
               devices.map((device) => (
                  <tr key={device.imei}>
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
                        {new Date(device.purchaseDate).toLocaleDateString()}
                     </td>
                     <td>
                        <button
                           onClick={() => handleEdit(device.imei)}
                           className="edit-button"
                        >
                           <FontAwesomeIcon icon={faEdit} />
                        </button>
                     </td>
                     <td>
                        <button
                           onClick={() => handleDelete(device.imei)}
                           className="delete-button"
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
   );
};

export default DevicesTable;
