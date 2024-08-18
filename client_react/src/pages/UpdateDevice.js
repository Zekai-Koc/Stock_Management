import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { validateIMEI } from "../utils/validateIMEI";
import "./AddDevice.css";

const UpdateDevice = () => {
   const { imei } = useParams(); // Extract IMEI from route params

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

   const [loading, setLoading] = useState(true);

   // Fetch device data by IMEI when component loads
   useEffect(() => {
      const fetchDeviceData = async () => {
         try {
            const response = await fetch(
               `http://localhost:7000/api/v1/devices/${imei}`
            );
            const deviceData = await response.json();

            // Update formData with fetched device data
            setFormData({
               brand: deviceData.brandId,
               model: deviceData.modelId,
               ram: deviceData.ramId,
               storage: deviceData.storageId,
               color: deviceData.colorId,
               grade: deviceData.gradeId,
               purchaseDate: deviceData.purchaseDate.split("T")[0], // Extract date without time
               status: deviceData.statusId,
               catalog: deviceData.catalogId,
               melding: deviceData.melding,
               imei: deviceData.imei,
               imeiValidity: validateIMEI(deviceData.imei).isValid,
            });
            setLoading(false);
         } catch (err) {
            console.error("Failed to fetch device data:", err);
            setLoading(false);
         }
      };

      fetchDeviceData();
   }, [imei]); // Fetch device when the component mounts or when IMEI changes

   // Fetch options for select inputs
   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(
               "http://localhost:7000/api/v1/selectoptions"
            );
            const data = await response.json();
            setOptions(data);
         } catch (err) {
            console.error("Failed to fetch options:", err);
         }
      };

      fetchOptions();
   }, []);

   // Handle input changes
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      setFormData((prevData) => ({
         ...prevData,
         [name]: type === "checkbox" ? checked : value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         const response = await fetch(
            `http://localhost:7000/api/v1/devices/${imei}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ ...formData }),
            }
         );

         if (response.ok) {
            alert("Device updated successfully!");
         } else {
            const errorMessage = await response.text();
            alert(`Failed to update device: ${errorMessage}`);
         }
      } catch (err) {
         console.error("Failed to update device:", err);
      }
   };

   if (loading) {
      return <div>Loading device data...</div>;
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
                        <option key={brand.id} value={brand.id}>
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
                        <option key={model.id} value={model.id}>
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
                        <option key={ram.id} value={ram.id}>
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
                        <option key={storage.id} value={storage.id}>
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
                        <option key={color.id} value={color.id}>
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
                        <option key={grade.id} value={grade.id}>
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
                        <option key={status.id} value={status.id}>
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
                        <option key={catalog.id} value={catalog.id}>
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
                     readOnly
                  />
               </label>

               <label>
                  Purchase Date:
                  <input
                     type="date"
                     name="purchaseDate"
                     value={formData.purchaseDate}
                     onChange={handleChange}
                  />
               </label>

               <div className="checkbox-field">
                  <input
                     type="checkbox"
                     name="melding"
                     checked={formData.melding}
                     onChange={handleChange}
                  />
                  <label htmlFor="melding">Melding</label>
               </div>

               <button type="submit">Update Device</button>
            </form>
         </section>
      </main>
   );
};

export default UpdateDevice;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { validateIMEI } from "../utils/validateIMEI";
// import "./AddDevice.css";

// const UpdateDevice = () => {
//    const { imei } = useParams();

//    // State for form data
//    const [formData, setFormData] = useState({
//       brand: "",
//       model: "",
//       ram: "",
//       storage: "",
//       color: "",
//       grade: "",
//       purchaseDate: "",
//       status: "",
//       catalog: "",
//       melding: false,
//       imeiValidity: false,
//    });

//    // State for options
//    const [options, setOptions] = useState({
//       brands: [],
//       models: [],
//       rams: [],
//       storages: [],
//       colors: [],
//       grades: [],
//       statuses: [],
//       catalogs: [],
//    });

//    const [devices, setDevices] = useState([]);
//    const [loading, setLoading] = useState(true);

//    // Fetch options from the API
//    useEffect(() => {
//       const fetchOptions = async () => {
//          try {
//             const response = await fetch(
//                "http://localhost:7000/api/v1/selectoptions"
//             );
//             const data = await response.json();
//             setOptions(data);
//             setLoading(false);
//          } catch (err) {
//             console.error("Failed to fetch options:", err);
//             setLoading(false);
//          }
//       };

//       fetchOptions();
//    }, []);

//    // Handle input changes
//    const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;

//       if (name === "imei") {
//          if (!/^\d*$/.test(value)) {
//             alert("IMEI must contain only numeric characters.");
//             return;
//          }

//          setFormData((prevData) => ({
//             ...prevData,
//             imei: value,
//          }));

//          if (value.length === 15) {
//             if (validateIMEI(value).isValid) {
//                handleSubmit(e); // Submit the form if IMEI is valid
//             } else {
//                alert(
//                   "IMEI must be a valid 15-digit number with a valid checksum."
//                );
//             }
//          }
//       } else {
//          setFormData((prevData) => ({
//             ...prevData,
//             [name]: type === "checkbox" ? checked : value,
//          }));
//       }
//    };

//    const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//          const response = await fetch("http://localhost:7000/api/v1/devices", {
//             method: "POST",
//             headers: {
//                "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...formData, imei }),
//          });

//          if (response.ok) {
//             const newDevice = await response.json();
//             setDevices([...devices, newDevice.data.device]);
//          } else {
//             const errorMessage = await response.text();
//             alert(`Failed to add device: ${errorMessage}`);
//          }
//       } catch (err) {
//          console.error("Failed to add device:", err);
//       }
//    };

//    if (loading) {
//       return <div>Loading options...</div>; // Display while loading
//    }

//    return (
//       <main id="app" className="add-device-container">
//          <section>
//             <h2 className="section-title">Update Device with IMEI: {imei}</h2>
//             <form onSubmit={handleSubmit}>
//                <label>
//                   Brand:
//                   <select
//                      name="brand"
//                      value={formData.brand}
//                      onChange={handleChange}
//                   >
//                      {options.brands.map((brand) => (
//                         <option key={brand.id} value={brand.name}>
//                            {brand.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   Model:
//                   <select
//                      name="model"
//                      value={formData.model}
//                      onChange={handleChange}
//                   >
//                      {options.models.map((model) => (
//                         <option key={model.id} value={model.name}>
//                            {model.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   RAM:
//                   <select
//                      name="ram"
//                      value={formData.ram}
//                      onChange={handleChange}
//                   >
//                      {options.rams.map((ram) => (
//                         <option key={ram.id} value={ram.name}>
//                            {ram.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   Storage:
//                   <select
//                      name="storage"
//                      value={formData.storage}
//                      onChange={handleChange}
//                   >
//                      {options.storages.map((storage) => (
//                         <option key={storage.id} value={storage.name}>
//                            {storage.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   Color:
//                   <select
//                      name="color"
//                      value={formData.color}
//                      onChange={handleChange}
//                   >
//                      {options.colors.map((color) => (
//                         <option key={color.id} value={color.name}>
//                            {color.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   Grade:
//                   <select
//                      name="grade"
//                      value={formData.grade}
//                      onChange={handleChange}
//                   >
//                      {options.grades.map((grade) => (
//                         <option key={grade.id} value={grade.name}>
//                            {grade.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   Status:
//                   <select
//                      name="status"
//                      value={formData.status}
//                      onChange={handleChange}
//                   >
//                      {options.statuses.map((status) => (
//                         <option key={status.id} value={status.name}>
//                            {status.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   Catalog:
//                   <select
//                      name="catalog"
//                      value={formData.catalog}
//                      onChange={handleChange}
//                   >
//                      {options.catalogs.map((catalog) => (
//                         <option key={catalog.id} value={catalog.name}>
//                            {catalog.name}
//                         </option>
//                      ))}
//                   </select>
//                </label>

//                <label>
//                   IMEI:
//                   <input
//                      type="text"
//                      name="imei"
//                      value={formData.imei || imei}
//                      onChange={handleChange}
//                   />
//                </label>

//                <button type="submit">Update Device</button>
//             </form>
//          </section>
//       </main>
//    );
// };

// export default UpdateDevice;
