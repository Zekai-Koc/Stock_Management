const crypto = require("crypto");

const generateUniqueIMEI = () => {
   let imei = "";
   for (let i = 0; i < 15; i++) {
      imei += Math.floor(Math.random() * 10); // Add a random digit between 0 and 9
   }
   return imei;
};

module.exports = generateUniqueIMEI;
