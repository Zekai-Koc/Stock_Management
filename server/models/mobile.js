const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const validateIMEI = (imei) => {
   // Regular expression for exactly 15 digits
   const isValidLength = /^\d{15}$/.test(imei);

   // Luhn algorithm for IMEI checksum validation
   const isValidChecksum = (number) => {
      let sum = 0;
      let shouldDouble = false;
      for (let i = number.length - 1; i >= 0; i--) {
         let digit = parseInt(number.charAt(i), 10);
         if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
         }
         sum += digit;
         shouldDouble = !shouldDouble;
      }
      return sum % 10 === 0;
   };

   return isValidLength && isValidChecksum(imei);
};

const Mobile = sequelize.define("Mobile", {
   IMEI: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
      validate: {
         customValidator(value) {
            if (!validateIMEI(value)) {
               throw new Error(
                  "IMEI must be a valid 15-digit number with a valid checksum"
               );
            }
         },
      },
   },
   Model: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   Color: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   Storage: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   Grade: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   SerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
   },
});

module.exports = Mobile;

// const { DataTypes } = require("sequelize");
// const sequelize = require("../database/database");

// const Mobile = sequelize.define("Mobile", {
//    IMEI: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       primaryKey: true, // Set IMEI as the primary key
//    },
//    Model: {
//       type: DataTypes.STRING,
//       allowNull: false,
//    },
//    Color: {
//       type: DataTypes.STRING,
//       allowNull: false,
//    },
//    Storage: {
//       type: DataTypes.STRING,
//       allowNull: false,
//    },
//    Grade: {
//       type: DataTypes.STRING,
//       allowNull: false,
//    },
//    SerialNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//    },
// });

// module.exports = Mobile;
