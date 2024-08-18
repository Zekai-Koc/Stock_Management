import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { validateIMEI } from "../utils/validateIMEI";
import "./AddDevice.css";

const UpdateDevice = () => {
   const { imei } = useParams();

   // State for form data
   const [formData, setFormData] = useState({
      brand: "",
      model: "",
      ram: "",
      storage: "",
      color: "",
      grade: "",
      purchaseDate: "",
      status: "",
      catalog: "",
      melding: false,
      imeiValidity: false,
   });

   // State for options
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

   const [devices, setDevices] = useState([]);
   const [loading, setLoading] = useState(true);

   // Fetch options from the API
   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(
               "http://localhost:7000/api/v1/selectoptions"
            );
            const data = await response.json();
            setOptions(data); // Set fetched options
            setLoading(false); // Stop loading
         } catch (err) {
            console.error("Failed to fetch options:", err);
            setLoading(false); // Stop loading even if it fails
         }
      };

      fetchOptions();
   }, []);

   // Handle input changes
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === "imei") {
         if (!/^\d*$/.test(value)) {
            alert("IMEI must contain only numeric characters.");
            return;
         }

         setFormData((prevData) => ({
            ...prevData,
            imei: value,
         }));

         if (value.length === 15) {
            if (validateIMEI(value).isValid) {
               handleSubmit(e); // Submit the form if IMEI is valid
            } else {
               alert(
                  "IMEI must be a valid 15-digit number with a valid checksum."
               );
            }
         }
      } else {
         setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
         }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch("http://localhost:7000/api/v1/devices", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, imei }),
         });

         if (response.ok) {
            const newDevice = await response.json();
            setDevices([...devices, newDevice.data.device]);
         } else {
            const errorMessage = await response.text();
            alert(`Failed to add device: ${errorMessage}`);
         }
      } catch (err) {
         console.error("Failed to add device:", err);
      }
   };

   if (loading) {
      return <div>Loading options...</div>; // Display while loading
   }

   return (
      <main id="app" className="add-device-container">
         <section>
            <h2 className="section-title">Update Device with IMEI: {imei}</h2>
            <form onSubmit={handleSubmit}>
               <label>
                  Brand:
                  <select
                     name="brand"
                     value={formData.brand}
                     onChange={handleChange}
                  >
                     {options.brands.map((brand) => (
                        <option key={brand.id} value={brand.name}>
                           {brand.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  Model:
                  <select
                     name="model"
                     value={formData.model}
                     onChange={handleChange}
                  >
                     {options.models.map((model) => (
                        <option key={model.id} value={model.name}>
                           {model.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  RAM:
                  <select
                     name="ram"
                     value={formData.ram}
                     onChange={handleChange}
                  >
                     {options.rams.map((ram) => (
                        <option key={ram.id} value={ram.name}>
                           {ram.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  Storage:
                  <select
                     name="storage"
                     value={formData.storage}
                     onChange={handleChange}
                  >
                     {options.storages.map((storage) => (
                        <option key={storage.id} value={storage.name}>
                           {storage.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  Color:
                  <select
                     name="color"
                     value={formData.color}
                     onChange={handleChange}
                  >
                     {options.colors.map((color) => (
                        <option key={color.id} value={color.name}>
                           {color.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  Grade:
                  <select
                     name="grade"
                     value={formData.grade}
                     onChange={handleChange}
                  >
                     {options.grades.map((grade) => (
                        <option key={grade.id} value={grade.name}>
                           {grade.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  Status:
                  <select
                     name="status"
                     value={formData.status}
                     onChange={handleChange}
                  >
                     {options.statuses.map((status) => (
                        <option key={status.id} value={status.name}>
                           {status.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  Catalog:
                  <select
                     name="catalog"
                     value={formData.catalog}
                     onChange={handleChange}
                  >
                     {options.catalogs.map((catalog) => (
                        <option key={catalog.id} value={catalog.name}>
                           {catalog.name}
                        </option>
                     ))}
                  </select>
               </label>

               <label>
                  IMEI:
                  <input
                     type="text"
                     name="imei"
                     value={formData.imei || imei}
                     onChange={handleChange}
                  />
               </label>

               <button type="submit">Update Device</button>
            </form>
         </section>
      </main>
   );
};

export default UpdateDevice;
