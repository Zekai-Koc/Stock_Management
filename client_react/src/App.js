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
import DeleteDevice from "./pages/DeleteDevice";
import ViewDevices from "./pages/ViewDevices";
import "./components/Sidebar.css"; // Ensure to import the CSS file

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
                  <Route path="/update-device" element={<UpdateDevice />} />
                  <Route path="/delete-device" element={<DeleteDevice />} />
                  <Route path="/view-devices" element={<ViewDevices />} />
               </Routes>
            </div>
         </div>
      </Router>
   );
}

export default App;
