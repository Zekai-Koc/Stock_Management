import React from "react";
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import AddDevice from "./pages/AddDevice";
import UpdateDeviceStatus from "./pages/UpdateDeviceStatus";
import UpdateDevice from "./pages/UpdateDevice";
import ViewDevices from "./pages/ViewDevices";
import ManageBrands from "./pages/ManageBrands"; // New component
import ManageCatalogs from "./pages/ManageCatalogs"; // New component
import ManageColors from "./pages/ManageColors"; // New component
import ImportDevicesFromExcel from "./pages/ImportDevicesFromExcel";
import DeviceDetails from "./components/DeviceDetails";
import "./components/Sidebar.css";

function App() {
   return (
      <Router>
         <div className="app-container">
            <Sidebar />
            <div className="main-content">
               <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/add-device" element={<AddDevice />} />
                  <Route
                     path="/update-device-status"
                     element={<UpdateDeviceStatus />}
                  />
                  <Route
                     path="/update-device/:imei"
                     element={<UpdateDevice />}
                  />
                  <Route path="/view-devices" element={<ViewDevices />} />
                  <Route
                     path="/device-details/:imei"
                     element={<DeviceDetails />}
                  />

                  {/* New Routes */}
                  <Route path="/manage-brands" element={<ManageBrands />} />
                  <Route path="/manage-catalogs" element={<ManageCatalogs />} />
                  <Route path="/manage-colors" element={<ManageColors />} />
                  <Route path="/import" element={<ImportDevicesFromExcel />} />
               </Routes>
            </div>
         </div>
      </Router>
   );
}

export default App;
