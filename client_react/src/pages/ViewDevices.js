import React, { useEffect, useState } from "react";
import "./ViewDevices.css";

const ViewDevices = () => {
   const [devices, setDevices] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               "http://192.168.178.185:7000/api/v1/devices"
            );
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setDevices(data.devicesByBrand);
            setLoading(false);
         } catch (err) {
            setError(err);
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;

   return (
      <div>
         <h1>View Devices</h1>
         {Object.keys(devices).length === 0 ? (
            <p>No devices found.</p>
         ) : (
            <div>
               {Object.entries(devices).map(([brand, devicesList]) => (
                  <div key={brand}>
                     <h2>{brand}</h2>
                     <table>
                        <thead>
                           <tr>
                              <th>IMEI</th>
                              <th>Model</th>
                              <th>RAM</th>
                              <th>Storage</th>
                              <th>Color</th>
                              <th>Grade</th>
                              <th>Status</th>
                              <th>Melding</th>
                              <th>Catalog</th>
                              <th>Purchase Date</th>
                           </tr>
                        </thead>
                        <tbody>
                           {devicesList.map((device) => (
                              <tr key={device.imei}>
                                 <td>{device.imei}</td>
                                 <td>{device.model}</td>
                                 <td>{device.ram} GB</td>
                                 <td>{device.storage} GB</td>
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
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default ViewDevices;
