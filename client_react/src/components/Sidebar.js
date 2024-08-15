import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
   const navigate = useNavigate();
   const location = useLocation(); // Get the current location
   const [activeButton, setActiveButton] = useState(location.pathname); // Set the initial active button based on the current path

   const handleNavigation = (path) => {
      setActiveButton(path); // Update the active button state
      navigate(path); // Navigate to the selected path
   };

   return (
      <aside id="sidebar">
         <h2>MMT Stock Manager</h2>
         <nav>
            <button
               id="homeBtn"
               className={activeButton === "/home" ? "active" : ""}
               onClick={() => handleNavigation("/home")}
            >
               Home (stats)
            </button>
            <button
               id="addDeviceBtn"
               className={activeButton === "/add-device" ? "active" : ""}
               onClick={() => handleNavigation("/add-device")}
            >
               Add Device(s)
            </button>
            <button
               id="updateDeviceStatusBtn"
               className={
                  activeButton === "/update-device-status" ? "active" : ""
               }
               onClick={() => handleNavigation("/update-device-status")}
            >
               Update Device Status
            </button>
            {/* <button
               id="updateDeviceBtn"
               className={activeButton === "/update-device" ? "active" : ""}
               onClick={() => handleNavigation("/update-device")}
            >
               Update Device
            </button> */}
            {/* <button
               id="deleteDeviceBtn"
               className={activeButton === "/delete-device" ? "active" : ""}
               onClick={() => handleNavigation("/delete-device")}
            >
               Delete Device
            </button> */}
            <button
               id="viewDevicesBtn"
               className={activeButton === "/view-devices" ? "active" : ""}
               onClick={() => handleNavigation("/view-devices")}
            >
               View Devices
            </button>
         </nav>
      </aside>
   );
};

export default Sidebar;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./Sidebar.css"; // Assuming you have a CSS file for styles

// const Sidebar = () => {
//    const navigate = useNavigate(); // useNavigate hook for navigation

//    return (
//       <aside id="sidebar">
//          <h2>MMT Stock Manager</h2>
//          <nav>
//             <button id="homeBtn" onClick={() => navigate("/home")}>
//                Home (stats)
//             </button>
//             <button id="addDeviceBtn" onClick={() => navigate("/add-device")}>
//                Add Device(s)
//             </button>
//             <button
//                id="updateDeviceStatusBtn"
//                onClick={() => navigate("/update-device-status")}
//             >
//                Update Device Status
//             </button>
//             <button
//                id="updateDeviceBtn"
//                onClick={() => navigate("/update-device")}
//             >
//                Update Device
//             </button>
//             <button
//                id="deleteDeviceBtn"
//                onClick={() => navigate("/delete-device")}
//             >
//                Delete Device
//             </button>
//             <button
//                id="viewDevicesBtn"
//                onClick={() => navigate("/view-devices")}
//             >
//                View Devices
//             </button>
//          </nav>
//       </aside>
//    );
// };

// export default Sidebar;
