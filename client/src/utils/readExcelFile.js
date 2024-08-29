import * as XLSX from "xlsx";

const readExcelFile = (file) => {
   return new Promise((resolve, reject) => {
      // Check file type
      const allowedMimeTypes = [
         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
         "application/vnd.ms-excel", // .xls
      ];

      const fileExtension = file.name.split(".").pop().toLowerCase();
      const allowedExtensions = ["xlsx", "xls"];

      // Reject if the file is not an Excel file
      if (
         !allowedMimeTypes.includes(file.type) &&
         !allowedExtensions.includes(fileExtension)
      ) {
         return reject(
            new Error(
               "Unsupported file format. Please upload an Excel file (.xls or .xlsx)."
            )
         );
      }

      const reader = new FileReader();

      reader.onload = function (e) {
         try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert the sheet to JSON, with the first row as headers
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
               header: 1,
            });

            // Extract headers and rows
            const rawHeaders = jsonData[0]; // First row contains the headers

            // Normalize headers to lowercase
            const headers = rawHeaders.map((header) => header.toLowerCase());

            const rows = jsonData.slice(1); // Remaining rows contain the data

            // Find the indices for "model" and "imei"
            const modelIndex = headers.indexOf("model");
            const imeiIndex = headers.indexOf("imei");

            // Map rows to objects, filtering out those that lack "Model" and "IMEI" values
            const result = rows
               .filter((rowValues) => {
                  return (
                     rowValues[modelIndex] !== undefined &&
                     rowValues[modelIndex] !== null &&
                     rowValues[modelIndex] !== "" &&
                     rowValues[imeiIndex] !== undefined &&
                     rowValues[imeiIndex] !== null &&
                     rowValues[imeiIndex] !== ""
                  );
               })
               .map((rowValues) => {
                  return rawHeaders.reduce((acc, header, index) => {
                     acc[header] =
                        rowValues[index] !== undefined
                           ? rowValues[index]
                           : null;
                     return acc;
                  }, {});
               });

            resolve(result); // Resolve with the array of objects
         } catch (error) {
            reject(error); // Catch any parsing errors and reject the promise
         }
      };

      reader.onerror = function () {
         reject(new Error("File reading failed"));
      };

      reader.readAsArrayBuffer(file); // Read file as an array buffer for Excel processing
   });
};

export default readExcelFile;