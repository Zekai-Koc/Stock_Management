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