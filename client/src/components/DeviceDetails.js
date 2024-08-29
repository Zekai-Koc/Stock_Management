import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../utils/config";
import styles from "../styles/DeviceDetails.module.css"; // Import CSS module

const DeviceDetail = () => {
   const { id } = useParams();

   // console.log("id in device details: ", id);
   // console.log("useParams(): ", useParams());

   const [device, setDevice] = useState(null);
   const [logs, setLogs] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchDeviceDetails = async () => {
         try {
            const response = await fetch(`${config.apiUrl}/devices/${id}`);
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
   }, [id]);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;

   // Calculate total cost
   const totalCost = logs.reduce(
      (acc, log) => acc + (parseFloat(log.cost) || 0),
      0
   );

   return (
      <div className={styles.deviceDetailContainer}>
         <h1 className={styles.deviceDetailHeader}>Device Details</h1>
         {device ? (
            <div className={styles.deviceDetail}>
               <div className={styles.deviceInfoTop}>
                  <h2>{device.model}</h2>
                  <p>
                     <strong>IMEI:</strong>
                     <span className={styles.deviceDetailValue}>
                        {device.imei}
                     </span>
                  </p>
               </div>

               <hr />

               <div className={styles.deviceInfoGrid}>
                  <div className={styles.deviceInfoColumn}>
                     <p>
                        <strong>RAM:</strong>
                        <span className={styles.deviceDetailValue}>
                           {device.ram} GB
                        </span>
                     </p>
                     <p>
                        <strong>Storage:</strong>
                        <span className={styles.deviceDetailValue}>
                           {device.storage} GB
                        </span>
                     </p>
                     <p>
                        <strong>Color:</strong>
                        <span className={styles.deviceDetailValue}>
                           {device.color}
                        </span>
                     </p>
                     <p>
                        <strong>Grade:</strong>
                        <span className={styles.deviceDetailValue}>
                           {device.grade}
                        </span>
                     </p>
                     <p>
                        <strong>Melding:</strong>
                        <span className={styles.deviceDetailValue}>
                           {device.melding ? "Yes" : "No"}
                        </span>
                     </p>
                  </div>
                  <div className={styles.deviceInfoColumn}>
                     <p>
                        <strong>Status:</strong>
                        <span className={styles.deviceDetailValue}>
                           {device.status}
                        </span>
                     </p>
                     <p>
                        <strong>Catalog:</strong>
                        <span className={styles.deviceDetailValue}>
                           {device.catalog}
                        </span>
                     </p>
                     <p>
                        <strong>Purchase Date:</strong>
                        <span className={styles.deviceDetailValue}>
                           {new Date(device.purchaseDate).toLocaleDateString()}
                        </span>
                     </p>
                     <p>
                        <strong>Notes:</strong>
                        <span className={styles.deviceDetailNotes}>
                           {device.notes || "No notes available."}
                        </span>
                     </p>
                  </div>
               </div>
               <hr />

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
                        <tr>
                           <td colSpan="2" className={styles.totalCostLabel}>
                              Total Cost:
                           </td>
                           <td className={styles.totalCostValue}>
                              {totalCost ? `$${totalCost.toFixed(2)}` : "N/A"}
                           </td>
                        </tr>
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