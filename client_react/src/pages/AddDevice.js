import React, { useState, useEffect } from "react";
import DevicesTable from "../components/DevicesTable";
import "./AddDevice.css";
import { validateIMEI } from "../utils/validateIMEI";
import { getCurrentDate } from "../utils/getCurrentDate";
import config from "../utils/config";
import * as XLSX from "xlsx";

// ILAVE STATULER
// lost
// insured
// in transit

const AddDevice = () => {
   const [formData, setFormData] = useState({
      brand: "1",
      model: "1",
      ram: "1",
      storage: "1",
      color: "1",
      grade: "1",
      purchaseDate: getCurrentDate(),
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
   const [file, setFile] = useState([]);

   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(`${config.apiUrl}/selectoptions`);
            const data = await response.json();
            // console.log("Options data:", data);
            setOptions(data);
         } catch (err) {
            console.error("Failed to fetch options:", err);
         }
      };

      fetchOptions();
   }, []);

   useEffect(() => {
      // console.log("imeiValidity:", imeiValidity);
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
   };

   const handleSubmit = async () => {
      console.log("Submitting form data:", formData);
      console.log("formData.imei:", formData.imei);

      try {
         const response = await fetch(`${config.apiUrl}/devices`, {
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

   const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
         const data = await readExcelFile(file);
         console.log("Parsed data:", data);

         const response = await fetch(
            `${config.apiUrl}/devices/uploadfromexcel`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ data }),
            }
         );

         if (response.ok) {
            const result = await response.json();
            console.log("Upload successful:", result);
         } else {
            const errorMessage = await response.text();
            console.error("Failed to upload data:", errorMessage);
            alert(`Failed to upload data: ${errorMessage}`);
         }
      } catch (err) {
         console.error("Error handling file upload:", err);
         alert("Error handling file upload");
      }
   };

   // Function to read and parse the Excel file
   const readExcelFile = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();

         reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            resolve(jsonData);
         };

         reader.onerror = (error) => {
            reject(error);
         };

         reader.readAsArrayBuffer(file);
      });
   };

   return (
      <main id="app" className="add-device-container">
         <section>
            <h2 className="section-title">Add New Device</h2>
            <div className="container-selects">
               <div className="three-elements">
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
               </div>

               <div className="three-elements">
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
                     Purchase Date:
                     <input
                        type="date"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                     />
                  </label>
               </div>

               <div className="three-elements">
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
               </div>

               <div className="three-elements">
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
                  <div className="export-button-wrapper">
                     <input
                        type="file"
                        id="fileInput"
                        accept=".xlsx, .xls"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                     />
                     <button
                        id="button-export-from-xls"
                        onClick={() =>
                           document.getElementById("fileInput").click()
                        }
                     >
                        Import from XLS
                     </button>
                  </div>
               </div>

               {/* <label> 123456789112345</label>
               <label> 111111111111111</label>
               <label>valid IMEI number: 356766086875164</label>
               <label>valid IMEI number: 353067102354511</label> */}
               {/* <button type="submit">Add Device(s) to DB</button> */}
            </div>
         </section>

         <section>
            <h2 className="section-title-table">Added Devices</h2>
            <DevicesTable devices={devices} setDevices={setDevices} />
         </section>
      </main>
   );
};

export default AddDevice;

// import React, { useState, useEffect } from "react";
// import DevicesTable from "../components/DevicesTable";
// import "./AddDevice.css";
// import { validateIMEI } from "../utils/validateIMEI";
// import { getCurrentDate } from "../utils/getCurrentDate";
// import config from "../utils/config";

// const AddDevice = () => {
//    const [formData, setFormData] = useState({
//       brand: "1",
//       model: "1",
//       ram: "1",
//       storage: "1",
//       color: "1",
//       grade: "1",
//       purchaseDate: getCurrentDate(),
//       status: "1",
//       catalog: "1",
//       melding: false,
//       imei: "",
//    });

//    const [imeiValidity, setIMEIValidity] = useState(false);

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
//             const response = await fetch(`${config.apiUrl}/selectoptions`);
//             const data = await response.json();
//             console.log("Options data:", data);
//             setOptions(data);
//          } catch (err) {
//             console.error("Failed to fetch options:", err);
//          }
//       };

//       fetchOptions();
//    }, []);

//    useEffect(() => {
//       console.log("imeiValidity:", imeiValidity);
//       if (formData.imei.length === 15) {
//          if (imeiValidity && !validateIMEI(formData.imei).isValid) {
//             alert(
//                "IMEI must be a valid 15-digit number with a valid checksum."
//             );
//             setFormData((prev) => ({
//                ...prev,
//                imei: "",
//             }));
//             return;
//          }
//          handleSubmit();
//       }
//    }, [formData.imei, imeiValidity]);

//    const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;

//       if (type === "checkbox") {
//          setFormData((prev) => ({
//             ...prev,
//             [name]: checked,
//          }));

//          if (name === "imeiValidity") {
//             setIMEIValidity(checked);
//          }
//          return;
//       }

//       if (name === "imei") {
//          if (!/^\d*$/.test(value)) {
//             alert("IMEI must contain only numeric characters.");
//             return;
//          }
//       }

//       setFormData((prev) => ({
//          ...prev,
//          [name]: value,
//       }));
//    };

//    const handleSubmit = async () => {
//       console.log("Submitting form data:", formData);
//       console.log("formData.imei:", formData.imei);

//       try {
//          const response = await fetch(`${config.apiUrl}/devices`, {
//             method: "POST",
//             headers: {
//                "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...formData }),
//          });

//          if (response.ok) {
//             const newDevice = await response.json();
//             setDevices([...devices, newDevice.data.device]);
//             setFormData((prev) => ({
//                ...prev,
//                imei: "",
//             }));
//          } else {
//             const errorMessage = await response.text();
//             console.error("Failed to add device:", errorMessage);
//             alert(`Failed to add device: ${errorMessage}`);
//             setFormData((prev) => ({
//                ...prev,
//                imei: "",
//             }));
//          }
//       } catch (err) {
//          console.error("Failed to add device:", err);
//       }
//    };

//    return (
//       <main id="app" className="add-device-container">
//          <section>
//             <h2 className="section-title">Add New Device</h2>
//             <div className="container-selects">
//                <div className="three-elements">
//                   <label>
//                      Brand:
//                      <select
//                         name="brand"
//                         value={formData.brand}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select Brand</option>
//                         {options.brands.map((brand) => (
//                            <option key={brand.id} value={brand.id}>
//                               {brand.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                   <label>
//                      Model:
//                      <select
//                         name="model"
//                         value={formData.model}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select Model</option>
//                         {options.models.map((model) => (
//                            <option key={model.id} value={model.id}>
//                               {model.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                   <label>
//                      Storage:
//                      <select
//                         name="storage"
//                         value={formData.storage}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select Storage</option>
//                         {options.storages.map((storage) => (
//                            <option key={storage.id} value={storage.id}>
//                               {storage.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                </div>

//                <div className="three-elements">
//                   <label>
//                      Status:
//                      <select
//                         name="status"
//                         value={formData.status}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select Status</option>
//                         {options.statuses.map((status) => (
//                            <option key={status.id} value={status.id}>
//                               {status.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                   <label>
//                      Catalog:
//                      <select
//                         name="catalog"
//                         value={formData.catalog}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select Catalog</option>
//                         {options.catalogs.map((catalog) => (
//                            <option key={catalog.id} value={catalog.id}>
//                               {catalog.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                   <label>
//                      Purchase Date:
//                      <input
//                         type="date"
//                         name="purchaseDate"
//                         value={formData.purchaseDate}
//                         onChange={handleChange}
//                      />
//                   </label>
//                </div>

//                <div className="three-elements">
//                   <label>
//                      Color:
//                      <select
//                         name="color"
//                         value={formData.color}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select Color</option>
//                         {options.colors.map((color) => (
//                            <option key={color.id} value={color.id}>
//                               {color.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                   <label>
//                      Grade:
//                      <select
//                         name="grade"
//                         value={formData.grade}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select Grade</option>
//                         {options.grades.map((grade) => (
//                            <option key={grade.id} value={grade.id}>
//                               {grade.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                   <label>
//                      RAM:
//                      <select
//                         name="ram"
//                         value={formData.ram}
//                         onChange={handleChange}
//                      >
//                         <option value="">Select RAM</option>
//                         {options.rams.map((ram) => (
//                            <option key={ram.id} value={ram.id}>
//                               {ram.name}
//                            </option>
//                         ))}
//                      </select>
//                   </label>
//                   <div className="checkbox-field">
//                      <input
//                         type="checkbox"
//                         name="melding"
//                         id="melding"
//                         checked={formData.melding}
//                         onChange={handleChange}
//                      />
//                      <label htmlFor="melding">Melding</label>
//                   </div>
//                </div>

//                <div className="three-elements">
//                   <label>
//                      IMEI:
//                      <input
//                         type="text"
//                         name="imei"
//                         value={formData.imei}
//                         onChange={handleChange}
//                      />
//                   </label>
//                   <div className="checkbox-field">
//                      <input
//                         type="checkbox"
//                         name="imeiValidity"
//                         id="imeiValidity"
//                         checked={imeiValidity}
//                         onChange={(e) => setIMEIValidity(e.target.checked)}
//                      />
//                      <label htmlFor="imeiValidity">IMEI Validity</label>
//                   </div>
//                   <div className="export-button-wrapper">
//                      <button id="button-export-from-xls">
//                         Export from XLS
//                      </button>
//                   </div>
//                </div>

//                {/* <label> 123456789112345</label>
//                <label> 111111111111111</label>
//                <label>valid IMEI number: 356766086875164</label>
//                <label>valid IMEI number: 353067102354511</label> */}
//                {/* <button type="submit">Add Device(s) to DB</button> */}
//             </div>
//          </section>

//          <section>
//             <h2 className="section-title-table">Added Devices</h2>
//             <DevicesTable devices={devices} setDevices={setDevices} />
//          </section>
//       </main>
//    );
// };

// export default AddDevice;
