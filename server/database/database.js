const { Sequelize } = require("sequelize");

// Database connection configuration
const sequelize = new Sequelize("postgres", "postgres", "3570", {
   host: "localhost",
   dialect: "postgres",
   port: 5433,
});

// Test the connection
async function testConnection() {
   try {
      await sequelize.authenticate();
      console.log(
         "Connection to the database has been established successfully."
      );
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }
}

testConnection();

module.exports = sequelize;
