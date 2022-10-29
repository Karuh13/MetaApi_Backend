const express = require("express");
require("dotenv").config();
const connectDb = require("./src/utils/database/db");

const fileRouter = require("./src/api/files/file.routes");
const server = express();
const PORT = process.env.PORT

connectDb();

server.use('/files', fileRouter)

server.use("*", (req, res) => {
    const error = new Error('ERROR 404! THE ROUTE DOESN´T EXIST');
    return res.status(404).json(error.message);
});
  

server.use((error, req, res,next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
});


server.listen(PORT, () => {
    console.log("The server is up and running at: http://localhost:" + PORT);
})