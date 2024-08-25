"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      // Add new columns to the Devices table
      await queryInterface.addColumn("Devices", "cost", {
         type: Sequelize.DECIMAL(10, 2),
         allowNull: true,
      });

      await queryInterface.addColumn("Devices", "notes", {
         type: Sequelize.TEXT,
         allowNull: true,
      });

      await queryInterface.addColumn("Devices", "active", {
         type: Sequelize.BOOLEAN,
         allowNull: false,
         defaultValue: true,
      });
   },

   async down(queryInterface, Sequelize) {
      // Remove the columns if migration is rolled back
      await queryInterface.removeColumn("Devices", "cost");
      await queryInterface.removeColumn("Devices", "notes");
      await queryInterface.removeColumn("Devices", "active");
   },
};
