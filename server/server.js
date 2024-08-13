// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

const app = require("./app");

const PORT = process.env.PORT || 7000;
const HOST = "0.0.0.0"; // This will bind the server to all network interfaces

const server = app.listen(PORT, HOST, () => {
   console.log(`Server running at http://${HOST}:${PORT}/`);
});
