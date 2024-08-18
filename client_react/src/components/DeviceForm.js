import React from "react";
import FormField from "./FormField";
// import CheckboxField from "./CheckboxField";
import "./DeviceForm.css";

const DeviceForm = ({ formData, options, onChange, onSubmit }) => {
   return (
      <form id="deviceForm" onSubmit={onSubmit}>
         <FormField
            id="brand"
            label="Brand"
            type="select"
            value={formData.brand}
            options={options.brands}
            onChange={onChange}
         />
         <FormField
            id="model"
            label="Model"
            type="select"
            value={formData.model}
            options={options.models}
            onChange={onChange}
         />
         <FormField
            id="ram"
            label="RAM"
            type="select"
            value={formData.ram}
            options={options.rams}
            onChange={onChange}
         />
         <FormField
            id="storage"
            label="Storage Capacity"
            type="select"
            value={formData.storage}
            options={options.storages}
            onChange={onChange}
         />
         <FormField
            id="color"
            label="Color"
            type="select"
            value={formData.color}
            options={options.colors}
            onChange={onChange}
         />
         <FormField
            id="grade"
            label="Grade"
            type="select"
            value={formData.grade}
            options={options.grades}
            onChange={onChange}
         />
         <FormField
            id="purchaseDate"
            label="Purchase Date"
            type="date"
            value={formData.purchaseDate}
            onChange={onChange}
         />
         <FormField
            id="status"
            label="Status"
            type="select"
            value={formData.status}
            options={options.statuses}
            onChange={onChange}
         />
         <FormField
            id="catalog"
            label="Catalog"
            type="select"
            value={formData.catalog}
            options={options.catalogs}
            onChange={onChange}
         />
         <FormField
            id="imei"
            label="IMEI"
            type="text"
            value={formData.imei}
            onChange={onChange}
         />

         {/* <div id="spacer-div"></div> */}
         <div className="checkbox-field">
            <input
               type="checkbox"
               name="imeiValidity"
               id="imeiValidity"
               label="IMEI Validity"
               checked={formData.imeiValidity}
               onChange={onChange}
            />
            <label htmlFor="imeiValidity">IMEI Validity</label>
         </div>
         <div className="checkbox-field">
            <input
               type="checkbox"
               name="melding"
               id="melding"
               label="Melding"
               checked={formData.melding}
               onChange={onChange}
            />
            <label htmlFor="melding">Melding</label>
         </div>
         {/* <button type="submit">Add Device(s) to DB</button> */}
      </form>
   );
};

export default DeviceForm;
