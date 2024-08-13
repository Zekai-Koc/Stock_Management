import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css"; // Assuming you have a CSS file for styles

const Sidebar = () => {
   const navigate = useNavigate(); // useNavigate hook for navigation

   return (
      <aside id="sidebar">
         <h2>MMT Stock Manager</h2>
         <nav>
            <button id="homeBtn" onClick={() => navigate("/home")}>
               Home (stats)
            </button>
            <button id="addDeviceBtn" onClick={() => navigate("/add-device")}>
               Add Device(s)
            </button>
            <button
               id="updateDeviceStatusBtn"
               onClick={() => navigate("/update-device-status")}
            >
               Update Device Status
            </button>
            <button
               id="updateDeviceBtn"
               onClick={() => navigate("/update-device")}
            >
               Update Device
            </button>
            <button
               id="deleteDeviceBtn"
               onClick={() => navigate("/delete-device")}
            >
               Delete Device
            </button>
            <button
               id="viewDevicesBtn"
               onClick={() => navigate("/view-devices")}
            >
               View Devices
            </button>
         </nav>
      </aside>
   );
};

export default Sidebar;
