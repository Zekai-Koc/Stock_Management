import React, { useState } from "react";
import readExcelFile from "../utils/readExcelFile.js";
import config from "../utils/config"; // Ensure you have this utility for API URLs
import "./ImportDevicesFromExcel.css";

const ImportDevicesFromExcel = () => {
   const [excelData, setExcelData] = useState([]);

   const handleFileUpload = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
         const data = await readExcelFile(file);
         console.log("Parsed data:", data);
         setExcelData(data); // Save the parsed data to the state
      } catch (err) {
         console.error(err);
      }
   };

   const handleSaveToDB = async () => {
      if (excelData.length === 0) {
         alert("No data to save. Please upload an Excel file first.");
         return;
      }

      try {
         const response = await fetch(
            `${config.apiUrl}/devices/uploadfromexcel`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({ data: excelData }),
            }
         );

         if (response.ok) {
            const result = await response.json();
            console.log("Data saved successfully:", result);
            alert("Data saved successfully!");
         } else {
            const errorMessage = await response.text();
            console.error("Failed to save data:", errorMessage);
            alert(`Failed to save data: ${errorMessage}`);
         }
      } catch (err) {
         console.error("Error saving data:", err);
         alert("Error saving data. Please try again.");
      }
   };

   return (
      <main id="app" className="import-excel-container">
         <section>
            <h2 className="section-title">Import Devices from Excel</h2>
            <div className="import-form">
               <input
                  type="file"
                  id="fileInput"
                  accept=".xlsx, .xls"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
               />
               <button
                  id="button-import-from-xls"
                  onClick={() => document.getElementById("fileInput").click()}
               >
                  Select Excel File
               </button>
               <button
                  id="button-save-to-db"
                  onClick={handleSaveToDB}
                  disabled={excelData.length === 0} // Disable if no data
               >
                  Save to Database
               </button>
            </div>

            {/* Render the table if excelData has content */}
            {excelData.length > 0 && (
               <div className="excel-table">
                  <h3 className="table-title">Preview of Imported Data</h3>
                  <table>
                     <thead>
                        <tr>
                           {Object.keys(excelData[0]).map((header, index) => (
                              <th key={index}>{header}</th>
                           ))}
                        </tr>
                     </thead>
                     <tbody>
                        {excelData.map((row, rowIndex) => (
                           <tr key={rowIndex}>
                              {Object.values(row).map((value, colIndex) => (
                                 <td key={colIndex}>{value}</td>
                              ))}
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </section>
      </main>
   );
};

export default ImportDevicesFromExcel;

// import React, { useState } from "react";
// import readExcelFile from "../utils/readExcelFile.js";
// import config from "../utils/config"; // Ensure you have this utility for API URLs
// import "./ImportDevicesFromExcel.css";

// const ImportDevicesFromExcel = () => {
//    const [excelData, setExcelData] = useState([]);

//    const handleFileUpload = async (event) => {
//       const file = event.target.files[0];
//       if (!file) return;

//       try {
//          const data = await readExcelFile(file);
//          console.log("Parsed data:", data);
//          setExcelData(data); // Save the parsed data to the state
//       } catch (err) {
//          console.error(err);
//       }
//    };

//    const handleSaveToDB = async () => {
//       if (excelData.length === 0) {
//          alert("No data to save. Please upload an Excel file first.");
//          return;
//       }

//       try {
//          const response = await fetch(
//             `${config.apiUrl}/devices/uploadfromexcel`,
//             {
//                method: "POST",
//                headers: {
//                   "Content-Type": "application/json",
//                },
//                body: JSON.stringify({ data: excelData }),
//             }
//          );

//          if (response.ok) {
//             const result = await response.json();
//             console.log("Data saved successfully:", result);
//             alert("Data saved successfully!");
//          } else {
//             const errorMessage = await response.text();
//             console.error("Failed to save data:", errorMessage);
//             alert(`Failed to save data: ${errorMessage}`);
//          }
//       } catch (err) {
//          console.error("Error saving data:", err);
//          alert("Error saving data. Please try again.");
//       }
//    };

//    return (
//       <main id="app" className="import-excel-container">
//          <section>
//             <h2 className="section-title">Import Devices from Excel</h2>
//             <div className="import-form">
//                <input
//                   type="file"
//                   id="fileInput"
//                   accept=".xlsx, .xls"
//                   onChange={handleFileUpload}
//                   style={{ display: "none" }}
//                />
//                <button
//                   id="button-import-from-xls"
//                   onClick={() => document.getElementById("fileInput").click()}
//                >
//                   Select Excel File
//                </button>
//                <button
//                   id="button-save-to-db"
//                   onClick={handleSaveToDB}
//                   disabled={excelData.length === 0} // Disable if no data
//                >
//                   Save to Database
//                </button>
//             </div>

//             {/* Render the table if excelData has content */}
//             {excelData.length > 0 && (
//                <div className="excel-table">
//                   <h3 className="table-title">Preview of Imported Data</h3>
//                   <table>
//                      <thead>
//                         <tr>
//                            {Object.keys(excelData[0]).map((header, index) => (
//                               <th key={index}>{header}</th>
//                            ))}
//                         </tr>
//                      </thead>
//                      <tbody>
//                         {excelData.map((row, rowIndex) => (
//                            <tr key={rowIndex}>
//                               {Object.values(row).map((value, colIndex) => (
//                                  <td key={colIndex}>{value}</td>
//                               ))}
//                            </tr>
//                         ))}
//                      </tbody>
//                   </table>
//                </div>
//             )}
//          </section>
//       </main>
//    );
// };

// export default ImportDevicesFromExcel;

// // import React, { useState } from "react";
// // import readExcelFile from "../utils/readExcelFile.js";
// // import "./ImportDevicesFromExcel.css";

// // const ImportDevicesFromExcel = () => {
// //    const [excelData, setExcelData] = useState([]);

// //    const handleFileUpload = async (event) => {
// //       const file = event.target.files[0];
// //       if (!file) return;

// //       try {
// //          const data = await readExcelFile(file);
// //          console.log("Parsed data:", data);
// //          setExcelData(data); // Save the parsed data to the state
// //       } catch (err) {
// //          console.error(err);
// //       }
// //    };

// //    return (
// //       <main id="app" className="import-excel-container">
// //          <section>
// //             <h2 className="section-title">Import Devices from Excel</h2>
// //             <div className="import-form">
// //                <input
// //                   type="file"
// //                   id="fileInput"
// //                   accept=".xlsx, .xls"
// //                   onChange={handleFileUpload}
// //                   style={{ display: "none" }}
// //                />
// //                <button
// //                   id="button-import-from-xls"
// //                   onClick={() => document.getElementById("fileInput").click()}
// //                >
// //                   Select Excel File
// //                </button>
// //             </div>

// //             {/* Render the table if excelData has content */}
// //             {excelData.length > 0 && (
// //                <div className="excel-table">
// //                   <h3 className="table-title">Preview of Imported Data</h3>
// //                   <table>
// //                      <thead>
// //                         <tr>
// //                            {Object.keys(excelData[0]).map((header, index) => (
// //                               <th key={index}>{header}</th>
// //                            ))}
// //                         </tr>
// //                      </thead>
// //                      <tbody>
// //                         {excelData.map((row, rowIndex) => (
// //                            <tr key={rowIndex}>
// //                               {Object.values(row).map((value, colIndex) => (
// //                                  <td key={colIndex}>{value}</td>
// //                               ))}
// //                            </tr>
// //                         ))}
// //                      </tbody>
// //                   </table>
// //                </div>
// //             )}
// //          </section>
// //       </main>
// //    );
// // };

// // export default ImportDevicesFromExcel;

// // // import React, { useState } from "react";
// // // import config from "../utils/config";
// // // import readExcelFile from "../utils/readExcelFile.js";

// // // const ImportDevicesFromExcel = () => {
// // //    const handleFileUpload = async (event) => {
// // //       const file = event.target.files[0];
// // //       if (!file) return;

// // //       try {
// // //          const data = await readExcelFile(file);
// // //          console.log("Parsed data:", data);
// // //       } catch (err) {
// // //          console.error(err);
// // //       }
// // //    };

// // //    return (
// // //       <main id="app" className="import-excel-container">
// // //          <section>
// // //             <h2 className="section-title">Import Devices from Excel</h2>
// // //             <div className="import-form">
// // //                <input
// // //                   type="file"
// // //                   id="fileInput"
// // //                   accept=".xlsx, .xls"
// // //                   onChange={handleFileUpload}
// // //                   style={{ display: "none" }}
// // //                />
// // //                <button
// // //                   id="button-import-from-xls"
// // //                   onClick={() => document.getElementById("fileInput").click()}
// // //                >
// // //                   Select Excel File
// // //                </button>
// // //             </div>
// // //          </section>
// // //       </main>
// // //    );
// // // };

// // // export default ImportDevicesFromExcel;
