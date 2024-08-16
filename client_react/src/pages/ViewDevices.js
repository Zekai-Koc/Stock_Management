import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewDevices.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ViewDevices = () => {
   const [devices, setDevices] = useState({});
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const navigate = useNavigate(); // For navigation

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               "http://192.168.178.185:7000/api/v1/devices"
            );
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
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

   // Function to handle deletion of a device with confirmation
   const handleDelete = async (imei) => {
      const confirmDelete = window.confirm(
         "Are you sure you want to delete this device?"
      );
      if (confirmDelete) {
         try {
            const response = await fetch(
               `http://localhost:7000/api/v1/devices/${imei}`,
               {
                  method: "DELETE",
               }
            );
            if (!response.ok) {
               throw new Error(`Failed to delete device with IMEI: ${imei}`);
            }
            // Remove the device from the local state after successful deletion
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
         const filteredList = devicesList.filter(
            (device) =>
               device.imei.toLowerCase().includes(searchQuery) ||
               device.model.toLowerCase().includes(searchQuery)
         );
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
      <div>
         <h1>View Devices</h1>
         <input
            type="text"
            placeholder="Search by IMEI or Model"
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
         />
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
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons"; // Import edit icon
// import "./ViewDevices.css";

// const ViewDevices = () => {
//    const [devices, setDevices] = useState({});
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);
//    const [searchQuery, setSearchQuery] = useState("");

//    useEffect(() => {
//       const fetchData = async () => {
//          try {
//             const response = await fetch(
//                "http://localhost:7000/api/v1/devices"
//             );
//             if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
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

//    const handleEdit = (device) => {
//       console.log("Edit device:", device);
//    };

//    const filteredDevices = Object.entries(devices).reduce(
//       (acc, [brand, devicesList]) => {
//          const filteredList = devicesList.filter(
//             (device) =>
//                device.imei.toLowerCase().includes(searchQuery) ||
//                device.model.toLowerCase().includes(searchQuery)
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
//       <div>
//          <h1>View Devices</h1>
//          <input
//             type="text"
//             placeholder="Search by IMEI or Model"
//             value={searchQuery}
//             onChange={handleSearch}
//             className="search-bar"
//          />
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
//                                        onClick={() => handleEdit(device)}
//                                        className="edit-button"
//                                     >
//                                        <FontAwesomeIcon icon={faEdit} />
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

// import React, { useEffect, useState } from "react";
// import "./ViewDevices.css";

// const ViewDevices = () => {
//    const [devices, setDevices] = useState({});
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);
//    const [searchQuery, setSearchQuery] = useState("");

//    useEffect(() => {
//       const fetchData = async () => {
//          try {
//             const response = await fetch(
//                "http://localhost:7000/api/v1/devices"
//             );
//             if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             const data = await response.json();
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

//    const handleEdit = (device) => {
//       // For now, just log the device details or navigate to an edit form
//       console.log("Edit device:", device);
//       // Optionally, you could redirect to an edit page or open a modal here
//       // Example: navigate(`/edit-device/${device.imei}`)
//    };

//    const filteredDevices = Object.entries(devices).reduce(
//       (acc, [brand, devicesList]) => {
//          const filteredList = devicesList.filter(
//             (device) =>
//                device.imei.toLowerCase().includes(searchQuery) ||
//                device.model.toLowerCase().includes(searchQuery)
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
//       <div>
//          <h1>View Devices</h1>
//          <input
//             type="text"
//             placeholder="Search by IMEI or Model"
//             value={searchQuery}
//             onChange={handleSearch}
//             className="search-bar"
//          />
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
//                                        onClick={() => handleEdit(device)}
//                                        className="edit-button"
//                                     >
//                                        Edit
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

// // import React, { useEffect, useState } from "react";
// // import "./ViewDevices.css";

// // const ViewDevices = () => {
// //    const [devices, setDevices] = useState({});
// //    const [loading, setLoading] = useState(true);
// //    const [error, setError] = useState(null);
// //    const [searchQuery, setSearchQuery] = useState("");

// //    useEffect(() => {
// //       const fetchData = async () => {
// //          try {
// //             const response = await fetch(
// //                "http://localhost:7000/api/v1/devices"
// //             );
// //             if (!response.ok) {
// //                throw new Error(`HTTP error! Status: ${response.status}`);
// //             }
// //             const data = await response.json();
// //             setDevices(data.devicesByBrand);
// //             setLoading(false);
// //          } catch (err) {
// //             setError(err);
// //             setLoading(false);
// //          }
// //       };

// //       fetchData();
// //    }, []);

// //    const handleSearch = (event) => {
// //       setSearchQuery(event.target.value.toLowerCase());
// //    };

// //    const filteredDevices = Object.entries(devices).reduce(
// //       (acc, [brand, devicesList]) => {
// //          const filteredList = devicesList.filter(
// //             (device) =>
// //                device.imei.toLowerCase().includes(searchQuery) ||
// //                device.model.toLowerCase().includes(searchQuery)
// //          );
// //          if (filteredList.length > 0) {
// //             acc[brand] = filteredList;
// //          }
// //          return acc;
// //       },
// //       {}
// //    );

// //    if (loading) return <p>Loading...</p>;
// //    if (error) return <p>Error: {error.message}</p>;

// //    return (
// //       <div>
// //          <h1>View Devices</h1>
// //          <input
// //             type="text"
// //             placeholder="Search by IMEI or Model"
// //             value={searchQuery}
// //             onChange={handleSearch}
// //             className="search-bar"
// //          />
// //          {Object.keys(filteredDevices).length === 0 ? (
// //             <p>No devices found.</p>
// //          ) : (
// //             <div>
// //                {Object.entries(filteredDevices).map(([brand, devicesList]) => (
// //                   <div key={brand}>
// //                      <h2>{brand}</h2>
// //                      <table>
// //                         <thead>
// //                            <tr>
// //                               <th>IMEI</th>
// //                               <th>Model</th>
// //                               <th>RAM</th>
// //                               <th>Storage</th>
// //                               <th>Color</th>
// //                               <th>Grade</th>
// //                               <th>Status</th>
// //                               <th>Melding</th>
// //                               <th>Catalog</th>
// //                               <th>Purchase Date</th>
// //                            </tr>
// //                         </thead>
// //                         <tbody>
// //                            {devicesList.map((device) => (
// //                               <tr key={device.imei}>
// //                                  <td>{device.imei}</td>
// //                                  <td>{device.model}</td>
// //                                  <td>{device.ram} GB</td>
// //                                  <td>{device.storage} GB</td>
// //                                  <td>{device.color}</td>
// //                                  <td>{device.grade}</td>
// //                                  <td>{device.status}</td>
// //                                  <td>{device.melding ? "Yes" : "No"}</td>
// //                                  <td>{device.catalog}</td>
// //                                  <td>
// //                                     {new Date(
// //                                        device.purchaseDate
// //                                     ).toLocaleDateString()}
// //                                  </td>
// //                               </tr>
// //                            ))}
// //                         </tbody>
// //                      </table>
// //                   </div>
// //                ))}
// //             </div>
// //          )}
// //       </div>
// //    );
// // };

// // export default ViewDevices;

// // // import React, { useEffect, useState } from "react";
// // // import "./ViewDevices.css";

// // // const ViewDevices = () => {
// // //    const [devices, setDevices] = useState({});
// // //    const [loading, setLoading] = useState(true);
// // //    const [error, setError] = useState(null);

// // //    useEffect(() => {
// // //       const fetchData = async () => {
// // //          try {
// // //             const response = await fetch(
// // //                "http://localhost:7000/api/v1/devices"
// // //             );
// // //             if (!response.ok) {
// // //                throw new Error(`HTTP error! Status: ${response.status}`);
// // //             }
// // //             const data = await response.json();
// // //             setDevices(data.devicesByBrand);
// // //             setLoading(false);
// // //          } catch (err) {
// // //             setError(err);
// // //             setLoading(false);
// // //          }
// // //       };

// // //       fetchData();
// // //    }, []);

// // //    if (loading) return <p>Loading...</p>;
// // //    if (error) return <p>Error: {error.message}</p>;

// // //    return (
// // //       <div>
// // //          <h1>View Devices</h1>
// // //          {Object.keys(devices).length === 0 ? (
// // //             <p>No devices found.</p>
// // //          ) : (
// // //             <div>
// // //                {Object.entries(devices).map(([brand, devicesList]) => (
// // //                   <div key={brand}>
// // //                      <h2>{brand}</h2>
// // //                      <table>
// // //                         <thead>
// // //                            <tr>
// // //                               <th>IMEI</th>
// // //                               <th>Model</th>
// // //                               <th>RAM</th>
// // //                               <th>Storage</th>
// // //                               <th>Color</th>
// // //                               <th>Grade</th>
// // //                               <th>Status</th>
// // //                               <th>Melding</th>
// // //                               <th>Catalog</th>
// // //                               <th>Purchase Date</th>
// // //                            </tr>
// // //                         </thead>
// // //                         <tbody>
// // //                            {devicesList.map((device) => (
// // //                               <tr key={device.imei}>
// // //                                  <td>{device.imei}</td>
// // //                                  <td>{device.model}</td>
// // //                                  <td>{device.ram} GB</td>
// // //                                  <td>{device.storage} GB</td>
// // //                                  <td>{device.color}</td>
// // //                                  <td>{device.grade}</td>
// // //                                  <td>{device.status}</td>
// // //                                  <td>{device.melding ? "Yes" : "No"}</td>
// // //                                  <td>{device.catalog}</td>
// // //                                  <td>
// // //                                     {new Date(
// // //                                        device.purchaseDate
// // //                                     ).toLocaleDateString()}
// // //                                  </td>
// // //                               </tr>
// // //                            ))}
// // //                         </tbody>
// // //                      </table>
// // //                   </div>
// // //                ))}
// // //             </div>
// // //          )}
// // //       </div>
// // //    );
// // // };

// // // export default ViewDevices;
