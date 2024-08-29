import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import "../styles/ViewDevices.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import config from "../utils/config";

const ViewDevices = () => {
   const [devices, setDevices] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [searchByIMEI, setSearchByIMEI] = useState("");
   const [searchByModel, setSearchByModel] = useState("");
   const [searchByColor, setSearchByColor] = useState("");
   const [searchByCatalog, setSearchByCatalog] = useState("");
   const [searchByStatus, setSearchByStatus] = useState("");
   const [searchByGrade, setSearchByGrade] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [devicesPerPage] = useState(200);
   const navigate = useNavigate(); // For navigation

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(`${config.apiUrl}/devices`);
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            // console.log("ViewDevices: incoming devices:", data);
            setDevices(data); // Assuming data is an array of devices
            setLoading(false);
         } catch (err) {
            setError(err);
            setLoading(false);
         }
      };

      fetchData();
   }, []);

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

   const handleDelete = async (id) => {
      const confirmDelete = window.confirm(
         "Are you sure you want to delete this device?"
      );

      console.log("id for deletion:", id)

      if (confirmDelete) {
         try {
            const response = await fetch(`${config.apiUrl}/devices/${id}`, {
               method: "DELETE",
            });
            if (!response.ok) {
               throw new Error(`Failed to delete device with ID: ${id}`);
            }
            setDevices((prevDevices) => {
               return prevDevices.filter((device) => device.id !== id);
            });
         } catch (err) {
            setError(err);
         }
      }
   };

   const handleEdit = (id) => {
      navigate(`/update-device/${id}`);
   };

   const handleRowClick = (id) => {
      // console.log("device.id: ", id)
      navigate(`/device-details/${id}`);
   };

   const safeToLowerCase = (value) => (value ? value.toLowerCase() : "");

   const filteredDevices = useMemo(() => {
      return devices.filter((device) => {
         return (
            (searchByIMEI === "" ||
               safeToLowerCase(device.imei).includes(searchByIMEI)) &&
            (searchByModel === "" ||
               safeToLowerCase(device.model).includes(searchByModel)) &&
            (searchByColor === "" ||
               safeToLowerCase(device.color).includes(searchByColor)) &&
            (searchByCatalog === "" ||
               safeToLowerCase(device.catalog).includes(searchByCatalog)) &&
            (searchByStatus === "" ||
               safeToLowerCase(device.status).includes(searchByStatus)) &&
            (searchByGrade === "" ||
               safeToLowerCase(device.grade).includes(searchByGrade))
         );
      });
   }, [
      devices,
      searchByIMEI,
      searchByModel,
      searchByColor,
      searchByCatalog,
      searchByStatus,
      searchByGrade,
   ]);

   // Pagination logic
   const indexOfLastDevice = currentPage * devicesPerPage;
   const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
   const currentDevices = filteredDevices.slice(
      indexOfFirstDevice,
      indexOfLastDevice
   );

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error: {error.message}</p>;

   return (
      <div className="view-devices-container">
         <h1>All Devices</h1>

         <div className="search-container">
            <input
               type="text"
               placeholder="Search by IMEI"
               value={searchByIMEI}
               onChange={(e) => handleSearchByField("IMEI", e.target.value)}
               className="search-input"
            />
            <input
               type="text"
               placeholder="Search by Model"
               value={searchByModel}
               onChange={(e) => handleSearchByField("Model", e.target.value)}
               className="search-input"
            />
            <input
               type="text"
               placeholder="Search by Color"
               value={searchByColor}
               onChange={(e) => handleSearchByField("Color", e.target.value)}
               className="search-input"
            />
            <input
               type="text"
               placeholder="Search by Catalog"
               value={searchByCatalog}
               onChange={(e) => handleSearchByField("Catalog", e.target.value)}
               className="search-input"
            />
            <input
               type="text"
               placeholder="Search by Status"
               value={searchByStatus}
               onChange={(e) => handleSearchByField("Status", e.target.value)}
               className="search-input"
            />
            <input
               type="text"
               placeholder="Search by Grade"
               value={searchByGrade}
               onChange={(e) => handleSearchByField("Grade", e.target.value)}
               className="search-input"
            />
         </div>

         {currentDevices.length === 0 ? (
            <p>No devices found.</p>
         ) : (
            <div>
               <table>
                  <thead>
                     <tr>
                        <th>IMEI</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>RAM</th>
                        <th>Storage</th>
                        <th>Color</th>
                        <th>Grade</th>
                        <th>Status</th>
                        <th>Melding</th>
                        <th>Catalog</th>
                        <th>Cost</th>
                        <th>Purchase Date</th>
                        <th>Notes</th>
                        <th>Edit</th>
                        <th>Delete</th>
                     </tr>
                  </thead>
                  <tbody>
                     {currentDevices.map((device) => (
                        <tr
                           key={device.id}
                           onClick={() => handleRowClick(device.id)}
                        >
                           <td>{device.imei}</td>
                           <td>{device.brand}</td>
                           <td>{device.model}</td>
                           <td>{device.ram}</td>
                           <td>{device.storage}</td>
                           <td>{device.color}</td>
                           <td>{device.grade}</td>
                           <td>{device.status}</td>
                           <td>{device.melding ? "Yes" : "No"}</td>
                           <td>{device.catalog}</td>
                           <td>{device.cost}</td>
                           <td>
                              {new Date(
                                 device.purchaseDate
                              ).toLocaleDateString()}
                           </td>
                           <td>{device.notes}</td>
                           <td>
                              <button
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleEdit(device.id);
                                 }}
                                 className="edit-button"
                              >
                                 <FontAwesomeIcon icon={faEdit} />
                              </button>
                           </td>
                           <td>
                              <button
                                 onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(device.id);
                                 }}
                                 className="delete-button"
                              >
                                 <FontAwesomeIcon icon={faTrash} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               {/* Pagination */}
               <div className="pagination">
                  {[
                     ...Array(
                        Math.ceil(filteredDevices.length / devicesPerPage)
                     ).keys(),
                  ].map((pageNumber) => (
                     <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber + 1)}
                        className={
                           pageNumber + 1 === currentPage ? "active" : ""
                        }
                     >
                        {pageNumber + 1}
                     </button>
                  ))}
               </div>
            </div>
         )}
      </div>
   );
};

export default ViewDevices;