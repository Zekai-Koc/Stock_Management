import React, { useState, useEffect } from "react";
import DeviceForm from "../components/DeviceForm";
import DevicesTable from "../components/DevicesTable";
import "./AddDevice.css";

const AddDevice = () => {
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
   });

   const [imei, setIMEI] = useState("");
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
            setOptions(data);
         } catch (err) {
            console.error("Failed to fetch options:", err);
         }
      };

      fetchOptions();
   }, []);

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (name === "imei") {
         setIMEI(value);
         if (value.length === 15) {
            handleSubmit(e);
         }
      } else {
         setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
         });
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
            console.log("New device added:", newDevice);
            setDevices([...devices, newDevice.data.device]);
            setIMEI("");
         } else {
            const errorMessage = await response.text();
            console.error("Failed to add device", errorMessage);
            alert(`Failed to add device: ${errorMessage}`);
            setIMEI("");
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
            <DeviceForm
               formData={{ ...formData, imei }}
               options={options}
               onChange={handleChange}
               onSubmit={handleSubmit}
            />
         </section>

         <section>
            <h2 className="section-title">Added Devices List</h2>
            <DevicesTable devices={transformDevices(devices)} />
         </section>
      </main>
   );
};

export default AddDevice;

// import React, { useState, useEffect } from "react";
// import DeviceForm from "../components/DeviceForm";
// import DevicesTable from "../components/DevicesTable";
// import "./AddDevice.css"; // Import CSS for styling

// const AddDevice = () => {
//    // State for form fields except IMEI
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

//    // State for IMEI input
//    const [imei, setIMEI] = useState("");

//    // State for dropdown options
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

//    // State for devices list
//    const [devices, setDevices] = useState([]);

//    // Fetch dropdown options
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

//    // Handle form input change
//    const handleChange = (e) => {
//       const { name, value, type, checked } = e.target;
//       if (name === "imei") {
//          setIMEI(value);
//          // Automatically submit the form if IMEI length reaches 15
//          if (value.length === 15) {
//             handleSubmit(e); // Use the event object to prevent default action
//          }
//       } else {
//          setFormData({
//             ...formData,
//             [name]: type === "checkbox" ? checked : value,
//          });
//       }
//    };

//    // Handle form submission
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

//             // Reset the form data
//             // setFormData({
//             //    brand: "",
//             //    model: "",
//             //    ram: "",
//             //    storage: "",
//             //    color: "",
//             //    grade: "",
//             //    purchaseDate: "",
//             //    status: "",
//             //    catalog: "",
//             //    melding: false,
//             // });

//             // Reset the IMEI field
//             setIMEI("");
//          } else {
//             console.error("Failed to add device");
//             setIMEI("");
//          }
//       } catch (err) {
//          console.error("Failed to add device:", err);
//       }
//    };

//    return (
//       <main id="app" className="add-device-container">
//          <section>
//             <h2 className="section-title">Add New Device</h2>
//             <DeviceForm
//                formData={{ ...formData, imei }}
//                options={options}
//                onChange={handleChange}
//                onSubmit={handleSubmit}
//             />
//          </section>

//          <section>
//             <h2 className="section-title">Devices List</h2>
//             <DevicesTable devices={devices} />
//          </section>
//       </main>
//    );
// };

// export default AddDevice;
