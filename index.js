const express = require("express");
require("dotenv").config();
const connectDb = require("./src/utils/database/db");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const fileRouter = require("./src/api/files/file.routes");
const commandRouter = require("./src/api/commands/command.routes");
const libraryRouter = require("./src/api/libraries/library.routes");
const userRouter = require("./src/api/users/user.routes");

const server = express();
const PORT = process.env.PORT

server.use(cors({
  origin: "*",
  credentials: true
}))

connectDb();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

server.use(express.json())
server.use(express.urlencoded({extended: false }))

server.use('/files', fileRouter)
server.use('/commands', commandRouter)
server.use('/libraries', libraryRouter)
server.use('/users', userRouter)

server.use("*", (req, res) => {
    const error = new Error("ERROR 404! THE ROUTE DOES NOT EXIST");
    return res.status(404).json(error.message);
});
  
server.use((error, req, res,next) => {
    return res.status(error.status || 500).json(error.message || "Unexpected error");
});


server.listen(PORT, () => {
    console.log("The server is up and running at: http://localhost:" + PORT);
});