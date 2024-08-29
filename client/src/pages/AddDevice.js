import React from "react";
import DeviceForm from "../components/DeviceForm";
import config from "../utils/config";

   const formValid = (data) => {
      if (!data.imei || !data.model) {
         alert("IMEI and model are mandatory!");
         return false;
      }
      return true;
   };

const AddDevice = () => {
   const handleSubmit = async (formData) => {
      if (!formValid(formData)) return;

      try {
         const response = await fetch(`${config.apiUrl}/devices`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData }),
         });

         const responseData = await response.json();
         // console.log(responseData)
         if (response.ok) {
            alert(`Device added: ${responseData.model}`)
         } else {
            alert(`Failed to add device: ${responseData.message || responseData}`);
         }
      } catch (err) {
         console.error("Failed to add device:", err);
      }
   };

   return (
      <main className="add-device-container">
         <section>
            <h2 className="add-device-title">Add New Device</h2>
            <DeviceForm
               initialFormData={{
                  brand: "",
                  model: "",
                  ram: "",
                  storage: "",
                  color: "",
                  grade: "",
                  purchaseDate: new Date().toISOString().split("T")[0],
                  status: "",
                  catalog: "",
                  melding: false,
                  imei: "",
                  cost: "",
                  notes: "",
                  active: true,
               }}
               onSubmit={handleSubmit}
               buttonText="Add Device to DB"
            />
         </section>
      </main>
   );
};

export default AddDevice;












// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import "../styles/AddDevice.css";
// import { validateIMEI } from "../utils/validateIMEI";
// import { getCurrentDate } from "../utils/getCurrentDate";
// import config from "../utils/config";

// const AddDevice = () => {
//    const [formData, setFormData] = useState({
//       brand: "",
//       model: "",
//       ram: "",
//       storage: "",
//       color: "",
//       grade: "",
//       purchaseDate: getCurrentDate(),
//       status: "",
//       catalog: "",
//       melding: false,
//       imei: "",
//       cost: "",
//       notes: "",
//       active: true,
//    });

//    const [devices, setDevices] = useState([]);
//    const [error, setError] = useState(null);
//    const navigate = useNavigate(); // For navigation

//    const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;

//       if (type === "checkbox") {
//          setFormData((prev) => ({
//             ...prev,
//             [name]: checked,
//          }));
//          return;
//       }

//       if (name === "imei" && !/^\d*$/.test(value)) {
//          alert("IMEI must contain only numeric characters.");
//          return;
//       }

//       setFormData((prev) => ({
//          ...prev,
//          [name]: value,
//       }));
//    };

//    const formValid = (data) => {
//       if (!data.imei || !data.model) {
//          alert("IMEI and model are mandatory!");
//          return false;
//       }
//       return true;
//    };

//    const handleSubmit = async () => {
//       if (!formValid(formData)) return;

//       try {
//          const response = await fetch(`${config.apiUrl}/devices`, {
//             method: "POST",
//             headers: {
//                "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ ...formData }),
//          });

//          const responseData = await response.json();
//          if (response.ok) {
//             setDevices([...devices, responseData]);
//             setFormData({
//                brand: "",
//                model: "",
//                ram: "",
//                storage: "",
//                color: "",
//                grade: "",
//                purchaseDate: getCurrentDate(),
//                status: "",
//                catalog: "",
//                melding: false,
//                imei: "",
//                cost: "",
//                notes: "",
//                active: true,
//             });
//          } else {
//             alert(`Failed to add device: ${responseData.message || responseData}`);
//          }
//       } catch (err) {
//          console.error("Failed to add device:", err);
//       }
//    };

//    const handleDelete = async (id) => {
//       const confirmDelete = window.confirm(
//          "Are you sure you want to delete this device?"
//       );
//       if (confirmDelete) {
//          try {
//             const response = await fetch(
//                `http://localhost:7000/api/v1/devices/${id}`,
//                {
//                   method: "DELETE",
//                }
//             );
//             if (!response.ok) {
//                throw new Error(`Failed to delete device with id: ${id}`);
//             }
//             setDevices((prevDevices) =>
//                prevDevices.filter((device) => device.id !== id)
//             );
//          } catch (err) {
//             setError(err);
//          }
//       }
//    };

//    const handleEdit = (id) => {
//       navigate(`/update-device/${id}`);
//    };

//    return (
//       <main id="app" className="add-device-container">
//          <section>
//             <h2 className="add-device-title">Add New Device</h2>
//             <div className="add-device-form">
//                <div className="add-device-row">
//                   <label className="add-device-label">
//                      Brand:
//                      <input
//                         type="text"
//                         name="brand"
//                         value={formData.brand}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                   <label className="add-device-label">
//                      Model:
//                      <input
//                         type="text"
//                         name="model"
//                         value={formData.model}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                   <label className="add-device-label">
//                      Storage:
//                      <input
//                         type="number"
//                         name="storage"
//                         value={formData.storage}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                </div>

//                <div className="add-device-row">
//                   <label className="add-device-label">
//                      Color:
//                      <input
//                         type="text"
//                         name="color"
//                         value={formData.color}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                   <label className="add-device-label">
//                      Grade:
//                      <input
//                         type="text"
//                         name="grade"
//                         value={formData.grade}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                   <label className="add-device-label">
//                      RAM:
//                      <input
//                         type="number"
//                         name="ram"
//                         value={formData.ram}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                </div>

//                <div className="add-device-row">
//                   <label className="add-device-label">
//                      Status:
//                      <input
//                         type="text"
//                         name="status"
//                         value={formData.status}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                   <label className="add-device-label">
//                      Catalog:
//                      <input
//                         type="text"
//                         name="catalog"
//                         value={formData.catalog}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                   <label className="add-device-label">
//                      Purchase Date:
//                      <input
//                         type="date"
//                         name="purchaseDate"
//                         value={formData.purchaseDate}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                </div>

//                <div className="add-device-row">
//                   <label className="add-device-label">
//                      IMEI:
//                      <input
//                         type="text"
//                         name="imei"
//                         value={formData.imei}
//                         onChange={handleChange}
//                         className="add-device-input"
//                      />
//                   </label>
//                   <label className="add-device-label">
//                      Cost:
//                      <input
//                         type="number"
//                         name="cost"
//                         value={formData.cost}
//                         onChange={handleChange}
//                         step="0.01"
//                         min="0"
//                         className="add-device-input"
//                      />
//                   </label>
//                   <div className="add-device-checkbox-wrapper">
//                      <input
//                         type="checkbox"
//                         name="melding"
//                         id="melding"
//                         checked={formData.melding}
//                         onChange={handleChange}
//                         className="add-device-checkbox"
//                      />
//                      <label htmlFor="melding" className="add-device-checkbox-label">
//                         Melding
//                      </label>
//                   </div>
//                </div>

//                <div className="add-device-row">
//                   <label className="add-device-label">
//                      Notes:
//                      <textarea
//                         name="notes"
//                         value={formData.notes}
//                         onChange={handleChange}
//                         className="add-device-textarea"
//                      />
//                   </label>
//                </div>

//                <button
//                   type="button"
//                   onClick={handleSubmit}
//                   className="add-device-submit-button"
//                >
//                   Add Device to DB
//                </button>
//             </div>
//          </section>

//          <section>
//             <h2 className="add-device-title-table">Added Devices</h2>
//             <table id="devicesTable">
//                <thead>
//                   <tr>
//                      <th>IMEI</th>
//                      <th>Brand</th>
//                      <th>Model</th>
//                      <th>RAM</th>
//                      <th>Storage</th>
//                      <th>Color</th>
//                      <th>Grade</th>
//                      <th>Status</th>
//                      <th>Melding</th>
//                      <th>Catalog</th>
//                      <th>Purchase Date</th>
//                      <th>Edit</th>
//                      <th>Delete</th>
//                   </tr>
//                </thead>
//                <tbody>
//                   {devices.length > 0 ? (
//                      devices.map((device) => (
//                         <tr key={device.imei}>
//                            <td>{device.imei}</td>
//                            <td>{device.brand}</td>
//                            <td>{device.model}</td>
//                            <td>{device.ram}</td>
//                            <td>{device.storage}</td>
//                            <td>{device.color}</td>
//                            <td>{device.grade}</td>
//                            <td>{device.status}</td>
//                            <td>{device.melding ? "Yes" : "No"}</td>
//                            <td>{device.catalog}</td>
//                            <td>
//                               {new Date(device.purchaseDate).toLocaleDateString()}
//                            </td>
//                            <td>
//                               <button
//                                  onClick={() => handleEdit(device.id)}
//                                  className="edit-button"
//                               >
//                                  <FontAwesomeIcon icon={faEdit} />
//                               </button>
//                            </td>
//                            <td>
//                               <button
//                                  onClick={() => handleDelete(device.id)}
//                                  className="delete-button"
//                               >
//                                  <FontAwesomeIcon icon={faTrash} />
//                               </button>
//                            </td>
//                         </tr>
//                      ))
//                   ) : (
//                      <tr>
//                         <td colSpan="13">No devices added yet.</td>
//                      </tr>
//                   )}
//                </tbody>
//             </table>
//          </section>
//       </main>
//    );
// };

// export default AddDevice;



















// // import React, { useState, useEffect } from "react";
// // import DevicesTable from "../components/DevicesTable";
// // import "../styles/AddDevice.css";
// // import { validateIMEI } from "../utils/validateIMEI";
// // import { getCurrentDate } from "../utils/getCurrentDate";
// // import config from "../utils/config";

// // const AddDevice = () => {
// //    const [formData, setFormData] = useState({
// //       brand: "",
// //       model: "",
// //       ram: "",
// //       storage: "",
// //       color: "",
// //       grade: "",
// //       purchaseDate: getCurrentDate(),
// //       status: "",
// //       catalog: "",
// //       melding: false,
// //       imei: "",
// //       cost: "",
// //       notes: "",
// //       active: true,
// //    });

// //    // const [imeiValidity, setIMEIValidity] = useState(false);
// //    const [devices, setDevices] = useState([]);

// //    const handleChange = (e) => {
// //       const { name, value, type, checked } = e.target;

// //       if (type === "checkbox") {
// //          setFormData((prev) => ({
// //             ...prev,
// //             [name]: checked,
// //          }));
// //          // if (name === "imeiValidity") {
// //          //    setIMEIValidity(checked);
// //          // }
// //          return;
// //       }

// //       if (name === "imei" && !/^\d*$/.test(value)) {
// //          alert("IMEI must contain only numeric characters.");
// //          return;
// //       }

// //       setFormData((prev) => ({
// //          ...prev,
// //          [name]: value,
// //       }));
// //    };


// //    const formValid = (data) => {
// //       console.log("Submitting form data:", data);
// //       if (!data.imei || !data.model) {
// //          alert("imei and model mandatory!")
// //          return false
// //       }
// //       return true
// //    }


// //    const handleSubmit = async () => {

// //       if (!formValid(formData)) return;
   
// //       console.log("Submitting form data:", formData);
// //       try {
// //          const response = await fetch(`${config.apiUrl}/devices`, {
// //             method: "POST",
// //             headers: {
// //                "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ ...formData }),
// //          });
   
// //          const responseData = await response.json();
// //          console.log("Response data:", responseData);
   
// //          if (response.ok) {
// //             const newDevice = responseData;
// //             setDevices([...devices, newDevice]);
// //             setFormData({
// //                brand: "",
// //                model: "",
// //                ram: "",
// //                storage: "",
// //                color: "",
// //                grade: "",
// //                purchaseDate: getCurrentDate(),
// //                status: "",
// //                catalog: "",
// //                melding: false,
// //                imei: "",
// //                cost: "",
// //                notes: "",
// //                active: true,
// //             });
// //          } else {
// //             console.error("Failed to add device:", responseData);
// //             alert(`Failed to add device: ${responseData.message || responseData}`);
// //          }
// //       } catch (err) {
// //          console.error("Failed to add device:", err);
// //       }
// //    };

// //    return (
// //       <main id="app" className="add-device-container">
// //          <section>
// //             <h2 className="add-device-title">Add New Device</h2>
// //             <div className="add-device-form">
// //                <div className="add-device-row">
// //                   <label className="add-device-label">
// //                      Brand:
// //                      <input
// //                         type="text"
// //                         name="brand"
// //                         value={formData.brand}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <label className="add-device-label">
// //                      Model:
// //                      <input
// //                         type="text"
// //                         name="model"
// //                         value={formData.model}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <label className="add-device-label">
// //                      Storage:
// //                      <input
// //                         type="number"
// //                         name="storage"
// //                         value={formData.storage}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                </div>

// //                <div className="add-device-row">
// //                   <label className="add-device-label">
// //                      Color:
// //                      <input
// //                         type="text"
// //                         name="color"
// //                         value={formData.color}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <label className="add-device-label">
// //                      Grade:
// //                      <input
// //                         type="text"
// //                         name="grade"
// //                         value={formData.grade}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <label className="add-device-label">
// //                      RAM:
// //                      <input
// //                         type="number"
// //                         name="ram"
// //                         value={formData.ram}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                </div>

// //                <div className="add-device-row">
// //                   <label className="add-device-label">
// //                      Status:
// //                      <input
// //                         type="text"
// //                         name="status"
// //                         value={formData.status}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <label className="add-device-label">
// //                      Catalog:
// //                      <input
// //                         type="text"
// //                         name="catalog"
// //                         value={formData.catalog}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <label className="add-device-label">
// //                      Purchase Date:
// //                      <input
// //                         type="date"
// //                         name="purchaseDate"
// //                         value={formData.purchaseDate}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                </div>
// //                <div className="add-device-row">
// //                <label className="add-device-label">
// //                      IMEI:
// //                      <input
// //                         type="text"
// //                         name="imei"
// //                         value={formData.imei}
// //                         onChange={handleChange}
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <label className="add-device-label">
// //                      Cost:
// //                      <input
// //                         type="number"
// //                         name="cost"
// //                         value={formData.cost}
// //                         onChange={handleChange}
// //                         step="0.01"
// //                         min="0"
// //                         className="add-device-input"
// //                      />
// //                   </label>
// //                   <div className="add-device-checkbox-wrapper">
// //                      <input
// //                         type="checkbox"
// //                         name="melding"
// //                         id="melding"
// //                         checked={formData.melding}
// //                         onChange={handleChange}
// //                         className="add-device-checkbox"
// //                      />
// //                      <label htmlFor="melding" className="add-device-checkbox-label">
// //                         Melding
// //                      </label>
// //                   </div>
// //                   {/* <div className="add-device-checkbox-wrapper">
// //                      <input
// //                         type="checkbox"
// //                         name="active"
// //                         id="active"
// //                         checked={formData.active}
// //                         onChange={handleChange}
// //                         className="add-device-checkbox"
// //                      />
// //                      <label htmlFor="active" className="add-device-checkbox-label">
// //                         Active
// //                      </label>
// //                   </div> */}
// //                </div>

// //                <div className="add-device-row">
// //                   {/* <div className="add-device-checkbox-wrapper">
// //                      <input
// //                         type="checkbox"
// //                         name="imeiValidity"
// //                         id="imeiValidity"
// //                         checked={imeiValidity}
// //                         onChange={(e) => setIMEIValidity(e.target.checked)}
// //                         className="add-device-checkbox"
// //                      />
// //                      <label htmlFor="imeiValidity" className="add-device-checkbox-label">
// //                         IMEI Validity
// //                      </label>
// //                   </div> */}
// //                   <label className="add-device-label">
// //                      Notes:
// //                      <textarea
// //                         name="notes"
// //                         value={formData.notes}
// //                         onChange={handleChange}
// //                         className="add-device-textarea"
// //                      />
// //                   </label>
// //                </div>

// //                <button
// //                   type="button"
// //                   onClick={handleSubmit}
// //                   className="add-device-submit-button"
// //                >
// //                   Add Device(s) to DB
// //                </button>
// //             </div>
// //          </section>

// //          <section>
// //             <h2 className="add-device-title-table">Added Devices</h2>
// //             <DevicesTable devices={devices} setDevices={setDevices} />
// //          </section>
// //       </main>
// //    );
// // };

// // export default AddDevice;








// // import React, { useState, useEffect } from "react";
// // import DevicesTable from "../components/DevicesTable";
// // import "./AddDevice.css";
// // import { validateIMEI } from "../utils/validateIMEI";
// // import { getCurrentDate } from "../utils/getCurrentDate";
// // import config from "../utils/config";
// // import * as XLSX from "xlsx";

// // // ILAVE STATULER
// // // lost
// // // insured
// // // in transit

// // const AddDevice = () => {
// //    const [formData, setFormData] = useState({
// //       brand: "1",
// //       model: "1",
// //       ram: "1",
// //       storage: "1",
// //       color: "1",
// //       grade: "1",
// //       purchaseDate: getCurrentDate(),
// //       status: "1",
// //       catalog: "1",
// //       melding: false,
// //       imei: "",
// //    });

// //    const [imeiValidity, setIMEIValidity] = useState(false);

// //    const [options, setOptions] = useState({
// //       brands: [],
// //       models: [],
// //       rams: [],
// //       storages: [],
// //       colors: [],
// //       grades: [],
// //       statuses: [],
// //       catalogs: [],
// //    });

// //    const [devices, setDevices] = useState([]);
// //    const [file, setFile] = useState([]);

// //    useEffect(() => {
// //       const fetchOptions = async () => {
// //          try {
// //             const response = await fetch(`${config.apiUrl}/selectoptions`);
// //             const data = await response.json();
// //             // console.log("Options data:", data);
// //             setOptions(data);
// //          } catch (err) {
// //             console.error("Failed to fetch options:", err);
// //          }
// //       };

// //       fetchOptions();
// //    }, []);

// //    useEffect(() => {
// //       // console.log("imeiValidity:", imeiValidity);
// //       if (formData.imei.length === 15) {
// //          if (imeiValidity && !validateIMEI(formData.imei).isValid) {
// //             alert(
// //                "IMEI must be a valid 15-digit number with a valid checksum."
// //             );
// //             setFormData((prev) => ({
// //                ...prev,
// //                imei: "",
// //             }));
// //             return;
// //          }
// //          handleSubmit();
// //       }
// //    }, [formData.imei, imeiValidity]);

// //    const handleChange = (e) => {
// //       const { name, value, type, checked } = e.target;

// //       if (type === "checkbox") {
// //          setFormData((prev) => ({
// //             ...prev,
// //             [name]: checked,
// //          }));

// //          if (name === "imeiValidity") {
// //             setIMEIValidity(checked);
// //          }
// //          return;
// //       }

// //       if (name === "imei") {
// //          if (!/^\d*$/.test(value)) {
// //             alert("IMEI must contain only numeric characters.");
// //             return;
// //          }
// //       }

// //       setFormData((prev) => ({
// //          ...prev,
// //          [name]: value,
// //       }));
// //    };

// //    const handleSubmit = async () => {
// //       console.log("Submitting form data:", formData);
// //       console.log("formData.imei:", formData.imei);

// //       try {
// //          const response = await fetch(`${config.apiUrl}/devices`, {
// //             method: "POST",
// //             headers: {
// //                "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ ...formData }),
// //          });

// //          if (response.ok) {
// //             const newDevice = await response.json();
// //             setDevices([...devices, newDevice.data.device]);
// //             setFormData((prev) => ({
// //                ...prev,
// //                imei: "",
// //             }));
// //          } else {
// //             const errorMessage = await response.text();
// //             console.error("Failed to add device:", errorMessage);
// //             alert(`Failed to add device: ${errorMessage}`);
// //             setFormData((prev) => ({
// //                ...prev,
// //                imei: "",
// //             }));
// //          }
// //       } catch (err) {
// //          console.error("Failed to add device:", err);
// //       }
// //    };


// //    return (
// //       <main id="app" className="add-device-container">
// //          <section>
// //             <h2 className="section-title">Add New Device</h2>
// //             <div className="container-selects">
// //                <div className="three-elements">
// //                   <label>
// //                      Brand:
// //                      <select
// //                         name="brand"
// //                         value={formData.brand}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select Brand</option>
// //                         {options.brands.map((brand) => (
// //                            <option key={brand.id} value={brand.id}>
// //                               {brand.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                   <label>
// //                      Model:
// //                      <select
// //                         name="model"
// //                         value={formData.model}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select Model</option>
// //                         {options.models.map((model) => (
// //                            <option key={model.id} value={model.id}>
// //                               {model.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                   <label>
// //                      Storage:
// //                      <select
// //                         name="storage"
// //                         value={formData.storage}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select Storage</option>
// //                         {options.storages.map((storage) => (
// //                            <option key={storage.id} value={storage.id}>
// //                               {storage.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                </div>

// //                <div className="three-elements">
// //                   <label>
// //                      Status:
// //                      <select
// //                         name="status"
// //                         value={formData.status}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select Status</option>
// //                         {options.statuses.map((status) => (
// //                            <option key={status.id} value={status.id}>
// //                               {status.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                   <label>
// //                      Catalog:
// //                      <select
// //                         name="catalog"
// //                         value={formData.catalog}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select Catalog</option>
// //                         {options.catalogs.map((catalog) => (
// //                            <option key={catalog.id} value={catalog.id}>
// //                               {catalog.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                   <label>
// //                      Purchase Date:
// //                      <input
// //                         type="date"
// //                         name="purchaseDate"
// //                         value={formData.purchaseDate}
// //                         onChange={handleChange}
// //                      />
// //                   </label>
// //                </div>

// //                <div className="three-elements">
// //                   <label>
// //                      Color:
// //                      <select
// //                         name="color"
// //                         value={formData.color}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select Color</option>
// //                         {options.colors.map((color) => (
// //                            <option key={color.id} value={color.id}>
// //                               {color.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                   <label>
// //                      Grade:
// //                      <select
// //                         name="grade"
// //                         value={formData.grade}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select Grade</option>
// //                         {options.grades.map((grade) => (
// //                            <option key={grade.id} value={grade.id}>
// //                               {grade.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                   <label>
// //                      RAM:
// //                      <select
// //                         name="ram"
// //                         value={formData.ram}
// //                         onChange={handleChange}
// //                      >
// //                         <option value="">Select RAM</option>
// //                         {options.rams.map((ram) => (
// //                            <option key={ram.id} value={ram.id}>
// //                               {ram.name}
// //                            </option>
// //                         ))}
// //                      </select>
// //                   </label>
// //                   <div className="checkbox-field">
// //                      <input
// //                         type="checkbox"
// //                         name="melding"
// //                         id="melding"
// //                         checked={formData.melding}
// //                         onChange={handleChange}
// //                      />
// //                      <label htmlFor="melding">Melding</label>
// //                   </div>
// //                </div>

// //                <div className="three-elements">
// //                   <label>
// //                      IMEI:
// //                      <input
// //                         type="text"
// //                         name="imei"
// //                         value={formData.imei}
// //                         onChange={handleChange}
// //                      />
// //                   </label>
// //                   <div className="checkbox-field">
// //                      <input
// //                         type="checkbox"
// //                         name="imeiValidity"
// //                         id="imeiValidity"
// //                         checked={imeiValidity}
// //                         onChange={(e) => setIMEIValidity(e.target.checked)}
// //                      />
// //                      <label htmlFor="imeiValidity">IMEI Validity</label>
// //                   </div>
// //                   {/* <div className="export-button-wrapper">
// //                      <input
// //                         type="file"
// //                         id="fileInput"
// //                         accept=".xlsx, .xls"
// //                         onChange={handleFileUpload}
// //                         style={{ display: "none" }}
// //                      />
// //                      <button
// //                         id="button-export-from-xls"
// //                         onClick={() =>
// //                            document.getElementById("fileInput").click()
// //                         }
// //                      >
// //                         Import from XLS
// //                      </button>
// //                   </div> */}
// //                </div>

// //                {/* <label> 123456789112345</label>
// //                <label> 111111111111111</label>
// //                <label>valid IMEI number: 356766086875164</label>
// //                <label>valid IMEI number: 353067102354511</label> */}
// //                {/* <button type="submit">Add Device(s) to DB</button> */}
// //             </div>
// //          </section>

// //          <section>
// //             <h2 className="section-title-table">Added Devices</h2>
// //             <DevicesTable devices={devices} setDevices={setDevices} />
// //          </section>
// //       </main>
// //    );
// // };

// // export default AddDevice;


// //    // const handleFileUpload = async (event) => {
// //    //    const file = event.target.files[0];
// //    //    if (!file) return;

// //    //    try {
// //    //       const data = await readExcelFile(file);
// //    //       console.log("Parsed data:", data);

// //    //       const response = await fetch(
// //    //          `${config.apiUrl}/devices/uploadfromexcel`,
// //    //          {
// //    //             method: "POST",
// //    //             headers: {
// //    //                "Content-Type": "application/json",
// //    //             },
// //    //             body: JSON.stringify({ data }),
// //    //          }
// //    //       );

// //    //       if (response.ok) {
// //    //          const result = await response.json();
// //    //          console.log("Upload successful:", result);
// //    //       } else {
// //    //          const errorMessage = await response.text();
// //    //          console.error("Failed to upload data:", errorMessage);
// //    //          alert(`Failed to upload data: ${errorMessage}`);
// //    //       }
// //    //    } catch (err) {
// //    //       console.error("Error handling file upload:", err);
// //    //       alert("Error handling file upload");
// //    //    }
// //    // };

// //    // // Function to read and parse the Excel file
// //    // const readExcelFile = (file) => {
// //    //    return new Promise((resolve, reject) => {
// //    //       const reader = new FileReader();

// //    //       reader.onload = (e) => {
// //    //          const data = new Uint8Array(e.target.result);
// //    //          const workbook = XLSX.read(data, { type: "array" });
// //    //          const sheetName = workbook.SheetNames[0];
// //    //          const worksheet = workbook.Sheets[sheetName];
// //    //          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
// //    //          resolve(jsonData);
// //    //       };

// //    //       reader.onerror = (error) => {
// //    //          reject(error);
// //    //       };

// //    //       reader.readAsArrayBuffer(file);
// //    //    });
// //    // };


// // // import React, { useState, useEffect } from "react";
// // // import DevicesTable from "../components/DevicesTable";
// // // import "./AddDevice.css";
// // // import { validateIMEI } from "../utils/validateIMEI";
// // // import { getCurrentDate } from "../utils/getCurrentDate";
// // // import config from "../utils/config";

// // // const AddDevice = () => {
// // //    const [formData, setFormData] = useState({
// // //       brand: "1",
// // //       model: "1",
// // //       ram: "1",
// // //       storage: "1",
// // //       color: "1",
// // //       grade: "1",
// // //       purchaseDate: getCurrentDate(),
// // //       status: "1",
// // //       catalog: "1",
// // //       melding: false,
// // //       imei: "",
// // //    });

// // //    const [imeiValidity, setIMEIValidity] = useState(false);

// // //    const [options, setOptions] = useState({
// // //       brands: [],
// // //       models: [],
// // //       rams: [],
// // //       storages: [],
// // //       colors: [],
// // //       grades: [],
// // //       statuses: [],
// // //       catalogs: [],
// // //    });

// // //    const [devices, setDevices] = useState([]);

// // //    useEffect(() => {
// // //       const fetchOptions = async () => {
// // //          try {
// // //             const response = await fetch(`${config.apiUrl}/selectoptions`);
// // //             const data = await response.json();
// // //             console.log("Options data:", data);
// // //             setOptions(data);
// // //          } catch (err) {
// // //             console.error("Failed to fetch options:", err);
// // //          }
// // //       };

// // //       fetchOptions();
// // //    }, []);

// // //    useEffect(() => {
// // //       console.log("imeiValidity:", imeiValidity);
// // //       if (formData.imei.length === 15) {
// // //          if (imeiValidity && !validateIMEI(formData.imei).isValid) {
// // //             alert(
// // //                "IMEI must be a valid 15-digit number with a valid checksum."
// // //             );
// // //             setFormData((prev) => ({
// // //                ...prev,
// // //                imei: "",
// // //             }));
// // //             return;
// // //          }
// // //          handleSubmit();
// // //       }
// // //    }, [formData.imei, imeiValidity]);

// // //    const handleChange = (e) => {
// // //       const { name, value, type, checked } = e.target;

// // //       if (type === "checkbox") {
// // //          setFormData((prev) => ({
// // //             ...prev,
// // //             [name]: checked,
// // //          }));

// // //          if (name === "imeiValidity") {
// // //             setIMEIValidity(checked);
// // //          }
// // //          return;
// // //       }

// // //       if (name === "imei") {
// // //          if (!/^\d*$/.test(value)) {
// // //             alert("IMEI must contain only numeric characters.");
// // //             return;
// // //          }
// // //       }

// // //       setFormData((prev) => ({
// // //          ...prev,
// // //          [name]: value,
// // //       }));
// // //    };

// // //    const handleSubmit = async () => {
// // //       console.log("Submitting form data:", formData);
// // //       console.log("formData.imei:", formData.imei);

// // //       try {
// // //          const response = await fetch(`${config.apiUrl}/devices`, {
// // //             method: "POST",
// // //             headers: {
// // //                "Content-Type": "application/json",
// // //             },
// // //             body: JSON.stringify({ ...formData }),
// // //          });

// // //          if (response.ok) {
// // //             const newDevice = await response.json();
// // //             setDevices([...devices, newDevice.data.device]);
// // //             setFormData((prev) => ({
// // //                ...prev,
// // //                imei: "",
// // //             }));
// // //          } else {
// // //             const errorMessage = await response.text();
// // //             console.error("Failed to add device:", errorMessage);
// // //             alert(`Failed to add device: ${errorMessage}`);
// // //             setFormData((prev) => ({
// // //                ...prev,
// // //                imei: "",
// // //             }));
// // //          }
// // //       } catch (err) {
// // //          console.error("Failed to add device:", err);
// // //       }
// // //    };

// // //    return (
// // //       <main id="app" className="add-device-container">
// // //          <section>
// // //             <h2 className="section-title">Add New Device</h2>
// // //             <div className="container-selects">
// // //                <div className="three-elements">
// // //                   <label>
// // //                      Brand:
// // //                      <select
// // //                         name="brand"
// // //                         value={formData.brand}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select Brand</option>
// // //                         {options.brands.map((brand) => (
// // //                            <option key={brand.id} value={brand.id}>
// // //                               {brand.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                   <label>
// // //                      Model:
// // //                      <select
// // //                         name="model"
// // //                         value={formData.model}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select Model</option>
// // //                         {options.models.map((model) => (
// // //                            <option key={model.id} value={model.id}>
// // //                               {model.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                   <label>
// // //                      Storage:
// // //                      <select
// // //                         name="storage"
// // //                         value={formData.storage}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select Storage</option>
// // //                         {options.storages.map((storage) => (
// // //                            <option key={storage.id} value={storage.id}>
// // //                               {storage.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                </div>

// // //                <div className="three-elements">
// // //                   <label>
// // //                      Status:
// // //                      <select
// // //                         name="status"
// // //                         value={formData.status}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select Status</option>
// // //                         {options.statuses.map((status) => (
// // //                            <option key={status.id} value={status.id}>
// // //                               {status.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                   <label>
// // //                      Catalog:
// // //                      <select
// // //                         name="catalog"
// // //                         value={formData.catalog}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select Catalog</option>
// // //                         {options.catalogs.map((catalog) => (
// // //                            <option key={catalog.id} value={catalog.id}>
// // //                               {catalog.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                   <label>
// // //                      Purchase Date:
// // //                      <input
// // //                         type="date"
// // //                         name="purchaseDate"
// // //                         value={formData.purchaseDate}
// // //                         onChange={handleChange}
// // //                      />
// // //                   </label>
// // //                </div>

// // //                <div className="three-elements">
// // //                   <label>
// // //                      Color:
// // //                      <select
// // //                         name="color"
// // //                         value={formData.color}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select Color</option>
// // //                         {options.colors.map((color) => (
// // //                            <option key={color.id} value={color.id}>
// // //                               {color.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                   <label>
// // //                      Grade:
// // //                      <select
// // //                         name="grade"
// // //                         value={formData.grade}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select Grade</option>
// // //                         {options.grades.map((grade) => (
// // //                            <option key={grade.id} value={grade.id}>
// // //                               {grade.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                   <label>
// // //                      RAM:
// // //                      <select
// // //                         name="ram"
// // //                         value={formData.ram}
// // //                         onChange={handleChange}
// // //                      >
// // //                         <option value="">Select RAM</option>
// // //                         {options.rams.map((ram) => (
// // //                            <option key={ram.id} value={ram.id}>
// // //                               {ram.name}
// // //                            </option>
// // //                         ))}
// // //                      </select>
// // //                   </label>
// // //                   <div className="checkbox-field">
// // //                      <input
// // //                         type="checkbox"
// // //                         name="melding"
// // //                         id="melding"
// // //                         checked={formData.melding}
// // //                         onChange={handleChange}
// // //                      />
// // //                      <label htmlFor="melding">Melding</label>
// // //                   </div>
// // //                </div>

// // //                <div className="three-elements">
// // //                   <label>
// // //                      IMEI:
// // //                      <input
// // //                         type="text"
// // //                         name="imei"
// // //                         value={formData.imei}
// // //                         onChange={handleChange}
// // //                      />
// // //                   </label>
// // //                   <div className="checkbox-field">
// // //                      <input
// // //                         type="checkbox"
// // //                         name="imeiValidity"
// // //                         id="imeiValidity"
// // //                         checked={imeiValidity}
// // //                         onChange={(e) => setIMEIValidity(e.target.checked)}
// // //                      />
// // //                      <label htmlFor="imeiValidity">IMEI Validity</label>
// // //                   </div>
// // //                   <div className="export-button-wrapper">
// // //                      <button id="button-export-from-xls">
// // //                         Export from XLS
// // //                      </button>
// // //                   </div>
// // //                </div>

// // //                {/* <label> 123456789112345</label>
// // //                <label> 111111111111111</label>
// // //                <label>valid IMEI number: 356766086875164</label>
// // //                <label>valid IMEI number: 353067102354511</label> */}
// // //                {/* <button type="submit">Add Device(s) to DB</button> */}
// // //             </div>
// // //          </section>

// // //          <section>
// // //             <h2 className="section-title-table">Added Devices</h2>
// // //             <DevicesTable devices={devices} setDevices={setDevices} />
// // //          </section>
// // //       </main>
// // //    );
// // // };

// // // export default AddDevice;
