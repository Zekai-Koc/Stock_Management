import React, { useEffect, useState } from "react";
import Chart from "../components/Chart.js";
import { getDevices, getStatusStats, getGrades } from "../utils/api";
import "./Home.css";

const Home = () => {
   const [summary, setSummary] = useState({
      totalDevices: 0,
      inStock: 0,
      sold: 0,
      pending: 0,
   });
   const [brandChartData, setBrandChartData] = useState({
      labels: [],
      data: [],
   });
   const [statusChartData, setStatusChartData] = useState({
      labels: [],
      data: [],
   });
   const [gradeChartData, setGradeChartData] = useState({
      labels: [],
      data: [],
   });

   useEffect(() => {
      const fetchData = async () => {
         try {
            // Fetch and update summary
            const statusData = await getStatusStats();
            updateSummary(statusData);

            // Fetch and update charts
            const devicesData = await getDevices();
            updateBrandChart(devicesData);

            const gradesData = await getGrades();
            updateGradeChart(gradesData);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      };

      fetchData();
   }, []);

   const updateSummary = (data) => {
      const devices = data.devices || [];
      setSummary({
         totalDevices: data.count || 0,
         inStock: devices.filter((d) => d.statusId === 1).length,
         sold: devices.filter((d) => d.statusId === 2).length,
         pending: devices.filter((d) => d.statusId === 3).length,
      });
   };

   const updateBrandChart = (data) => {
      const devicesByBrand = data.devicesByBrand || {};
      const brandCounts = {};
      for (const brand in devicesByBrand) {
         brandCounts[brand] = devicesByBrand[brand].length;
      }
      setBrandChartData({
         labels: Object.keys(brandCounts),
         data: Object.values(brandCounts),
      });
   };

   const updateGradeChart = (data) => {
      const labels = data.map((item) => item.gradeName);
      const chartData = data.map((item) => item.count);
      setGradeChartData({ labels, data: chartData });
   };

   return (
      <main id="app">
         <section>
            <h2>Dashboard</h2>
            <div className="summary">
               <div>
                  Total Devices:{" "}
                  <span id="totalDevices">{summary.totalDevices}</span>
               </div>
               <div>
                  In Stock: <span id="inStock">{summary.inStock}</span>
               </div>
               <div>
                  Sold: <span id="sold">{summary.sold}</span>
               </div>
               <div>
                  Pending: <span id="pending">{summary.pending}</span>
               </div>
            </div>
            <div>
               <Chart id="brandChart" type="pie" data={brandChartData} />
            </div>
            <div>
               <Chart id="statusChart" type="bar" data={statusChartData} />
            </div>
            <div>
               <Chart id="gradeChart" type="bar" data={gradeChartData} />
            </div>
         </section>
      </main>
   );
};

export default Home;
