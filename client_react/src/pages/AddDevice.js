import React, { useState, useEffect } from "react";
import DeviceForm from "../components/DeviceForm";
import DevicesTable from "../components/DevicesTable";
import "./AddDevice.css"; // Import CSS for styling

const AddDevice = () => {
   // State for form fields
   const [formData, setFormData] = useState({
      brand: "",
      model: "",
      ram: "",
      storage: "",
      color: "",
      grade: "",
      purchaseDate: "",
      status: "",
      imei: "",
      catalog: "",
      melding: false,
   });

   // State for dropdown options
   const [options, setOptions] = useState({
      brands: [],
      models: [],
      rams: [],
      storages: [],
      colors: [],
      grades: [],
      statuses: [],
      catalogs: [],
   });

   // State for devices list
   const [devices, setDevices] = useState([]);

   // Fetch dropdown options
   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(
               "http://localhost:7000/api/v1/selectoptions"
            );
            const data = await response.json();
            console.log(data);
            setOptions(data);
         } catch (err) {
            console.error("Failed to fetch options:", err);
         }
      };

      fetchOptions();
   }, []);

   // Handle form input change
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData({
         ...formData,
         [name]: type === "checkbox" ? checked : value,
      });
   };

   // Handle form submission
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch("http://localhost:7000/api/v1/devices", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
         });
         if (response.ok) {
            const newDevice = await response.json();
            setDevices([...devices, newDevice]);
            setFormData({
               brand: "",
               model: "",
               ram: "",
               storage: "",
               color: "",
               grade: "",
               purchaseDate: "",
               status: "",
               imei: "",
               catalog: "",
               melding: false,
            });
         } else {
            console.error("Failed to add device");
         }
      } catch (err) {
         console.error("Failed to add device:", err);
      }
   };

   return (
      <main id="app">
         <section>
            <h2>Add New Device</h2>
            <DeviceForm
               formData={formData}
               options={options}
               onChange={handleChange}
               onSubmit={handleSubmit}
            />
         </section>

         <section>
            <h2>Devices List</h2>
            <DevicesTable devices={devices} />
         </section>
      </main>
   );
};

export default AddDevice;
