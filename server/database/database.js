const { Sequelize } = require("sequelize");

// Database connection configuration
const sequelize = new Sequelize("postgres", "postgres", "3570", {
   host: "localhost",
   dialect: "postgres",
   port: 5433,
   logging: false, // Disable logging
});

const initializeDatabase = async () => {
   try {
      await sequelize.authenticate();
      console.log("Database connection has been established successfully.");

      // Sync models
      await sequelize.sync({ alter: true }); // Use `alter: true` to update tables
      console.log("Database synced successfully.");
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }
};

initializeDatabase();

module.exports = sequelize;
