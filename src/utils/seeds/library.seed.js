const mongoose = require("mongoose");
const Library = require("../../api/libraries/library.model");
const connectDb = require("../database/db");

const libraries = [
    {
        name: "nodemon",
        description: "Allows to make changes to the project and automatically reboot the server",
        version: "2.0.20",
    },
    {
        name: "mongoose",
        description: "Gives you the tools to connect and use a Mongo Database",
        version:"6.7.0",
    },
];

connectDb()
.then(async () => {
    const allLibraries = await Library.find().lean();

    if (!allLibraries.length){
        console.log("[seed]: No libraries found, continuing...");
    } else {
        console.log(`[seed]: ${allLibraries.length} library(ies) found.`);
        await Library.collection.drop();
        console.log("[seed]: Collection 'libraries' succesfully removed");
    }
})
.catch((error) => console.log("There has been an error removing the libraries ---> " + error))
.then (async () => {
    await Library.insertMany(libraries)
    console.log("[seed]: New libraries succesfully uploaded to the database");
})
.catch((error) => console.log("There has been an error inserting the libraries ---> " + error))
.finally(() => mongoose.disconnect());