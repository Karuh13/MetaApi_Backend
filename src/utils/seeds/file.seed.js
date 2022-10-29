const mongoose = require("mongoose")
const connectDb = require("../database/db")
const File = require("../../api/files/file.model")

const files = [
    {
        name: "index.js",
        rute: "./index.js",
        description: "Main file, directs the rest of the code", 
        type: "file",
    },
    {
        name: "package.json",
        rute: "./package.json",
        description: "Gives general information about the project and its dependencies and has a programmable list of scripts i.e: 'start', 'dev', '<yourFileName>Seed'...",
        type: "file",
    },
    {
        name: "db.js",
        rute: "./src/utils/database/db.js",
        description: "Uses mongoose library to make a connection to the database",
        type: "file"
    },
    {
        name: "api",
        rute: "./src/api",
        type: "folder",
        description: "Contains all the folders that contain two files each: <yourModelName>.model.js and <yourModelName>.routes.js"
    }
]

connectDb()
.then(async () => {
    const allFiles = await File.find().lean()

    if (!allFiles.length){
        console.log("[seed]: No files found, continuing...");
    } else {
        console.log(`[seed]: ${allFiles.length} file(s) found.`);
		await File.collection.drop();
		console.log("[seed]: Collection 'files' succesfully removed");
    }
})
.catch((error) => console.log("There has been an error removing the files ---> " + error))
.then( async () => {
    await File.insertMany(files)
    console.log("[seed]: New files succesfully uploaded to the database");
})
.catch((error) => console.log("There has been an error inserting the files ---> " + error))
.finally(() => mongoose.disconnect());
