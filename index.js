const express = require("express");
require("dotenv").config();

const server = express();
const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log("The server is up and running at: http://localhost:" + PORT);
})