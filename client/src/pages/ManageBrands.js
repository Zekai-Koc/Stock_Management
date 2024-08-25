import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../utils/config";
import "./ManageBrands.css";

const ManageBrands = () => {
   const [brands, setBrands] = useState([]);
   const [newBrand, setNewBrand] = useState("");
   const [editBrandId, setEditBrandId] = useState(null);
   const [editBrandName, setEditBrandName] = useState("");
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [success, setSuccess] = useState(null);
   const navigate = useNavigate();

   useEffect(() => {
      fetchBrands();
   }, []);

   const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/brands`);
         if (!response.ok) {
            throw new Error("Network response was not ok.");
         }
         const data = await response.json();
         setBrands(data);
      } catch (error) {
         setError("Failed to fetch brands.");
         console.error("Failed to fetch brands:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleAddBrand = async () => {
      if (!newBrand) return;
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/brands`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newBrand }),
         });

         if (!response.ok) {
            throw new Error("Failed to add brand");
         }
         setNewBrand("");
         fetchBrands();
         setSuccess("Brand added successfully!");
      } catch (error) {
         setError("Failed to add brand.");
         console.error("Failed to add brand:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteBrand = async (id) => {
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(`${config.apiUrl}/brands/${id}`, {
            method: "DELETE",
         });

         if (!response.ok) {
            throw new Error("Failed to delete brand");
         }
         fetchBrands();
         setSuccess("Brand deleted successfully!");
      } catch (error) {
         setError("Failed to delete brand.");
         console.error("Failed to delete brand:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleUpdateBrand = async () => {
      if (!editBrandName) return;
      setLoading(true);
      setError(null);
      try {
         const response = await fetch(
            `${config.apiUrl}/brands/${editBrandId}`,
            {
               method: "PATCH",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ name: editBrandName }),
            }
         );

         if (!response.ok) {
            throw new Error("Failed to update brand");
         }
         setEditBrandId(null);
         setEditBrandName("");
         fetchBrands();
         setSuccess("Brand updated successfully!");
      } catch (error) {
         setError("Failed to update brand.");
         console.error("Failed to update brand:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="manage-brands-container">
         <h1>Manage Brands</h1>
         {loading && <p>Loading...</p>}
         {error && <p className="error">{error}</p>}
         {success && <p className="success">{success}</p>}
         <div>
            <input
               type="text"
               value={newBrand}
               onChange={(e) => setNewBrand(e.target.value)}
               placeholder="New brand name"
            />
            <button onClick={handleAddBrand} disabled={loading}>
               Add Brand
            </button>
         </div>
         <div>
            {editBrandId && (
               <div>
                  <input
                     type="text"
                     value={editBrandName}
                     onChange={(e) => setEditBrandName(e.target.value)}
                     placeholder="Update brand name"
                  />
                  <button onClick={handleUpdateBrand} disabled={loading}>
                     Update Brand
                  </button>
                  <button
                     className="cancel"
                     onClick={() => setEditBrandId(null)}
                     disabled={loading}
                  >
                     Cancel
                  </button>
               </div>
            )}
         </div>
         <ul>
            {brands.map((brand) => (
               <li key={brand.id}>
                  {editBrandId === brand.id ? (
                     <span>{editBrandName}</span>
                  ) : (
                     <span>{brand.name}</span>
                  )}
                  <button
                     onClick={() => handleDeleteBrand(brand.id)}
                     disabled={loading}
                  >
                     Delete
                  </button>
                  <button
                     onClick={() => {
                        setEditBrandId(brand.id);
                        setEditBrandName(brand.name);
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

export default ManageBrands;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import config from "../utils/config";
// import "./ManageBrands.css"; // Import the CSS file

// const ManageBrands = () => {
//    const [brands, setBrands] = useState([]);
//    const [newBrand, setNewBrand] = useState("");
//    const [editBrandId, setEditBrandId] = useState(null);
//    const [editBrandName, setEditBrandName] = useState("");
//    const navigate = useNavigate();

//    useEffect(() => {
//       fetchBrands();
//    }, []);

//    const fetchBrands = async () => {
//       try {
//          const response = await fetch(`${config.apiUrl}/brands`);
//          if (!response.ok) {
//             throw new Error("Network response was not ok.");
//          }
//          const data = await response.json();
//          setBrands(data);
//       } catch (error) {
//          console.error("Failed to fetch brands:", error);
//       }
//    };

//    const handleAddBrand = async () => {
//       if (!newBrand) return;
//       try {
//          const response = await fetch(`${config.apiUrl}/brands`, {
//             method: "POST",
//             headers: {
//                "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ name: newBrand }),
//          });

//          if (!response.ok) {
//             throw new Error("Failed to add brand");
//          }
//          setNewBrand("");
//          fetchBrands();
//       } catch (error) {
//          console.error("Failed to add brand:", error);
//       }
//    };

//    const handleDeleteBrand = async (id) => {
//       try {
//          const response = await fetch(`${config.apiUrl}/brands/${id}`, {
//             method: "DELETE",
//          });

//          if (!response.ok) {
//             throw new Error("Failed to delete brand");
//          }
//          fetchBrands();
//       } catch (error) {
//          console.error("Failed to delete brand:", error);
//       }
//    };

//    const handleUpdateBrand = async () => {
//       if (!editBrandName) return;
//       try {
//          const response = await fetch(
//             `${config.apiUrl}/brands/${editBrandId}`,
//             {
//                method: "PATCH",
//                headers: {
//                   "Content-Type": "application/json",
//                },
//                body: JSON.stringify({ name: editBrandName }),
//             }
//          );

//          if (!response.ok) {
//             throw new Error("Failed to update brand");
//          }
//          setEditBrandId(null);
//          setEditBrandName("");
//          fetchBrands();
//       } catch (error) {
//          console.error("Failed to update brand:", error);
//       }
//    };

//    return (
//       <div className="manage-brands-container">
//          <h1>Manage Brands</h1>
//          <div>
//             <input
//                type="text"
//                value={newBrand}
//                onChange={(e) => setNewBrand(e.target.value)}
//                placeholder="New brand name"
//             />
//             <button onClick={handleAddBrand}>Add Brand</button>
//          </div>
//          <div>
//             {editBrandId && (
//                <div>
//                   <input
//                      type="text"
//                      value={editBrandName}
//                      onChange={(e) => setEditBrandName(e.target.value)}
//                      placeholder="Update brand name"
//                   />
//                   <button onClick={handleUpdateBrand}>Update Brand</button>
//                   <button
//                      className="cancel"
//                      onClick={() => setEditBrandId(null)}
//                   >
//                      Cancel
//                   </button>
//                </div>
//             )}
//          </div>
//          <ul>
//             {brands.map((brand) => (
//                <li key={brand.id}>
//                   {editBrandId === brand.id ? (
//                      <span>{editBrandName}</span>
//                   ) : (
//                      <span>{brand.name}</span>
//                   )}
//                   <button onClick={() => handleDeleteBrand(brand.id)}>
//                      Delete
//                   </button>
//                   <button
//                      onClick={() => {
//                         setEditBrandId(brand.id);
//                         setEditBrandName(brand.name);
//                      }}
//                   >
//                      Edit
//                   </button>
//                </li>
//             ))}
//          </ul>
//       </div>
//    );
// };

// export default ManageBrands;

// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import config from "../utils/config";

// // const ManageBrands = () => {
// //    const [brands, setBrands] = useState([]);
// //    const [newBrand, setNewBrand] = useState("");
// //    const [editBrandId, setEditBrandId] = useState(null);
// //    const [editBrandName, setEditBrandName] = useState("");
// //    const navigate = useNavigate();

// //    useEffect(() => {
// //       fetchBrands();
// //    }, []);

// //    const fetchBrands = async () => {
// //       try {
// //          const response = await fetch(`${config.apiUrl}/brands`);
// //          if (!response.ok) {
// //             throw new Error("Network response was not ok.");
// //          }
// //          const data = await response.json();
// //          setBrands(data);
// //       } catch (error) {
// //          console.error("Failed to fetch brands:", error);
// //       }
// //    };

// //    const handleAddBrand = async () => {
// //       if (!newBrand) return;
// //       try {
// //          const response = await fetch(`${config.apiUrl}/brands`, {
// //             method: "POST",
// //             headers: {
// //                "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ name: newBrand }),
// //          });

// //          if (!response.ok) {
// //             throw new Error("Failed to add brand");
// //          }
// //          setNewBrand("");
// //          fetchBrands();
// //       } catch (error) {
// //          console.error("Failed to add brand:", error);
// //       }
// //    };

// //    const handleDeleteBrand = async (id) => {
// //       try {
// //          const response = await fetch(`${config.apiUrl}/brands/${id}`, {
// //             method: "DELETE",
// //          });

// //          if (!response.ok) {
// //             throw new Error("Failed to delete brand");
// //          }
// //          fetchBrands();
// //       } catch (error) {
// //          console.error("Failed to delete brand:", error);
// //       }
// //    };

// //    const handleUpdateBrand = async () => {
// //       if (!editBrandName) return;
// //       try {
// //          const response = await fetch(`${config.apiUrl}/brands${editBrandId}`, {
// //             method: "PUT",
// //             headers: {
// //                "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ name: editBrandName }),
// //          });

// //          if (!response.ok) {
// //             throw new Error("Failed to update brand");
// //          }
// //          setEditBrandId(null);
// //          setEditBrandName("");
// //          fetchBrands();
// //       } catch (error) {
// //          console.error("Failed to update brand:", error);
// //       }
// //    };

// //    return (
// //       <div>
// //          <h1>Manage Brands</h1>
// //          <div>
// //             <input
// //                type="text"
// //                value={newBrand}
// //                onChange={(e) => setNewBrand(e.target.value)}
// //                placeholder="New brand name"
// //             />
// //             <button onClick={handleAddBrand}>Add Brand</button>
// //          </div>
// //          <div>
// //             {editBrandId && (
// //                <div>
// //                   <input
// //                      type="text"
// //                      value={editBrandName}
// //                      onChange={(e) => setEditBrandName(e.target.value)}
// //                      placeholder="Update brand name"
// //                   />
// //                   <button onClick={handleUpdateBrand}>Update Brand</button>
// //                   <button onClick={() => setEditBrandId(null)}>Cancel</button>
// //                </div>
// //             )}
// //          </div>
// //          <ul>
// //             {brands.map((brand) => (
// //                <li key={brand.id}>
// //                   {editBrandId === brand.id ? (
// //                      <span>{editBrandName}</span>
// //                   ) : (
// //                      <span>{brand.name}</span>
// //                   )}
// //                   <button onClick={() => handleDeleteBrand(brand.id)}>
// //                      Delete
// //                   </button>
// //                   <button
// //                      onClick={() => {
// //                         setEditBrandId(brand.id);
// //                         setEditBrandName(brand.name);
// //                      }}
// //                   >
// //                      Edit
// //                   </button>
// //                </li>
// //             ))}
// //          </ul>
// //       </div>
// //    );
// // };

// // export default ManageBrands;
