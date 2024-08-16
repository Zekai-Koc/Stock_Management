import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const DevicesTable = ({ devices }) => {
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
                           // onClick={() => handleEdit(device.imei)}
                           className="edit-button"
                        >
                           <FontAwesomeIcon icon={faEdit} />
                        </button>
                     </td>
                     <td>
                        <button
                           // onClick={() => handleDelete(device.imei)}
                           className="delete-button"
                        >
                           <FontAwesomeIcon icon={faTrash} />
                        </button>
                     </td>
                  </tr>
               ))
            ) : (
               <tr>
                  <td colSpan="10">No devices found.</td>
               </tr>
            )}
         </tbody>
      </table>
   );
};

export default DevicesTable;
