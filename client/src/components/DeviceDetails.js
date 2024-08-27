import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../utils/config";
import styles from "../styles/DeviceDetails.module.css"; // Import CSS module

const DeviceDetail = () => {
   const { imei } = useParams(); // Get IMEI from URL parameters
   const [device, setDevice] = useState(null);
   const [logs, setLogs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchDeviceDetails = async () => {
         try {
            const response = await fetch(`${config.apiUrl}/devices/${imei}`);
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setDevice(data.device);
            setLogs(data.logs);
            setLoading(false);
         } catch (err) {
            setError(err);
            setLoading(false);
         }
      };

      fetchDeviceDetails();
   }, [imei]);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;

   return (
      <div className={styles.deviceDetailContainer}>
         <h1 className={styles.deviceDetailHeader}>Device Details</h1>
         {device ? (
            <div className={styles.deviceDetail}>
               <h2>{device.model}</h2>
               <p>
                  <strong>IMEI:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.imei}
                  </span>
               </p>
               <p>
                  <strong>RAM:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.ram} GB
                  </span>
               </p>
               <p>
                  <strong>Storage:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.storage} GB
                  </span>
               </p>
               <p>
                  <strong>Color:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.color}
                  </span>
               </p>
               <p>
                  <strong>Grade:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.grade}
                  </span>
               </p>
               <p>
                  <strong>Status:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.status}
                  </span>
               </p>
               <p>
                  <strong>Melding:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.melding ? "Yes" : "No"}
                  </span>
               </p>
               <p>
                  <strong>Catalog:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {device.catalog}
                  </span>
               </p>
               <p>
                  <strong>Purchase Date:</strong>
                  <span className={styles.deviceDetailValue}>
                     {" "}
                     {new Date(device.purchaseDate).toLocaleDateString()}
                  </span>
               </p>

               <h3>Logs</h3>
               {logs.length > 0 ? (
                  <table className={styles.logsTable}>
                     <thead>
                        <tr>
                           <th>Status</th>
                           <th>Date</th>
                           <th>Cost</th>
                        </tr>
                     </thead>
                     <tbody>
                        {logs.map((log, index) => (
                           <tr key={index}>
                              <td>{log.status}</td>
                              <td>{new Date(log.date).toLocaleDateString()}</td>
                              <td>
                                 {typeof log.cost === "number"
                                    ? `$${log.cost.toFixed(2)}`
                                    : "N/A"}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               ) : (
                  <p className={styles.noLogs}>
                     No logs available for this device.
                  </p>
               )}
            </div>
         ) : (
            <p>Device not found.</p>
         )}
      </div>
   );
};

export default DeviceDetail;

// // src/components/DeviceDetail.js

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import config from "../utils/config";
// import "../styles/DeviceDetails.css"; // Add styles as needed

// const DeviceDetail = () => {
//    const { imei } = useParams(); // Get IMEI from URL parameters
//    const [device, setDevice] = useState(null);
//    const [logs, setLogs] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);

//    useEffect(() => {
//       const fetchDeviceDetails = async () => {
//          try {
//             const response = await fetch(`${config.apiUrl}/devices/${imei}`);
//             if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             setDevice(data.device);
//             setLogs(data.logs);
//             setLoading(false);
//          } catch (err) {
//             setError(err);
//             setLoading(false);
//          }
//       };

//       fetchDeviceDetails();
//    }, [imei]);

//    if (loading) return <p>Loading...</p>;
//    if (error) return <p>Error: {error.message}</p>;

//    return (
//       <div className="device-detail-container">
//          <h1>Device Details</h1>
//          {device ? (
//             <div className="device-detail">
//                <h2>{device.model}</h2>
//                <p>
//                   <strong>IMEI:</strong> {device.imei}
//                </p>
//                <p>
//                   <strong>RAM:</strong> {device.ram} GB
//                </p>
//                <p>
//                   <strong>Storage:</strong> {device.storage} GB
//                </p>
//                <p>
//                   <strong>Color:</strong> {device.color}
//                </p>
//                <p>
//                   <strong>Grade:</strong> {device.grade}
//                </p>
//                <p>
//                   <strong>Status:</strong> {device.status}
//                </p>
//                <p>
//                   <strong>Melding:</strong> {device.melding ? "Yes" : "No"}
//                </p>
//                <p>
//                   <strong>Catalog:</strong> {device.catalog}
//                </p>
//                <p>
//                   <strong>Purchase Date:</strong>{" "}
//                   {new Date(device.purchaseDate).toLocaleDateString()}
//                </p>

//                <h3>Logs</h3>
//                {logs.length > 0 ? (
//                   <table>
//                      <thead>
//                         <tr>
//                            <th>Status</th>
//                            <th>Date</th>
//                            <th>Cost</th>
//                         </tr>
//                      </thead>
//                      <tbody>
//                         {logs.map((log, index) => (
//                            <tr key={index}>
//                               <td>{log.status}</td>
//                               <td>{new Date(log.date).toLocaleDateString()}</td>
//                               <td>
//                                  {typeof log.cost === "number"
//                                     ? `$${log.cost.toFixed(2)}`
//                                     : "N/A"}
//                               </td>
//                            </tr>
//                         ))}
//                      </tbody>
//                   </table>
//                ) : (
//                   <p>No logs available for this device.</p>
//                )}
//             </div>
//          ) : (
//             <p>Device not found.</p>
//          )}
//       </div>
//    );
// };

// export default DeviceDetail;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import config from "../utils/config";
// import "../styles/DeviceDetails.css";

// const DeviceDetails = () => {
//    const { imei } = useParams(); // Extract IMEI from URL params
//    const [device, setDevice] = useState(null);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);

//    useEffect(() => {
//       const fetchDevice = async () => {
//          try {
//             const response = await fetch(`${config.apiUrl}/devices/${imei}`);
//             if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             setDevice(data);
//             setLoading(false);
//          } catch (err) {
//             setError(err);
//             setLoading(false);
//          }
//       };

//       fetchDevice();
//    }, [imei]);

//    if (loading) return <p>Loading...</p>;
//    if (error) return <p>Error: {error.message}</p>;
//    if (!device) return <p>Device not found.</p>;

//    return (
//       <div className="device-details-container">
//          <h1>Device Details</h1>
//          <div className="device-details">
//             <p>
//                <strong>IMEI:</strong> {device.imei}
//             </p>
//             <p>
//                <strong>Model:</strong> {device.model}
//             </p>
//             <p>
//                <strong>RAM:</strong> {device.ram} GB
//             </p>
//             <p>
//                <strong>Storage:</strong> {device.storage} GB
//             </p>
//             <p>
//                <strong>Color:</strong> {device.color}
//             </p>
//             <p>
//                <strong>Grade:</strong> {device.grade}
//             </p>
//             <p>
//                <strong>Status:</strong> {device.status}
//             </p>
//             <p>
//                <strong>Melding:</strong> {device.melding ? "Yes" : "No"}
//             </p>
//             <p>
//                <strong>Catalog:</strong> {device.catalog}
//             </p>
//             <p>
//                <strong>Purchase Date:</strong>{" "}
//                {new Date(device.purchaseDate).toLocaleDateString()}
//             </p>
//             {/* Add more device details as needed */}
//          </div>
//       </div>
//    );
// };

// export default DeviceDetails;
