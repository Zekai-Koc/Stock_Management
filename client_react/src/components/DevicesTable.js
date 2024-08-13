import React from "react";

const DevicesTable = ({ devices }) => {
   return (
      <table id="devicesTable">
         <thead>
            <tr>
               <th>Brand</th>
               <th>Model</th>
               <th>RAM</th>
               <th>Storage</th>
               <th>Color</th>
               <th>Grade</th>
               <th>Purchase Date</th>
               <th>Status</th>
               <th>IMEI</th>
               <th>Melding</th>
            </tr>
         </thead>
         <tbody>
            {devices.map((device) => (
               <tr key={device.imei}>
                  <td>{device.brand}</td>
                  <td>{device.model}</td>
                  <td>{device.ram} GB</td>
                  <td>{device.storage} GB</td>
                  <td>{device.color}</td>
                  <td>{device.grade}</td>
                  <td>{new Date(device.purchaseDate).toLocaleDateString()}</td>
                  <td>{device.status}</td>
                  <td>{device.imei}</td>
                  <td>{device.melding ? "Yes" : "No"}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default DevicesTable;
