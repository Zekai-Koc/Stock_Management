import React from "react";

const CheckboxField = ({ id, label, checked, onChange }) => {
   return (
      <div className="checkbox-field">
         <input
            type="checkbox"
            id={id}
            name={id}
            checked={checked}
            onChange={onChange}
         />
         <label htmlFor={id}>{label}</label>
      </div>
   );
};

export default CheckboxField;
