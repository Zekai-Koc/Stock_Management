// UpdateDeviceStatus.js
import React, { useState, useEffect } from "react";
import DevicesTable from "../components/DevicesTable";

const UpdateDeviceStatus = () => {

   const [status, setStatus] = useState();
   const [statusArray, setStatusArray] = useState([]);

   useEffect(() => {
      const fetchOptions = async () => {
         try {
            const response = await fetch(
               "http://192.168.178.185:7000/api/v1/selectoptions/statuses"
            );
            const data = await response.json();
            console.log("Options data:", data);
            setStatusArray(data);
         } catch (err) {
            console.error("Failed to fetch options:", err);
         }
      };

      fetchOptions();
   }, []);

   return (
      <div>
         <h1>UpdateDeviceStatus </h1>

         <div className="three-elements">
            <label>
               IMEI:
               <input
                  type="text"
                  name="imei"
               // value={formData.imei}
               // onChange={handleChange}
               />
            </label>

            <label>
               Status:
               <select
                  name="status"
               // value={formData.status}
               // onChange={handleChange}
               >
                  <option value="">Select Status</option>
                  {/* {options.statuses.map((status) => (
                           <option key={status.id} value={status.id}>
                              {status.name}
                           </option>
                        ))} */}
               </select>
            </label>         
         </div>

         <section>
            <h2 className="section-title-table">Updated Devices</h2>
            {/* <DevicesTable
               devices={transformDevices(devices)}
               setDevices={setDevices}
            /> */}
         </section>

      </div>


   );
};

export default UpdateDeviceStatus;
