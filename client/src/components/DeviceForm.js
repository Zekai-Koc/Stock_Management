import React, { useState, useEffect } from 'react';
import '../styles/DeviceForm.css'; // Ensure you have your CSS imported

const DeviceForm = ({
  initialFormData,
  onSubmit,
  buttonText,
  formClass = 'device-form',
  labelClass = 'device-form-label',
  inputClass = 'device-form-input',
  textareaClass = 'device-form-textarea',
  checkboxWrapperClass = 'device-form-checkbox-wrapper',
  checkboxClass = 'device-form-checkbox',
  checkboxLabelClass = 'device-form-checkbox-label',
  submitButtonClass = 'device-form-submit-button',
}) => {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked,
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Function to format date as yyyy-MM-dd for input[type="date"]
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to handle null values
  const getValue = (value) => (value === null ? '' : value);

  return (
    <form className={formClass} onSubmit={handleSubmit}>
      <div className="device-form-row">
        <label className={labelClass}>
          Brand:
          <input
            type="text"
            name="brand"
            value={getValue(formData.brand)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Model:
          <input
            type="text"
            name="model"
            value={getValue(formData.model)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Storage:
          <input
            type="number"
            name="storage"
            value={getValue(formData.storage)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
      </div>

      <div className="device-form-row">
        <label className={labelClass}>
          RAM:
          <input
            type="number"
            name="ram"
            value={getValue(formData.ram)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Color:
          <input
            type="text"
            name="color"
            value={getValue(formData.color)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Grade:
          <input
            type="text"
            name="grade"
            value={getValue(formData.grade)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
      </div>

      <div className="device-form-row">
        <label className={labelClass}>
          Status:
          <input
            type="text"
            name="status"
            value={getValue(formData.status)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Catalog:
          <input
            type="text"
            name="catalog"
            value={getValue(formData.catalog)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Purchase Date:
          <input
            type="date"
            name="purchaseDate"
            value={formatDate(formData.purchaseDate)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
      </div>

      <div className="device-form-row">
        <label className={labelClass}>
          IMEI:
          <input
            type="text"
            name="imei"
            value={getValue(formData.imei)}
            onChange={handleChange}
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          Cost:
          <input
            type="number"
            name="cost"
            value={getValue(formData.cost)}
            onChange={handleChange}
            step="0.01"
            // min="0"
            className={inputClass}
          />
        </label>
        <div className={checkboxWrapperClass}>
          <input
            type="checkbox"
            name="melding"
            id="melding"
            checked={formData.melding}
            onChange={handleChange}
            className={checkboxClass}
          />
          <label htmlFor="melding" className={checkboxLabelClass}>
            Melding
          </label>
        </div>
      </div>

      <div className="device-form-row">
        <label className={labelClass}>
          Notes:
          <textarea
            name="notes"
            value={getValue(formData.notes)}
            onChange={handleChange}
            className={textareaClass}
          />
        </label>
      </div>

      <button type="submit" className={submitButtonClass}>
        {buttonText}
      </button>
    </form>
  );
};

export default DeviceForm;




// import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate, useParams } from "react-router-dom";
// import "../styles/DeviceForm.css";
// import { getCurrentDate } from "../utils/getCurrentDate";
// import config from "../utils/config";

// const DeviceForm = ({ initialFormData, onSubmit, buttonText }) => {
//    const [formData, setFormData] = useState(initialFormData.device);

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
//       await onSubmit(formData);
//    };

//    return (
//       <div className="device-form">
//          <div className="device-form-row">
//             <label className="device-form-label">
//                Brand:
//                <input
//                   type="text"
//                   name="brand"
//                   value={formData.brand}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//             <label className="device-form-label">
//                Model:
//                <input
//                   type="text"
//                   name="model"
//                   value={formData.model}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//             <label className="device-form-label">
//                Storage:
//                <input
//                   type="number"
//                   name="storage"
//                   value={formData.storage}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//          </div>

//          <div className="device-form-row">
//             <label className="device-form-label">
//                Color:
//                <input
//                   type="text"
//                   name="color"
//                   value={formData.color}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//             <label className="device-form-label">
//                Grade:
//                <input
//                   type="text"
//                   name="grade"
//                   value={formData.grade}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//             <label className="device-form-label">
//                RAM:
//                <input
//                   type="number"
//                   name="ram"
//                   value={formData.ram}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//          </div>

//          <div className="device-form-row">
//             <label className="device-form-label">
//                Status:
//                <input
//                   type="text"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//             <label className="device-form-label">
//                Catalog:
//                <input
//                   type="text"
//                   name="catalog"
//                   value={formData.catalog}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//             <label className="device-form-label">
//                Purchase Date:
//                <input
//                   type="date"
//                   name="purchaseDate"
//                   value={formData.purchaseDate}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//          </div>

//          <div className="device-form-row">
//             <label className="device-form-label">
//                IMEI:
//                <input
//                   type="text"
//                   name="imei"
//                   value={formData.imei}
//                   onChange={handleChange}
//                   className="device-form-input"
//                />
//             </label>
//             <label className="device-form-label">
//                Cost:
//                <input
//                   type="number"
//                   name="cost"
//                   value={formData.cost}
//                   onChange={handleChange}
//                   step="0.01"
//                   min="0"
//                   className="device-form-input"
//                />
//             </label>
//             <div className="device-form-checkbox-wrapper">
//                <input
//                   type="checkbox"
//                   name="melding"
//                   id="melding"
//                   checked={formData.melding}
//                   onChange={handleChange}
//                   className="device-form-checkbox"
//                />
//                <label htmlFor="melding" className="device-form-checkbox-label">
//                   Melding
//                </label>
//             </div>
//          </div>

//          <div className="device-form-row">
//             <label className="device-form-label">
//                Notes:
//                <textarea
//                   name="notes"
//                   value={formData.notes}
//                   onChange={handleChange}
//                   className="device-form-textarea"
//                />
//             </label>
//          </div>

//          <button
//             type="button"
//             onClick={handleSubmit}
//             className="device-form-submit-button"
//          >
//             {buttonText}
//          </button>
//       </div>
//    );
// };

// export default DeviceForm;