import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [activeButton, setActiveButton] = useState(location.pathname);
   const [isManagementOpen, setIsManagementOpen] = useState(false); // State to manage the visibility of the Management submenu

   useEffect(() => {
      setActiveButton(location.pathname);
   }, [location.pathname]);

   const handleNavigation = (path) => {
      setActiveButton(path);
      navigate(path);
   };

   const toggleManagementMenu = () => {
      setIsManagementOpen(!isManagementOpen); // Toggle the Management submenu visibility
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
               id="viewDevicesBtn"
               className={activeButton === "/view-devices" ? "active" : ""}
               onClick={() => handleNavigation("/view-devices")}
            >
               All Devices
            </button>

            <button
               id="updateDeviceStatusBtn"
               className={
                  activeButton === "/update-device-status" ? "active" : ""
               }
               onClick={() => handleNavigation("/update-device-status")}
            >
               Update Device(s) Status
            </button>

            <button
               id="addDeviceBtn"
               className={activeButton === "/add-device" ? "active" : ""}
               onClick={() => handleNavigation("/add-device")}
            >
               Add Device(s)
            </button>

            {/* Management Section */}
            <button
               id="managementBtn"
               className="management-btn"
               onClick={toggleManagementMenu}
               disabled
            >
               Management{" "}
               <span className="arrow">{isManagementOpen ? "▲" : "▼"}</span>
            </button>
            <div
               className={`management-submenu ${
                  isManagementOpen ? "open" : ""
               }`}
            >
               <button
                  id="brandManagementBtn"
                  className={activeButton === "/manage-brands" ? "active" : ""}
                  onClick={() => handleNavigation("/manage-brands")}
               >
                  Manage Brands
               </button>
               <button
                  id="catalogManagementBtn"
                  className={
                     activeButton === "/manage-catalogs" ? "active" : ""
                  }
                  onClick={() => handleNavigation("/manage-catalogs")}
               >
                  Manage Catalogs
               </button>
               <button
                  id="colorManagementBtn"
                  className={activeButton === "/manage-colors" ? "active" : ""}
                  onClick={() => handleNavigation("/manage-colors")}
               >
                  Manage Colors
               </button>
            </div>

            {/* Spacer */}
            <div style={{ marginTop: "100px" }}></div>

            <button
               id="importDevicesBtn"
               className={activeButton === "/import" ? "active" : ""}
               onClick={() => handleNavigation("/import")}
            >
               Import From Excel
            </button>
         </nav>
      </aside>
   );
};

export default Sidebar;