import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeviceForm from "../components/DeviceForm";
import config from "../utils/config";

const UpdateDevice = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const [device, setDevice] = useState(null);

   useEffect(() => {
      const fetchDevice = async () => {
         try {
            const response = await fetch(`${config.apiUrl}/devices/${id}`);
            if (!response.ok) {
               throw new Error(`Failed to fetch device with id: ${id}`);
            }
            const deviceData = await response.json();
            // console.log(deviceData);
            // Assuming deviceData.device contains the actual device details
            setDevice(deviceData.device); 
         } catch (err) {
            console.error("Failed to fetch device:", err);
         }
      };
      fetchDevice();
   }, [id]);

   const handleSubmit = async (formData) => {
      try {
         const response = await fetch(`${config.apiUrl}/devices/${id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData }),
         });

         const responseData = await response.json();
         if (response.ok) {
            navigate("/view-devices"); // Redirect after successful update
         } else {
            alert(`Failed to update device: ${responseData.message || responseData}`);
         }
      } catch (err) {
         console.error("Failed to update device:", err);
      }
   };

   if (!device) {
      return <p>Loading...</p>;
   }

   return (
      <main className="update-device-container">
         <section>
            <h2 className="update-device-title">Update Device</h2>
            <DeviceForm
               initialFormData={device}
               onSubmit={handleSubmit}
               buttonText="Update Device"
            />
         </section>
      </main>
   );
};

export default UpdateDevice;