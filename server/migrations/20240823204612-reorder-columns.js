"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Create a new table with the desired column order
      await queryInterface.createTable("NewDevices", {
         imei: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
         },
         brandId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Brands",
               key: "id",
            },
         },
         modelId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Models",
               key: "id",
            },
         },
         ramId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "RAM",
               key: "id",
            },
         },
         storageId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Storage",
               key: "id",
            },
         },
         colorId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Colors",
               key: "id",
            },
         },
         gradeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Grades",
               key: "id",
            },
         },
         statusId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Statuses",
               key: "id",
            },
         },
         catalogId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
               model: "Catalogs",
               key: "id",
            },
         },
         purchaseDate: {
            type: Sequelize.DATE,
            allowNull: false,
         },
         cost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
         },
         notes: {
            type: Sequelize.TEXT,
            allowNull: true,
         },
         melding: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
         },
         active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
         },
      });

      // Copy data from the old table to the new table
      await queryInterface.sequelize.query(
         `INSERT INTO "NewDevices" (imei, brandid, modelId, ramId, storageId, colorId, gradeId, statusId, catalogId, purchaseDate, cost, notes, melding, active)
          SELECT imei, brandid, modelId, ramId, storageId, colorId, gradeId, statusId, catalogId, purchaseDate, cost, notes, melding, active FROM "Devices"`
      );

      // Drop the old table
      await queryInterface.dropTable("Devices");

      // Rename the new table to the old table name
      await queryInterface.renameTable("NewDevices", "Devices");
   },

   down: async (queryInterface, Sequelize) => {
      // Rollback logic if necessary
   },
};
