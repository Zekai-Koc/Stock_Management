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