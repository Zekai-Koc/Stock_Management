const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Device = sequelize.define(
   "Device",
   {
      imei: {
         type: DataTypes.STRING,
         allowNull: false,
         unique: true,
         primaryKey: true,
         // validate: {
         //    customValidator(value) {
         //       if (!validateIMEI(value)) {
         //          throw new Error(
         //             "IMEI must be a valid 15-digit number with a valid checksum"
         //          );
         //       }
         //    },
         // },
      },
      brandId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "Brands",
            key: "id",
         },
      },
      modelId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "Models",
            key: "id",
         },
      },
      ramId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "RAMOptions",
            key: "id",
         },
      },
      storageId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "StorageCapacities",
            key: "id",
         },
      },
      colorId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "Colors",
            key: "id",
         },
      },
      gradeId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "Grades",
            key: "id",
         },
      },
      statusId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "Statuses",
            key: "id",
         },
      },
      melding: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
      },
      catalogId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "Catalogs",
            key: "id",
         },
      },
      purchaseDate: {
         type: DataTypes.DATE,
         allowNull: false,
      },
   },
   {
      timestamps: false, // Disable automatic timestamps if not needed
      tableName: "Devices", // Explicit table name specification
   }
);

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

module.exports = Device;
