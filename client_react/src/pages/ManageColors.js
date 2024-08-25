import React, { useState, useEffect } from "react";
import config from "../utils/config";
import "./ManageColors.css";

const ManageColors = () => {
   const [colors, setColors] = useState([]);
   const [newColor, setNewColor] = useState("");
   const [editColorId, setEditColorId] = useState(null);
   const [editColorName, setEditColorName] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);

   useEffect(() => {
      fetchColors();
   }, []);

   const fetchColors = async () => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/colors`);
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         const data = await response.json();
         setColors(data);
      } catch (error) {
         setError("Failed to fetch Colors.");
         console.error("Failed to fetch Colors:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleAddColor = async () => {
      if (!newColor) return;
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/colors`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newColor }),
         });

         if (!response.ok) {
            throw new Error("Failed to add Color");
         }
         setNewColor("");
         fetchColors();
         setSuccess("Color added successfully!");
      } catch (error) {
         setError("Failed to add Color.");
         console.error("Failed to add Color:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteColor = async (id) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/colors/${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Failed to delete Color");
         }
         fetchColors();
         setSuccess("Color deleted successfully!");
      } catch (error) {
         setError("Failed to delete Color.");
         console.error("Failed to delete Color:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleUpdateColor = async () => {
      if (!editColorName) return;
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(
            `${config.apiUrl}/colors/${editColorId}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ name: editColorName }),
            }
         );

         if (!response.ok) {
            throw new Error("Failed to update Color");
         }
         setEditColorId(null);
         setEditColorName("");
         fetchColors();
         setSuccess("Color updated successfully!");
      } catch (error) {
         setError("Failed to update Color.");
         console.error("Failed to update Color:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="manage-colors-container">
         <h1>Manage Colors</h1>
         {loading && <p>Loading...</p>}
         {error && <p className="error">{error}</p>}
         {success && <p className="success">{success}</p>}
         <div>
            <input
               type="text"
               value={newColor}
               onChange={(e) => setNewColor(e.target.value)}
               placeholder="New Color name"
            />
            <button onClick={handleAddColor} disabled={loading}>
               Add Color
            </button>
         </div>
         <div>
            {editColorId && (
               <div>
                  <input
                     type="text"
                     value={editColorName}
                     onChange={(e) => setEditColorName(e.target.value)}
                     placeholder="Update Color name"
                  />
                  <button onClick={handleUpdateColor} disabled={loading}>
                     Update Color
                  </button>
                  <button
                     className="cancel"
                     onClick={() => setEditColorId(null)}
                     disabled={loading}
                  >
                     Cancel
                  </button>
               </div>
            )}
         </div>
         <ul>
            {colors.map((Color) => (
               <li key={Color.id}>
                  {editColorId === Color.id ? (
                     <span>{editColorName}</span>
                  ) : (
                     <span>{Color.name}</span>
                  )}
                  <button
                     onClick={() => handleDeleteColor(Color.id)}
                     disabled={loading}
                  >
                     Delete
                  </button>
                  <button
                     onClick={() => {
                        setEditColorId(Color.id);
                        setEditColorName(Color.name);
                     }}
                     disabled={loading}
                  >
                     Edit
                  </button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default ManageColors;
