import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import config from "../utils/config";

const Home = () => {
   const [deviceStats, setDeviceStats] = useState();
   const [totalCostForCatalog, setTotalCostForCatalog] = useState(null);
   const catalog = "dcx1";

   useEffect(() => {
      console.log("useEffect triggered"); // Log to check if useEffect is triggered

      const fetchStatsData = async () => {
         try {
            console.log("Fetching device stats"); // Log to check if this function is called

            const statsResponse = await fetch(`${config.apiUrl}/devices/stats`);
            if (!statsResponse.ok) {
               throw new Error(`HTTP error! Status: ${statsResponse.status}`);
            }
            const statsData = await statsResponse.json();
            console.log("statsData: ", statsData);
            setDeviceStats(statsData);
         } catch (err) {
            console.error("Error fetching device stats: ", err);
         }
      };

      const fetchCostData = async () => {
         try {
            console.log("Fetching total cost for catalog"); // Log to check if this function is called

            const costResponse = await fetch(
               `${config.apiUrl}/devices/getTotalCostForCatalog?catalog=${catalog}`
            );
            console.log("costResponse status: ", costResponse.status); // Log to check the status

            if (!costResponse.ok) {
               throw new Error(`HTTP error! Status: ${costResponse.status}`);
            }
            const costData = await costResponse.json();
            console.log("costData: ", costData);
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

// import React, { useEffect, useState } from "react";
// import "../styles/Home.css";
// import config from "../utils/config";

// const Home = () => {
//    const [deviceStats, setDeviceStats] = useState();
//    const [totalCostForCatalog, setTotalCostForCatalog] = useState(null);
//    const catalog = "s242";

//    useEffect(() => {
//       const fetchStatsData = async () => {
//          try {
//             const statsResponse = await fetch(`${config.apiUrl}/devices/stats`);
//             if (!statsResponse.ok) {
//                throw new Error(`HTTP error! Status: ${statsResponse.status}`);
//             }
//             const statsData = await statsResponse.json();
//             console.log("statsData: ", statsData);
//             setDeviceStats(statsData);
//          } catch (err) {
//             console.error("Error fetching data: ", err);
//          }
//       };

//       fetchStatsData();
//    }, []);

//    useEffect(() => {
//       const fetchCostData = async () => {
//          try {
//             const costResponse = await fetch(
//                `${config.apiUrl}/devices/getTotalCostForCatalog?catalog=${catalog}`
//             );
//             if (!costResponse.ok) {
//                throw new Error(`HTTP error! Status: ${costResponse.status}`);
//             }
//             const costData = await costResponse.json();
//             console.log("costData: ", costData);
//             setTotalCostForCatalog(costData.totalCost);
//          } catch (err) {
//             console.error("Error fetching data: ", err);
//          }
//       };

//       fetchCostData();
//    }, []);

//    if (!deviceStats) {
//       return <p>Loading...</p>;
//    }

//    const {
//       totalDevices,
//       modelsCount,
//       brandsCount,
//       colorsCount,
//       gradesCount,
//       statusesCount,
//       catalogsCount,
//    } = deviceStats;

//    return (
//       <div className="container">
//          <h1>Device Statistics</h1>

//          <table>
//             <thead>
//                <tr>
//                   <th>Statistic</th>
//                   <th>Value</th>
//                </tr>
//             </thead>
//             <tbody>
//                <tr>
//                   <td>Total Devices</td>
//                   <td>{totalDevices}</td>
//                </tr>
//                <tr>
//                   <td>Total Cost</td>
//                   <td>{deviceStats.totalCost}</td>
//                </tr>
//                {totalCostForCatalog !== null && (
//                   <tr>
//                      <td>Total Cost for Catalog ({catalog})</td>
//                      <td>{totalCostForCatalog}</td>
//                   </tr>
//                )}
//             </tbody>
//          </table>

//          <h2>Device Counts by Brand</h2>
//          <table>
//             <thead>
//                <tr>
//                   <th>Brand</th>
//                   <th>Count</th>
//                </tr>
//             </thead>
//             <tbody>
//                {brandsCount.map((item, index) => (
//                   <tr key={index}>
//                      <td>{item.brand}</td>
//                      <td>{item.count}</td>
//                   </tr>
//                ))}
//             </tbody>
//          </table>

//          <h2>Device Counts by Grade</h2>
//          <table>
//             <thead>
//                <tr>
//                   <th>Grade</th>
//                   <th>Count</th>
//                </tr>
//             </thead>
//             <tbody>
//                {gradesCount.map((item, index) => (
//                   <tr key={index}>
//                      <td>{item.grade}</td>
//                      <td>{item.count}</td>
//                   </tr>
//                ))}
//             </tbody>
//          </table>

//          <h2>Device Counts by Status</h2>
//          <table>
//             <thead>
//                <tr>
//                   <th>Status</th>
//                   <th>Count</th>
//                </tr>
//             </thead>
//             <tbody>
//                {statusesCount.map((item, index) => (
//                   <tr key={index}>
//                      <td>{item.status}</td>
//                      <td>{item.count}</td>
//                   </tr>
//                ))}
//             </tbody>
//          </table>

//          <h2>Device Counts by Catalog</h2>
//          <table>
//             <thead>
//                <tr>
//                   <th>Catalog</th>
//                   <th>Count</th>
//                </tr>
//             </thead>
//             <tbody>
//                {catalogsCount.map((item, index) => (
//                   <tr key={index}>
//                      <td>{item.catalog}</td>
//                      <td>{item.count}</td>
//                   </tr>
//                ))}
//             </tbody>
//          </table>

//          <h2>Device Counts by Model</h2>
//          <table>
//             <thead>
//                <tr>
//                   <th>Model</th>
//                   <th>Count</th>
//                </tr>
//             </thead>
//             <tbody>
//                {modelsCount.map((item, index) => (
//                   <tr key={index}>
//                      <td>{item.model}</td>
//                      <td>{item.count}</td>
//                   </tr>
//                ))}
//             </tbody>
//          </table>

//          <h2>Device Counts by Color</h2>
//          <table>
//             <thead>
//                <tr>
//                   <th>Color</th>
//                   <th>Count</th>
//                </tr>
//             </thead>
//             <tbody>
//                {colorsCount.map((item, index) => (
//                   <tr key={index}>
//                      <td>{item.color}</td>
//                      <td>{item.count}</td>
//                   </tr>
//                ))}
//             </tbody>
//          </table>
//       </div>
//    );
// };

// export default Home;

// // import React, { useEffect, useState } from "react";
// // import "../styles/Home.css";
// // import config from "../utils/config";

// // const Home = () => {
// //    const [deviceStats, setDeviceStats] = useState();

// //    useEffect(() => {
// //       const fetchStatsData = async () => {
// //          try {
// //             const response = await fetch(`${config.apiUrl}/devices/stats`);
// //             if (!response.ok) {
// //                throw new Error(`HTTP error! Status: ${response.status}`);
// //             }
// //             const data = await response.json();
// //             console.log("stats: incoming stats:", data);
// //             setDeviceStats(data);
// //          } catch (err) {
// //             console.error("Error fetching data: ", err);
// //          }
// //       };

// //       fetchStatsData();
// //    }, []);

// //    if (!deviceStats) {
// //       return <p>Loading...</p>;
// //    }

// //    const {
// //       totalDevices,
// //       modelsCount,
// //       brandsCount,
// //       colorsCount,
// //       gradesCount,
// //       statusesCount,
// //       catalogsCount,
// //       totalCost,
// //    } = deviceStats;

// //    return (
// //       <div className="container">
// //          <h1>Device Statistics</h1>

// //          <table>
// //             <thead>
// //                <tr>
// //                   <th>Statistic</th>
// //                   <th>Value</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //                <tr>
// //                   <td>Total Devices</td>
// //                   <td>{totalDevices}</td>
// //                </tr>
// //                <tr>
// //                   <td>Total Cost</td>
// //                   <td>{totalCost}</td>
// //                </tr>
// //             </tbody>
// //          </table>

// //          <h2>Device Counts by Brand</h2>
// //          <table>
// //             <thead>
// //                <tr>
// //                   <th>Brand</th>
// //                   <th>Count</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //                {brandsCount.map((item, index) => (
// //                   <tr key={index}>
// //                      <td>{item.brand}</td>
// //                      <td>{item.count}</td>
// //                   </tr>
// //                ))}
// //             </tbody>
// //          </table>

// //          <h2>Device Counts by Grade</h2>
// //          <table>
// //             <thead>
// //                <tr>
// //                   <th>Grade</th>
// //                   <th>Count</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //                {gradesCount.map((item, index) => (
// //                   <tr key={index}>
// //                      <td>{item.grade}</td>
// //                      <td>{item.count}</td>
// //                   </tr>
// //                ))}
// //             </tbody>
// //          </table>

// //          <h2>Device Counts by Status</h2>
// //          <table>
// //             <thead>
// //                <tr>
// //                   <th>Status</th>
// //                   <th>Count</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //                {statusesCount.map((item, index) => (
// //                   <tr key={index}>
// //                      <td>{item.status}</td>
// //                      <td>{item.count}</td>
// //                   </tr>
// //                ))}
// //             </tbody>
// //          </table>

// //          <h2>Device Counts by Catalog</h2>
// //          <table>
// //             <thead>
// //                <tr>
// //                   <th>Catalog</th>
// //                   <th>Count</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //                {catalogsCount.map((item, index) => (
// //                   <tr key={index}>
// //                      <td>{item.catalog}</td>
// //                      <td>{item.count}</td>
// //                   </tr>
// //                ))}
// //             </tbody>
// //          </table>

// //          <h2>Device Counts by Model</h2>
// //          <table>
// //             <thead>
// //                <tr>
// //                   <th>Model</th>
// //                   <th>Count</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //                {modelsCount.map((item, index) => (
// //                   <tr key={index}>
// //                      <td>{item.model}</td>
// //                      <td>{item.count}</td>
// //                   </tr>
// //                ))}
// //             </tbody>
// //          </table>

// //          <h2>Device Counts by Color</h2>
// //          <table>
// //             <thead>
// //                <tr>
// //                   <th>Color</th>
// //                   <th>Count</th>
// //                </tr>
// //             </thead>
// //             <tbody>
// //                {colorsCount.map((item, index) => (
// //                   <tr key={index}>
// //                      <td>{item.color}</td>
// //                      <td>{item.count}</td>
// //                   </tr>
// //                ))}
// //             </tbody>
// //          </table>
// //       </div>
// //    );
// // };

// // export default Home;

// // // import React, { useEffect, useState } from "react";
// // // // import PieChart from "../components/PieChart.js";
// // // // import BarChart from "../components/BarChart.js";
// // // // import LineChart from "../components/LineChart.js";
// // // // import {
// // // //    devicesByBrand,
// // // //    devicesByModel,
// // // //    devicesByGrade,
// // // //    devicesByStatus,
// // // //    devicesByColor,
// // // // } from "../utils/getStatsData.js";
// // // import "../styles/Home.css";
// // // import config from "../utils/config";

// // // const Home = () => {
// // //    // const [brandData, setBrandData] = useState([]);
// // //    // const [modelData, setModelData] = useState([]);
// // //    // const [gradeData, setGradeData] = useState([]);
// // //    // const [statusData, setStatusData] = useState([]);
// // //    // const [colorData, setColorData] = useState([]);
// // //    // const [totalDevices, setTotalDevices] = useState(0);
// // //    const [deviceStats, setDeviceStats] = useState();

// // //    // useEffect(() => {
// // //    //    // // Fetch data for brand, model, and grade
// // //    //    // const fetchStatsData = async () => {
// // //    //    //    const brandResponse = await devicesByBrand();
// // //    //    //    // console.log(brandResponse)
// // //    //    //    // console.log(brandResponse.totalDevices)
// // //    //    //    setBrandData(brandResponse.devicesByBrand);
// // //    //    //    setTotalDevices(brandResponse.totalDevices);
// // //    //    //    const modelResponse = await devicesByModel();
// // //    //    //    setModelData(modelResponse.devicesByModel);
// // //    //    //    const gradeResponse = await devicesByGrade();
// // //    //    //    setGradeData(gradeResponse.devicesByGrade);
// // //    //    //    const statusResponse = await devicesByStatus();
// // //    //    //    setStatusData(statusResponse.devicesByStatus);
// // //    //    //    // console.log(statusResponse)
// // //    //    //    const colorResponse = await devicesByColor();
// // //    //    //    setColorData(colorResponse.devicesByColor);
// // //    //    // };
// // //    //    // fetchStatsData();
// // //    // }, []);

// // //    useEffect(() => {
// // //       const fetchStatsData = async () => {
// // //          try {
// // //             const response = await fetch(`${config.apiUrl}/devices/stats`);
// // //             if (!response.ok) {
// // //                throw new Error(`HTTP error! Status: ${response.status}`);
// // //             }
// // //             const data = await response.json();
// // //             console.log("stats: incoming stats:", data);
// // //             setDeviceStats(data);
// // //          } catch (err) {
// // //             console.error("Error fetching data: ", err);
// // //          }
// // //       };

// // //       fetchStatsData();
// // //    }, []);

// // //    if (!deviceStats) {
// // //       return <p>Loading...</p>;
// // //    }

// // //    const {
// // //       totalDevices,
// // //       modelsCount,
// // //       brandsCount,
// // //       colorsCount,
// // //       gradesCount,
// // //       statusesCount,
// // //       catalogsCount,
// // //       totalCost,
// // //    } = deviceStats;

// // //    return (
// // //       <div>
// // //          <h1>Device Statistics</h1>

// // //          <table border="1" style={{ width: "100%", textAlign: "left" }}>
// // //             <thead>
// // //                <tr>
// // //                   <th>Statistic</th>
// // //                   <th>Value</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                <tr>
// // //                   <td>Total Devices</td>
// // //                   <td>{totalDevices}</td>
// // //                </tr>
// // //                <tr>
// // //                   <td>Total Cost</td>
// // //                   <td>{totalCost}</td>
// // //                </tr>
// // //             </tbody>
// // //          </table>

// // //          <h2>Device Counts by Brand</h2>
// // //          <table border="1" style={{ width: "100%", textAlign: "left" }}>
// // //             <thead>
// // //                <tr>
// // //                   <th>Brand</th>
// // //                   <th>Count</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                {brandsCount.map((item, index) => (
// // //                   <tr key={index}>
// // //                      <td>{item.brand}</td>
// // //                      <td>{item.count}</td>
// // //                   </tr>
// // //                ))}
// // //             </tbody>
// // //          </table>

// // //          <h2>Device Counts by Grade</h2>
// // //          <table border="1" style={{ width: "100%", textAlign: "left" }}>
// // //             <thead>
// // //                <tr>
// // //                   <th>Grade</th>
// // //                   <th>Count</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                {gradesCount.map((item, index) => (
// // //                   <tr key={index}>
// // //                      <td>{item.grade}</td>
// // //                      <td>{item.count}</td>
// // //                   </tr>
// // //                ))}
// // //             </tbody>
// // //          </table>

// // //          <h2>Device Counts by Status</h2>
// // //          <table border="1" style={{ width: "100%", textAlign: "left" }}>
// // //             <thead>
// // //                <tr>
// // //                   <th>Status</th>
// // //                   <th>Count</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                {statusesCount.map((item, index) => (
// // //                   <tr key={index}>
// // //                      <td>{item.status}</td>
// // //                      <td>{item.count}</td>
// // //                   </tr>
// // //                ))}
// // //             </tbody>
// // //          </table>

// // //          <h2>Device Counts by Catalog</h2>
// // //          <table border="1" style={{ width: "100%", textAlign: "left" }}>
// // //             <thead>
// // //                <tr>
// // //                   <th>Catalog</th>
// // //                   <th>Count</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                {catalogsCount.map((item, index) => (
// // //                   <tr key={index}>
// // //                      <td>{item.catalog}</td>
// // //                      <td>{item.count}</td>
// // //                   </tr>
// // //                ))}
// // //             </tbody>
// // //          </table>

// // //          <h2>Device Counts by Model</h2>
// // //          <table border="1" style={{ width: "100%", textAlign: "left" }}>
// // //             <thead>
// // //                <tr>
// // //                   <th>Model</th>
// // //                   <th>Count</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                {modelsCount.map((item, index) => (
// // //                   <tr key={index}>
// // //                      <td>{item.model}</td>
// // //                      <td>{item.count}</td>
// // //                   </tr>
// // //                ))}
// // //             </tbody>
// // //          </table>

// // //          <h2>Device Counts by Color</h2>
// // //          <table border="1" style={{ width: "100%", textAlign: "left" }}>
// // //             <thead>
// // //                <tr>
// // //                   <th>Color</th>
// // //                   <th>Count</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                {colorsCount.map((item, index) => (
// // //                   <tr key={index}>
// // //                      <td>{item.color}</td>
// // //                      <td>{item.count}</td>
// // //                   </tr>
// // //                ))}
// // //             </tbody>
// // //          </table>
// // //       </div>
// // //    );
// // // };

// // // export default Home;

// // //    return (
// // //       <div className="device-statistics-container">
// // //          <h2>Device Statistics </h2>
// // //          <div>
// // //             <label>Total Device Number: {totalDevices} </label>
// // //          </div>

// // //          <table className="status-table">
// // //             <thead>
// // //                <tr>
// // //                   <th>Status</th>
// // //                   <th>Count</th>
// // //                </tr>
// // //             </thead>
// // //             <tbody>
// // //                {statusData.map((status, index) => (
// // //                   <tr key={index}>
// // //                      <td>{status.statusName}</td>
// // //                      <td>{status.count}</td>
// // //                   </tr>
// // //                ))}
// // //             </tbody>
// // //          </table>

// // //          <div className="chart-container">
// // //             <PieChart
// // //                title="Devices by Brand"
// // //                data={brandData}
// // //                labelKey="brandName"
// // //                valueKey="count"
// // //             />
// // //             <BarChart
// // //                title="Devices by Brand"
// // //                data={brandData}
// // //                labelKey="brandName"
// // //                valueKey="count"
// // //             />
// // //          </div>
// // //          <div className="chart-container">
// // //             <PieChart
// // //                title="Devices by Grade"
// // //                data={gradeData}
// // //                labelKey="gradeName"
// // //                valueKey="count"
// // //             />
// // //             <BarChart
// // //                title="Devices by Grade"
// // //                data={gradeData}
// // //                labelKey="gradeName"
// // //                valueKey="count"
// // //             />
// // //          </div>

// // //          <div className="chart-container">
// // //             <BarChart
// // //                title="Devices by Status"
// // //                data={statusData}
// // //                labelKey="statusName"
// // //                valueKey="count"
// // //             />
// // //             <PieChart
// // //                title="Devices by Status"
// // //                data={statusData}
// // //                labelKey="statusName"
// // //                valueKey="count"
// // //             />
// // //          </div>

// // //          <div className="chart-container">
// // //             <BarChart
// // //                title="Devices by Model"
// // //                data={modelData}
// // //                labelKey="modelName"
// // //                valueKey="count"
// // //             />
// // //             <PieChart
// // //                title="Devices by Model"
// // //                data={modelData}
// // //                labelKey="modelName"
// // //                valueKey="count"
// // //             />
// // //          </div>

// // //          <div className="chart-container">
// // //             <LineChart
// // //                title="Devices by Color"
// // //                data={colorData}
// // //                labelKey="colorName"
// // //                valueKey="count"
// // //             />
// // //             <LineChart
// // //                title="Devices by Model"
// // //                data={modelData}
// // //                labelKey="modelName"
// // //                valueKey="count"
// // //             />
// // //          </div>
// // //       </div>
// // //    );
// // // };

// // // export default Home;
