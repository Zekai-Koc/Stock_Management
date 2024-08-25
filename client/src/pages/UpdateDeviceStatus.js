import React, { useState, useEffect } from "react";
import DevicesTable from "../components/DevicesTable";
import config from "../utils/config";

const UpdateDeviceStatus = () => {
   const [imei, setIMEI] = useState("");
   const [status, setStatus] = useState(1);
   const [statusArray, setStatusArray] = useState([]);
   const [devices, setDevices] = useState([]);

   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(
               `${config.apiUrl}/selectoptions/statuses`
            );
            const data = await response.json();
            setStatusArray(data.statuses);
         } catch (err) {
            console.error("Failed to fetch options:", err);
         }
      };

      fetchOptions();
   }, []);

   useEffect(() => {
      if (imei.length === 15) {
         handleUpdateStatus();
      }
   }, [imei]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "imei") {
         if (!/^\d*$/.test(value)) {
            alert("IMEI must contain only numeric characters.");
            return;
         }
         setIMEI(value);
      } else if (name === "status") {
         setStatus(value);
      }
   };

   const handleUpdateStatus = async () => {
      console.log(
         "Updating device status with IMEI:",
         imei,
         "and status:",
         status
      );

      try {
         const response = await fetch(
            `${config.apiUrl}/devices/updatedevicestatus/${imei}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ status }),
            }
         );

         if (response.ok) {
            const updatedDevice = await response.json();
            console.log("Device status updated:", updatedDevice);

            // Clear IMEI field and focus
            setIMEI("");
            document.querySelector('input[name="imei"]').focus();

            // Optionally update the devices list if needed
            setDevices((prevDevices) => [...prevDevices, updatedDevice]);
         } else {
            const errorMessage = await response.text();
            console.error("Failed to update device status:", errorMessage);
            alert(`Failed to update device status: ${errorMessage}`);
         }
      } catch (err) {
         console.error("Failed to update device status:", err);
      }
   };

   return (
      <div>
         <h1>Update Device Status</h1>

         <div className="three-elements">
            <label>
               IMEI:
               <input
                  type="text"
                  name="imei"
                  value={imei}
                  onChange={handleChange}
               />
            </label>

            <label>
               Status:
               <select name="status" value={status} onChange={handleChange}>
                  <option value="">Select Status</option>
                  {statusArray.map((statusItem) => (
                     <option key={statusItem.id} value={statusItem.id}>
                        {statusItem.name}
                     </option>
                  ))}
               </select>
            </label>
         </div>

         {/* Display updated devices in a table */}
         <section>
            <h2 className="section-title-table">Updated Devices</h2>
            <DevicesTable devices={devices} setDevices={setDevices} />
         </section>
      </div>
   );
};

export default UpdateDeviceStatus;

// import React, { useState, useEffect } from "react";
// import config from "../utils/config";

// const UpdateDeviceStatus = () => {
//    const [imei, setIMEI] = useState("");
//    const [status, setStatus] = useState(1);
//    const [statusArray, setStatusArray] = useState([]);

//    useEffect(() => {
//       const fetchOptions = async () => {
//          try {
//             const response = await fetch(
//                `${config.apiUrl}/selectoptions/statuses`
//             );
//             const data = await response.json();
//             // console.log("Options data:", data);
//             setStatusArray(data.statuses);
//          } catch (err) {
//             console.error("Failed to fetch options:", err);
//          }
//       };

//       fetchOptions();
//    }, []);

//    useEffect(() => {
//       if (imei.length === 15) {
//          handleUpdateStatus();
//       }
//    }, [imei]);

//    const handleChange = (e) => {
//       const { name, value } = e.target;
//       if (name === "imei") {
//          if (!/^\d*$/.test(value)) {
//             alert("IMEI must contain only numeric characters.");
//             return;
//          }
//          setIMEI(value);
//       } else if (name === "status") {
//          setStatus(value);
//       }
//    };

//    const handleUpdateStatus = async () => {
//       console.log(
//          "Updating device status with IMEI:",
//          imei,
//          "and status:",
//          status
//       );

//       try {
//          const response = await fetch(
//             `${config.apiUrl}/devices/updatedevicestatus/${imei}`,
//             {
//                method: "PATCH",
//                headers: {
//                   "Content-Type": "application/json",
//                },
//                body: JSON.stringify({ status }),
//             }
//          );

//          if (response.ok) {
//             const updatedDevice = await response.json();
//             console.log("Device status updated:", updatedDevice);
//             // Handle successful update here, e.g., show a success message or update UI
//          } else {
//             const errorMessage = await response.text();
//             console.error("Failed to update device status:", errorMessage);
//             alert(`Failed to update device status: ${errorMessage}`);
//          }
//       } catch (err) {
//          console.error("Failed to update device status:", err);
//       }
//    };

//    return (
//       <div>
//          <h1>Update Device Status</h1>

//          <div className="three-elements">
//             <label>
//                IMEI:
//                <input
//                   type="text"
//                   name="imei"
//                   value={imei}
//                   onChange={handleChange}
//                />
//             </label>

//             <label>
//                Status:
//                <select name="status" value={status} onChange={handleChange}>
//                   <option value="">Select Status</option>
//                   {statusArray.map((statusItem) => (
//                      <option key={statusItem.id} value={statusItem.id}>
//                         {statusItem.name}
//                      </option>
//                   ))}
//                </select>
//             </label>
//          </div>

//          {/* Section for displaying updated devices can be added here */}
//       </div>
//    );
// };

// export default UpdateDeviceStatus;

// // // UpdateDeviceStatus.js
// // import React, { useState, useEffect } from "react";
// // import DevicesTable from "../components/DevicesTable";
// // import config from "../utils/config";

// // const UpdateDeviceStatus = () => {
// //    const [status, setStatus] = useState();
// //    const [statusArray, setStatusArray] = useState([]);

// //    useEffect(() => {
// //       const fetchOptions = async () => {
// //          try {
// //             const response = await fetch(
// //                `${config.apiUrl}/selectoptions/statuses`
// //             );
// //             const data = await response.json();
// //             console.log("Options data:", data);
// //             setStatusArray(data);
// //          } catch (err) {
// //             console.error("Failed to fetch options:", err);
// //          }
// //       };

// //       fetchOptions();
// //    }, []);

// //    return (
// //       <div>
// //          <h1>UpdateDeviceStatus </h1>

// //          <div className="three-elements">
// //             <label>
// //                IMEI:
// //                <input
// //                   type="text"
// //                   name="imei"
// //                   // value={formData.imei}
// //                   // onChange={handleChange}
// //                />
// //             </label>

// //             <label>
// //                Status:
// //                <select
// //                   name="status"
// //                   // value={formData.status}
// //                   // onChange={handleChange}
// //                >
// //                   <option value="">Select Status</option>
// //                   {statusArray.statuses.map((status) => (
// //                      <option key={status.id} value={status.id}>
// //                         {status.name}
// //                      </option>
// //                   ))}
// //                </select>
// //             </label>
// //          </div>

// //          <section>
// //             <h2 className="section-title-table">Updated Devices</h2>
// //             {/* <DevicesTable
// //                devices={transformDevices(devices)}
// //                setDevices={setDevices}
// //             /> */}
// //          </section>
// //       </div>
// //    );
// // };

// // export default UpdateDeviceStatus;
