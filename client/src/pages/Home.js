import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import config from "../utils/config";

const Home = () => {
   const [deviceStats, setDeviceStats] = useState();
   const [totalCostForCatalog, setTotalCostForCatalog] = useState(null);
   const catalog = "dcx1";

   useEffect(() => {
      // console.log("useEffect triggered"); // Log to check if useEffect is triggered

      const fetchStatsData = async () => {
         try {
            // console.log("Fetching device stats"); // Log to check if this function is called

            const statsResponse = await fetch(`${config.apiUrl}/devices/stats`);
            if (!statsResponse.ok) {
               throw new Error(`HTTP error! Status: ${statsResponse.status}`);
            }
            const statsData = await statsResponse.json();
            // console.log("statsData: ", statsData);
            setDeviceStats(statsData);
         } catch (err) {
            console.error("Error fetching device stats: ", err);
         }
      };

      const fetchCostData = async () => {
         try {
            // console.log("Fetching total cost for catalog"); // Log to check if this function is called

            const costResponse = await fetch(
               `${config.apiUrl}/devices/getTotalCostForCatalog?catalog=${catalog}`
            );
            // console.log("costResponse status: ", costResponse.status); // Log to check the status

            if (!costResponse.ok) {
               throw new Error(`HTTP error! Status: ${costResponse.status}`);
            }
            const costData = await costResponse.json();
            // console.log("costData: ", costData);
            setTotalCostForCatalog(costData.totalCost);
         } catch (err) {
            console.error("Error fetching cost data: ", err);
         }
      };

      fetchStatsData();
      fetchCostData(); // Ensure fetchCostData is being called
   }, []); // Empty array ensures this runs once when the component mounts

   if (!deviceStats) {
      return <p>Loading...</p>;
   }

   const {
      totalDevices,
      modelsCount,
      brandsCount,
      colorsCount,
      gradesCount,
      statusesCount,
      catalogsCount,
   } = deviceStats;

   return (
      <div className="container">
         <h1>Device Statistics</h1>

         <table>
            <thead>
               <tr>
                  <th>Statistic</th>
                  <th>Value</th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td>Total Devices</td>
                  <td>{totalDevices}</td>
               </tr>
               <tr>
                  <td>Total Cost</td>
                  <td>{deviceStats.totalCost}</td>
               </tr>
               {totalCostForCatalog !== null && (
                  <tr>
                     <td>Total Cost for Catalog ({catalog})</td>
                     <td>{totalCostForCatalog}</td>
                  </tr>
               )}
            </tbody>
         </table>

         <h2>Device Counts by Brand</h2>
         <table>
            <thead>
               <tr>
                  <th>Brand</th>
                  <th>Count</th>
               </tr>
            </thead>
            <tbody>
               {brandsCount.map((item, index) => (
                  <tr key={index}>
                     <td>{item.brand}</td>
                     <td>{item.count}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <h2>Device Counts by Grade</h2>
         <table>
            <thead>
               <tr>
                  <th>Grade</th>
                  <th>Count</th>
               </tr>
            </thead>
            <tbody>
               {gradesCount.map((item, index) => (
                  <tr key={index}>
                     <td>{item.grade}</td>
                     <td>{item.count}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <h2>Device Counts by Status</h2>
         <table>
            <thead>
               <tr>
                  <th>Status</th>
                  <th>Count</th>
               </tr>
            </thead>
            <tbody>
               {statusesCount.map((item, index) => (
                  <tr key={index}>
                     <td>{item.status}</td>
                     <td>{item.count}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <h2>Device Counts by Catalog</h2>
         <table>
            <thead>
               <tr>
                  <th>Catalog</th>
                  <th>Count</th>
               </tr>
            </thead>
            <tbody>
               {catalogsCount.map((item, index) => (
                  <tr key={index}>
                     <td>{item.catalog}</td>
                     <td>{item.count}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <h2>Device Counts by Model</h2>
         <table>
            <thead>
               <tr>
                  <th>Model</th>
                  <th>Count</th>
               </tr>
            </thead>
            <tbody>
               {modelsCount.map((item, index) => (
                  <tr key={index}>
                     <td>{item.model}</td>
                     <td>{item.count}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <h2>Device Counts by Color</h2>
         <table>
            <thead>
               <tr>
                  <th>Color</th>
                  <th>Count</th>
               </tr>
            </thead>
            <tbody>
               {colorsCount.map((item, index) => (
                  <tr key={index}>
                     <td>{item.color}</td>
                     <td>{item.count}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default Home;