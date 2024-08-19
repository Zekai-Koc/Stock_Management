import React, { useEffect, useState } from "react";
import PieChart from "../components/PieChart.js";
import BarChart from "../components/BarChart.js";
import LineChart from "../components/LineChart.js";
import {
   devicesByBrand,
   devicesByModel,
   devicesByGrade,
   devicesByStatus,
   devicesByColor,
} from "../utils/getStatsData.js";
import "./Home.css";

const Home = () => {
   const [brandData, setBrandData] = useState([]);
   const [modelData, setModelData] = useState([]);
   const [gradeData, setGradeData] = useState([]);
   const [statusData, setStatusData] = useState([]);
   const [colorData, setColorData] = useState([]);
   const [totalDevices, setTotalDevices] = useState(0)

   useEffect(() => {
      // Fetch data for brand, model, and grade
      const fetchData = async () => {
         const brandResponse = await devicesByBrand();
         console.log(brandResponse)
         console.log(brandResponse.totalDevices)
         setBrandData(brandResponse.devicesByBrand);
         setTotalDevices(brandResponse.totalDevices)

         const modelResponse = await devicesByModel();
         setModelData(modelResponse.devicesByModel);

         const gradeResponse = await devicesByGrade();
         setGradeData(gradeResponse.devicesByGrade);

         const statusResponse = await devicesByStatus();
         setStatusData(statusResponse.devicesByStatus);
         console.log(statusResponse)


         const colorResponse = await devicesByColor();
         setColorData(colorResponse.devicesByColor);
      };

      fetchData();
   }, []);

   return (
      <div className="device-statistics-container">
         <h2>Device Statistics </h2>
         <div>
            <label>Total Device Number: {totalDevices} </label>
         </div>

         <table className="status-table">
            <thead>
               <tr>
                  <th>Status</th>
                  <th>Count</th>
               </tr>
            </thead>
            <tbody>
               {statusData.map((status, index) => (
                  <tr key={index}>
                     <td>{status.statusName}</td>
                     <td>{status.count}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <div className="chart-container">
            <PieChart
               title="Devices by Brand"
               data={brandData}
               labelKey="brandName"
               valueKey="count"
            />
            <BarChart
               title="Devices by Brand"
               data={brandData}
               labelKey="brandName"
               valueKey="count"
            />
         </div>
         <div className="chart-container">
            <PieChart
               title="Devices by Grade"
               data={gradeData}
               labelKey="gradeName"
               valueKey="count"
            />
            <BarChart
               title="Devices by Grade"
               data={gradeData}
               labelKey="gradeName"
               valueKey="count"
            />
         </div>

         <div className="chart-container">
            <BarChart
               title="Devices by Status"
               data={statusData}
               labelKey="statusName"
               valueKey="count"
            />
            <PieChart
               title="Devices by Status"
               data={statusData}
               labelKey="statusName"
               valueKey="count"
            />
         </div>

         <div className="chart-container">
            <BarChart
               title="Devices by Model"
               data={modelData}
               labelKey="modelName"
               valueKey="count"
            />
            <PieChart
               title="Devices by Model"
               data={modelData}
               labelKey="modelName"
               valueKey="count"
            />
         </div>

         <div className="chart-container">
            <LineChart
               title="Devices by Color"
               data={colorData}
               labelKey="colorName"
               valueKey="count"
            />
            <LineChart
               title="Devices by Model"
               data={modelData}
               labelKey="modelName"
               valueKey="count"
            />
         </div>
      </div>
   );
};

export default Home;
