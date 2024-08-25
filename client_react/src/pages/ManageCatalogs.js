import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../utils/config";
import "./ManageCatalogs.css";

const ManageCatalogs = () => {
   const [catalogs, setCatalogs] = useState([]);
   const [newCatalog, setNewCatalog] = useState("");
   const [editCatalogId, setEditCatalogId] = useState(null);
   const [editCatalogName, setEditCatalogName] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      fetchCatalogs();
   }, []);

   const fetchCatalogs = async () => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/catalogs`);
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         const data = await response.json();
         setCatalogs(data);
      } catch (error) {
         setError("Failed to fetch catalogs.");
         console.error("Failed to fetch catalogs:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleAddCatalog = async () => {
      if (!newCatalog) return;
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/catalogs`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newCatalog }),
         });

         if (!response.ok) {
            throw new Error("Failed to add catalog");
         }
         setNewCatalog("");
         fetchCatalogs();
         setSuccess("Catalog added successfully!");
      } catch (error) {
         setError("Failed to add catalog.");
         console.error("Failed to add catalog:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteCatalog = async (id) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/catalogs/${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Failed to delete catalog");
         }
         fetchCatalogs();
         setSuccess("Catalog deleted successfully!");
      } catch (error) {
         setError("Failed to delete catalog.");
         console.error("Failed to delete catalog:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleUpdateCatalog = async () => {
      if (!editCatalogName) return;
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(
            `${config.apiUrl}/catalogs/${editCatalogId}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ name: editCatalogName }),
            }
         );

         if (!response.ok) {
            throw new Error("Failed to update catalog");
         }
         setEditCatalogId(null);
         setEditCatalogName("");
         fetchCatalogs();
         setSuccess("Catalog updated successfully!");
      } catch (error) {
         setError("Failed to update catalog.");
         console.error("Failed to update catalog:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="manage-catalogs-container">
         <h1>Manage Catalogs</h1>
         {loading && <p>Loading...</p>}
         {error && <p className="error">{error}</p>}
         {success && <p className="success">{success}</p>}
         <div>
            <input
               type="text"
               value={newCatalog}
               onChange={(e) => setNewCatalog(e.target.value)}
               placeholder="New catalog name"
            />
            <button onClick={handleAddCatalog} disabled={loading}>
               Add Catalog
            </button>
         </div>
         <div>
            {editCatalogId && (
               <div>
                  <input
                     type="text"
                     value={editCatalogName}
                     onChange={(e) => setEditCatalogName(e.target.value)}
                     placeholder="Update catalog name"
                  />
                  <button onClick={handleUpdateCatalog} disabled={loading}>
                     Update Catalog
                  </button>
                  <button
                     className="cancel"
                     onClick={() => setEditCatalogId(null)}
                     disabled={loading}
                  >
                     Cancel
                  </button>
               </div>
            )}
         </div>
         <ul>
            {catalogs.map((catalog) => (
               <li key={catalog.id}>
                  {editCatalogId === catalog.id ? (
                     <span>{editCatalogName}</span>
                  ) : (
                     <span>{catalog.name}</span>
                  )}
                  <button
                     onClick={() => handleDeleteCatalog(catalog.id)}
                     disabled={loading}
                  >
                     Delete
                  </button>
                  <button
                     onClick={() => {
                        setEditCatalogId(catalog.id);
                        setEditCatalogName(catalog.name);
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

export default ManageCatalogs;
