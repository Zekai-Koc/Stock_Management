import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewDevices.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import config from "../utils/config";

const ViewDevices = () => {
   const [devices, setDevices] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [searchByIMEI, setSearchByIMEI] = useState("");
   const [searchByModel, setSearchByModel] = useState("");
   const [searchByColor, setSearchByColor] = useState("");
   const [searchByCatalog, setSearchByCatalog] = useState("");
   const [searchByStatus, setSearchByStatus] = useState("");
   const [searchByGrade, setSearchByGrade] = useState("");
   const navigate = useNavigate(); // For navigation

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${config.apiUrl}/devices`);
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("ViewDevices: incoming devices:", data);
            setDevices(data.devicesByBrand);
            setLoading(false);
         } catch (err) {
            setError(err);
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   const handleSearch = (event) => {
      setSearchQuery(event.target.value.toLowerCase());
   };

   const handleSearchByField = (field, value) => {
      switch (field) {
         case "IMEI":
            setSearchByIMEI(value.toLowerCase());
            break;
         case "Model":
            setSearchByModel(value.toLowerCase());
            break;
         case "Color":
            setSearchByColor(value.toLowerCase());
            break;
         case "Catalog":
            setSearchByCatalog(value.toLowerCase());
            break;
         case "Status":
            setSearchByStatus(value.toLowerCase());
            break;
         case "Grade":
            setSearchByGrade(value.toLowerCase());
            break;
         default:
            break;
      }
   };

   // Function to handle deletion of a device with confirmation
   const handleDelete = async (imei) => {
      const confirmDelete = window.confirm(
         "Are you sure you want to delete this device?"
      );
      if (confirmDelete) {
         try {
            const response = await fetch(`${config.apiUrl}/devices/${imei}`, {
               method: "DELETE",
            });
            if (!response.ok) {
               throw new Error(`Failed to delete device with IMEI: ${imei}`);
            }
            setDevices((prevDevices) => {
               const updatedDevices = { ...prevDevices };
               Object.keys(updatedDevices).forEach((brand) => {
                  updatedDevices[brand] = updatedDevices[brand].filter(
                     (device) => device.imei !== imei
                  );
               });
               return updatedDevices;
            });
         } catch (err) {
            setError(err);
         }
      }
   };

   const handleEdit = (imei) => {
      navigate(`/update-device/${imei}`); // Navigate to the update page
   };

   const filteredDevices = Object.entries(devices).reduce(
      (acc, [brand, devicesList]) => {
         let filteredList = devicesList.filter((device) => {
            return (
               (searchByIMEI === "" ||
                  device.imei.toLowerCase().includes(searchByIMEI)) &&
               (searchByModel === "" ||
                  device.model.toLowerCase().includes(searchByModel)) &&
               (searchByColor === "" ||
                  device.color.toLowerCase().includes(searchByColor)) &&
               (searchByCatalog === "" ||
                  device.catalog.toLowerCase().includes(searchByCatalog)) &&
               (searchByStatus === "" ||
                  device.status.toLowerCase().includes(searchByStatus)) &&
               (searchByGrade === "" ||
                  device.grade.toLowerCase().includes(searchByGrade))
            );
         });

         // Filter by general search query as well
         if (searchQuery) {
            const queryLower = searchQuery.toLowerCase();
            filteredList = filteredList.filter(
               (device) =>
                  device.imei.toLowerCase().includes(queryLower) ||
                  device.model.toLowerCase().includes(queryLower) ||
                  device.color.toLowerCase().includes(queryLower) ||
                  device.catalog.toLowerCase().includes(queryLower) ||
                  device.status.toLowerCase().includes(queryLower) ||
                  device.grade.toLowerCase().includes(queryLower)
            );
         }

         if (filteredList.length > 0) {
            acc[brand] = filteredList;
         }
         return acc;
      },
      {}
   );

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;

   return (
      <div className="view-devices-container">
         <h1>View Devices</h1>
         <div className="search-container">
            <div className="search-section">
               <label htmlFor="generalSearch">General Search:</label>
               <input
                  id="generalSearch"
                  type="text"
                  placeholder="Search all fields"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-bar"
               />
            </div>
            <div className="search-section">
               <label htmlFor="searchByIMEI">Search by IMEI:</label>
               <input
                  id="searchByIMEI"
                  type="text"
                  value={searchByIMEI}
                  onChange={(e) => handleSearchByField("IMEI", e.target.value)}
                  className="search-bar"
               />
            </div>
            <div className="search-section">
               <label htmlFor="searchByModel">Search by Model:</label>
               <input
                  id="searchByModel"
                  type="text"
                  value={searchByModel}
                  onChange={(e) => handleSearchByField("Model", e.target.value)}
                  className="search-bar"
               />
            </div>
            <div className="search-section">
               <label htmlFor="searchByColor">Search by Color:</label>
               <input
                  id="searchByColor"
                  type="text"
                  value={searchByColor}
                  onChange={(e) => handleSearchByField("Color", e.target.value)}
                  className="search-bar"
               />
            </div>
            <div className="search-section">
               <label htmlFor="searchByCatalog">Search by Catalog:</label>
               <input
                  id="searchByCatalog"
                  type="text"
                  value={searchByCatalog}
                  onChange={(e) =>
                     handleSearchByField("Catalog", e.target.value)
                  }
                  className="search-bar"
               />
            </div>
            <div className="search-section">
               <label htmlFor="searchByStatus">Search by Status:</label>
               <input
                  id="searchByStatus"
                  type="text"
                  value={searchByStatus}
                  onChange={(e) =>
                     handleSearchByField("Status", e.target.value)
                  }
                  className="search-bar"
               />
            </div>
            <div className="search-section">
               <label htmlFor="searchByGrade">Search by Grade:</label>
               <input
                  id="searchByGrade"
                  type="text"
                  value={searchByGrade}
                  onChange={(e) => handleSearchByField("Grade", e.target.value)}
                  className="search-bar"
               />
            </div>
         </div>

         {Object.keys(filteredDevices).length === 0 ? (
            <p>No devices found.</p>
         ) : (
            <div>
               {Object.entries(filteredDevices).map(([brand, devicesList]) => (
                  <div key={brand}>
                     <h2>{brand}</h2>
                     <table>
                        <thead>
                           <tr>
                              <th>IMEI</th>
                              <th>Model</th>
                              <th>RAM</th>
                              <th>Storage</th>
                              <th>Color</th>
                              <th>Grade</th>
                              <th>Status</th>
                              <th>Melding</th>
                              <th>Catalog</th>
                              <th>Purchase Date</th>
                              <th>Edit</th>
                              <th>Delete</th>
                           </tr>
                        </thead>
                        <tbody>
                           {devicesList.map((device) => (
                              <tr key={device.imei}>
                                 <td>{device.imei}</td>
                                 <td>{device.model}</td>
                                 <td>{device.ram} GB</td>
                                 <td>{device.storage} GB</td>
                                 <td>{device.color}</td>
                                 <td>{device.grade}</td>
                                 <td>{device.status}</td>
                                 <td>{device.melding ? "Yes" : "No"}</td>
                                 <td>{device.catalog}</td>
                                 <td>
                                    {new Date(
                                       device.purchaseDate
                                    ).toLocaleDateString()}
                                 </td>
                                 <td>
                                    <button
                                       onClick={() => handleEdit(device.imei)}
                                       className="edit-button"
                                    >
                                       <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                 </td>
                                 <td>
                                    <button
                                       onClick={() => handleDelete(device.imei)}
                                       className="delete-button"
                                    >
                                       <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default ViewDevices;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ViewDevices.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
// import config from "../utils/config";

// const ViewDevices = () => {
//    const [devices, setDevices] = useState({});
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);
//    const [searchQuery, setSearchQuery] = useState("");
//    const navigate = useNavigate(); // For navigation

//    useEffect(() => {
//       const fetchData = async () => {
//          try {
//             const response = await fetch(`${config.apiUrl}/devices`);
//             if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log("ViewDevices: incoming devices:", data);
//             setDevices(data.devicesByBrand);
//             setLoading(false);
//          } catch (err) {
//             setError(err);
//             setLoading(false);
//          }
//       };

//       fetchData();
//    }, []);

//    const handleSearch = (event) => {
//       setSearchQuery(event.target.value.toLowerCase());
//    };

//    // Function to handle deletion of a device with confirmation
//    const handleDelete = async (imei) => {
//       const confirmDelete = window.confirm(
//          "Are you sure you want to delete this device?"
//       );
//       if (confirmDelete) {
//          try {
//             const response = await fetch(`${config.apiUrl}/devices/${imei}`, {
//                method: "DELETE",
//             });
//             if (!response.ok) {
//                throw new Error(`Failed to delete device with IMEI: ${imei}`);
//             }
//             setDevices((prevDevices) => {
//                const updatedDevices = { ...prevDevices };
//                Object.keys(updatedDevices).forEach((brand) => {
//                   updatedDevices[brand] = updatedDevices[brand].filter(
//                      (device) => device.imei !== imei
//                   );
//                });
//                return updatedDevices;
//             });
//          } catch (err) {
//             setError(err);
//          }
//       }
//    };

//    const handleEdit = (imei) => {
//       navigate(`/update-device/${imei}`); // Navigate to the update page
//    };

//    const filteredDevices = Object.entries(devices).reduce(
//       (acc, [brand, devicesList]) => {
//          const filteredList = devicesList.filter(
//             (device) =>
//                device.imei.toLowerCase().includes(searchQuery) ||
//                device.model.toLowerCase().includes(searchQuery) ||
//                device.color.toLowerCase().includes(searchQuery) ||
//                device.catalog.toLowerCase().includes(searchQuery) ||
//                device.status.toLowerCase().includes(searchQuery) ||
//                device.grade.toLowerCase().includes(searchQuery)
//          );
//          if (filteredList.length > 0) {
//             acc[brand] = filteredList;
//          }
//          return acc;
//       },
//       {}
//    );

//    if (loading) return <p>Loading...</p>;
//    if (error) return <p>Error: {error.message}</p>;

//    return (
//       <div className="view-devices-container">
//          <h1>View Devices</h1>
//          <div>
//             <input
//                type="text"
//                placeholder="Search by IMEI or Model"
//                value={searchQuery}
//                onChange={handleSearch}
//                className="search-bar"
//             />
//          </div>

//          {Object.keys(filteredDevices).length === 0 ? (
//             <p>No devices found.</p>
//          ) : (
//             <div>
//                {Object.entries(filteredDevices).map(([brand, devicesList]) => (
//                   <div key={brand}>
//                      <h2>{brand}</h2>
//                      <table>
//                         <thead>
//                            <tr>
//                               <th>IMEI</th>
//                               <th>Model</th>
//                               <th>RAM</th>
//                               <th>Storage</th>
//                               <th>Color</th>
//                               <th>Grade</th>
//                               <th>Status</th>
//                               <th>Melding</th>
//                               <th>Catalog</th>
//                               <th>Purchase Date</th>
//                               <th>Edit</th>
//                               <th>Delete</th>
//                            </tr>
//                         </thead>
//                         <tbody>
//                            {devicesList.map((device) => (
//                               <tr key={device.imei}>
//                                  <td>{device.imei}</td>
//                                  <td>{device.model}</td>
//                                  <td>{device.ram} GB</td>
//                                  <td>{device.storage} GB</td>
//                                  <td>{device.color}</td>
//                                  <td>{device.grade}</td>
//                                  <td>{device.status}</td>
//                                  <td>{device.melding ? "Yes" : "No"}</td>
//                                  <td>{device.catalog}</td>
//                                  <td>
//                                     {new Date(
//                                        device.purchaseDate
//                                     ).toLocaleDateString()}
//                                  </td>
//                                  <td>
//                                     <button
//                                        onClick={() => handleEdit(device.imei)}
//                                        className="edit-button"
//                                     >
//                                        <FontAwesomeIcon icon={faEdit} />
//                                     </button>
//                                  </td>
//                                  <td>
//                                     <button
//                                        onClick={() => handleDelete(device.imei)}
//                                        className="delete-button"
//                                     >
//                                        <FontAwesomeIcon icon={faTrash} />
//                                     </button>
//                                  </td>
//                               </tr>
//                            ))}
//                         </tbody>
//                      </table>
//                   </div>
//                ))}
//             </div>
//          )}
//       </div>
//    );
// };

// export default ViewDevices;
