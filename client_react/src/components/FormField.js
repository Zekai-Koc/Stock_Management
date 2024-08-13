import React from "react";

const FormField = ({ id, label, type, value, options, onChange }) => {
   return (
      <div className="form-field">
         <label htmlFor={id}>{label}:</label>
         {type === "select" ? (
            <select
               id={id}
               name={id}
               value={value}
               onChange={onChange}
               required
            >
               <option value="">Select {label.toLowerCase()}...</option>
               {options.map((option) => (
                  <option key={option.id} value={option.id}>
                     {option.name}
                  </option>
               ))}
            </select>
         ) : (
            <input
               type={type}
               id={id}
               name={id}
               value={value}
               onChange={onChange}
               required
            />
         )}
      </div>
   );
};

export default FormField;
