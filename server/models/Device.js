const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const Brand = require("./Brand");
const Model = require("./Model");
const Status = require("./Status");
const RAM = require("./RAM");
const Storage = require("./Storage");
const Color = require("./Color");
const Grade = require("./Grade");
const Catalog = require("./Catalog");

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
            model: "RAM",
            key: "id",
         },
      },
      storageId: {
         type: DataTypes.INTEGER,
         allowNull: false,
         references: {
            model: "Storage",
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
      // Add an active field to track device deactivation/deletion
      // active: {
      //    type: DataTypes.BOOLEAN,
      //    allowNull: false,
      //    defaultValue: true,
      // },
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

Device.belongsTo(Brand, { foreignKey: "brandId" });
Device.belongsTo(Model, { foreignKey: "modelId" });
Device.belongsTo(Status, { foreignKey: "statusId" });
Device.belongsTo(RAM, { foreignKey: "ramId" });
Device.belongsTo(Storage, { foreignKey: "storageId" });
Device.belongsTo(Color, { foreignKey: "colorId" });
Device.belongsTo(Grade, { foreignKey: "gradeId" });
Device.belongsTo(Catalog, { foreignKey: "catalogId" });

module.exports = Device;
