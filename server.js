const express = require("express");
const app = express();
const port = 3000;

require("./database");

app.get("/", (req, res) => {
   res.send("Hello there...");
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
