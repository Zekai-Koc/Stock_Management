import React, { useState, useEffect } from "react";
import DevicesTable from "../components/DevicesTable";
import "./AddDevice.css";
import { validateIMEI } from "../utils/validateIMEI";

const AddDevice = () => {
   const [formData, setFormData] = useState({
      brand: "1",
      model: "1",
      ram: "1",
      storage: "1",
      color: "1",
      grade: "1",
      purchaseDate: "2024-08-10",
      status: "1",
      catalog: "1",
      melding: false,
      imei: "",
   });

   const [imeiValidity, setIMEIValidity] = useState(false);

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

   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(
               "http://localhost:7000/api/v1/selectoptions"
            );
            const data = await response.json();
            console.log("Options data:", data);
            setOptions(data);
         } catch (err) {
            console.error("Failed to fetch options:", err);
         }
      };

      fetchOptions();
   }, []);

   useEffect(() => {
      console.log("imeiValidity:", imeiValidity);
      if (formData.imei.length === 15) {
         if (imeiValidity && !validateIMEI(formData.imei).isValid) {
            alert(
               "IMEI must be a valid 15-digit number with a valid checksum."
            );
            setFormData((prev) => ({
               ...prev,
               imei: "",
            }));
            return;
         }
         handleSubmit();
      }
   }, [formData.imei, imeiValidity]);

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (type === "checkbox") {
         setFormData((prev) => ({
            ...prev,
            [name]: checked,
         }));

         if (name === "imeiValidity") {
            setIMEIValidity(checked);
         }
         return;
      }

      if (name === "imei") {
         if (!/^\d*$/.test(value)) {
            alert("IMEI must contain only numeric characters.");
            return;
         }
      }

      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));

      // console.log("value:", value);
      // console.log("value.length:", value.length);

      // if (name === "imei" && value.length === 15) {
      //    if (imeiValidity) {
      //       if (!validateIMEI(value).isValid) {
      //          alert(
      //             "IMEI must be a valid 15-digit number with a valid checksum."
      //          );
      //          return;
      //       }
      //    }
      //    handleSubmit();
      // }
   };

   const handleSubmit = async () => {
      // e.preventDefault();

      console.log("Submitting form data:", formData);
      console.log("formData.imei:", formData.imei);

      try {
         const response = await fetch("http://localhost:7000/api/v1/devices", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData }),
         });

         if (response.ok) {
            const newDevice = await response.json();
            setDevices([...devices, newDevice.data.device]);
            setFormData((prev) => ({
               ...prev,
               imei: "",
            }));
         } else {
            const errorMessage = await response.text();
            console.error("Failed to add device:", errorMessage);
            alert(`Failed to add device: ${errorMessage}`);
            setFormData((prev) => ({
               ...prev,
               imei: "",
            }));
         }
      } catch (err) {
         console.error("Failed to add device:", err);
      }
   };

   const getOptionValue = (id, optionsArray) => {
      const option = optionsArray.find((item) => item.id === id);
      return option ? option.name : "N/A";
   };

   const transformDevices = (devices) => {
      return devices.map((device) => ({
         ...device,
         brand: getOptionValue(device.brandId, options.brands),
         model: getOptionValue(device.modelId, options.models),
         ram: getOptionValue(device.ramId, options.rams),
         storage: getOptionValue(device.storageId, options.storages),
         color: getOptionValue(device.colorId, options.colors),
         grade: getOptionValue(device.gradeId, options.grades),
         status: getOptionValue(device.statusId, options.statuses),
         catalog: getOptionValue(device.catalogId, options.catalogs),
      }));
   };

   return (
      <main id="app" className="add-device-container">
         <section>
            <h2 className="section-title">Add New Device</h2>
            <div className="container-selects">
               <label>
                  Brand:
                  <select
                     name="brand"
                     value={formData.brand}
                     onChange={handleChange}
                  >
                     <option value="">Select Brand</option>
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
                     <option value="">Select Model</option>
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
                     <option value="">Select RAM</option>
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
                     <option value="">Select Storage</option>
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
                     <option value="">Select Color</option>
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
                     <option value="">Select Grade</option>
                     {options.grades.map((grade) => (
                        <option key={grade.id} value={grade.id}>
                           {grade.name}
                        </option>
                     ))}
                  </select>
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
               <label>
                  Status:
                  <select
                     name="status"
                     value={formData.status}
                     onChange={handleChange}
                  >
                     <option value="">Select Status</option>
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
                     <option value="">Select Catalog</option>
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
                     value={formData.imei}
                     onChange={handleChange}
                  />
               </label>
               <div className="checkbox-field">
                  <input
                     type="checkbox"
                     name="imeiValidity"
                     id="imeiValidity"
                     checked={imeiValidity}
                     onChange={(e) => setIMEIValidity(e.target.checked)}
                  />
                  <label htmlFor="imeiValidity">IMEI Validity</label>
               </div>
               <div className="checkbox-field">
                  <input
                     type="checkbox"
                     name="melding"
                     id="melding"
                     checked={formData.melding}
                     onChange={handleChange}
                  />
                  <label htmlFor="melding">Melding</label>
               </div>
               <label> 123456789112345</label>
               <label> 111111111111111</label>
               <label>valid IMEI number: 356766086875164</label>
               <label>valid IMEI number: 353067102354511</label>
               <button type="submit">Add Device(s) to DB</button>
            </div>
         </section>

         <section>
            <h2 className="section-title">Added Devices List</h2>
            <DevicesTable
               devices={transformDevices(devices)}
               setDevices={setDevices}
            />
         </section>
      </main>
   );
};

export default AddDevice;

// import React, { useState, useEffect } from "react";
// import DevicesTable from "../components/DevicesTable";
// import "./AddDevice.css";
// import { validateIMEI } from "../utils/validateIMEI";

// const AddDevice = () => {
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
//    });

//    const [imeiValidity, setIMEIValidity] = useState(false);

//    const [imei, setIMEI] = useState("");
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

//    useEffect(() => {
//       const fetchOptions = async () => {
//          try {
//             const response = await fetch(
//                "http://localhost:7000/api/v1/selectoptions"
//             );
//             const data = await response.json();
//             setOptions(data);
//          } catch (err) {
//             console.error("Failed to fetch options:", err);
//          }
//       };

//       fetchOptions();
//    }, []);

//    const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;

//       if (name === "imei") {
//          if (!/^\d*$/.test(value)) {
//             alert("IMEI must contain only numeric characters.");
//             return;
//          }

//          setIMEI(value);

//          if (value.length === 15) {
//             if (formData.imeiValidity) {
//                if (validateIMEI(value).isValid) {
//                   handleSubmit(e);
//                } else {
//                   alert(
//                      "IMEI must be a valid 15-digit number with a valid checksum."
//                   );
//                   setIMEI("");
//                }
//             } else {
//                handleSubmit(e);
//             }
//          }
//       } else {
//          setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//          });
//          console.log("Form data:", formData);
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
//             console.log("New device added:", newDevice);
//             setDevices([...devices, newDevice.data.device]);
//             setIMEI(""); // Clear IMEI after submission
//          } else {
//             const errorMessage = await response.text();
//             console.error("Failed to add device", errorMessage);
//             alert(`Failed to add device: ${errorMessage}`);
//             setIMEI(""); // Clear IMEI on error
//          }
//       } catch (err) {
//          console.error("Failed to add device:", err);
//       }
//    };

//    const getOptionValue = (id, optionsArray) => {
//       const option = optionsArray.find((item) => item.id === id);
//       return option ? option.name : "N/A";
//    };

//    const transformDevices = (devices) => {
//       return devices.map((device) => ({
//          ...device,
//          brand: getOptionValue(device.brandId, options.brands),
//          model: getOptionValue(device.modelId, options.models),
//          ram: getOptionValue(device.ramId, options.rams),
//          storage: getOptionValue(device.storageId, options.storages),
//          color: getOptionValue(device.colorId, options.colors),
//          grade: getOptionValue(device.gradeId, options.grades),
//          status: getOptionValue(device.statusId, options.statuses),
//          catalog: getOptionValue(device.catalogId, options.catalogs),
//       }));
//    };

//    return (
//       <main id="app" className="add-device-container">
//          <section>
//             <h2 className="section-title">Add New Device</h2>
//             <form id="deviceForm" onSubmit={handleSubmit}>
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
//                   Purchase Date:
//                   <input
//                      type="date"
//                      name="purchaseDate"
//                      value={formData.purchaseDate}
//                      onChange={handleChange}
//                   />
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

//                <div className="checkbox-field">
//                   <input
//                      type="checkbox"
//                      name="imeiValidity"
//                      id="imeiValidity"
//                      onChange={handleChange}
//                   />
//                   <label htmlFor="imeiValidity">IMEI Validity</label>
//                </div>

//                <div className="checkbox-field">
//                   <input
//                      type="checkbox"
//                      name="melding"
//                      id="melding"
//                      checked={formData.melding}
//                      onChange={handleChange}
//                   />
//                   <label htmlFor="melding">Melding</label>
//                </div>

//                <button type="submit">Add Device(s) to DB</button>
//             </form>
//          </section>

//          <section>
//             <h2 className="section-title">Added Devices List</h2>
//             <DevicesTable
//                devices={transformDevices(devices)}
//                setDevices={setDevices}
//             />
//          </section>
//       </main>
//    );
// };

// export default AddDevice;
