"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("DeviceStatusHistory", {
         id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
         },
         deviceId: {
            type: Sequelize.STRING,
            references: {
               model: "Devices",
               key: "imei",
            },
            allowNull: false,
         },
         statusId: {
            type: Sequelize.INTEGER,
            references: {
               model: "Statuses",
               key: "id",
            },
            allowNull: false,
         },
         changeDate: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
         },
         cost: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: true,
         },
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("DeviceStatusHistory");
   },
};
