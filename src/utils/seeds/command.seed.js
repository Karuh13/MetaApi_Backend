const mongoose = require("mongoose")
const connectDb = require("../database/db")
const Command = require("../../api/commands/command.model")

const commands = [
    {
        syntaxis: "npm install express",
        description: "or 'npm i express', installs the express library"
    },
    {
        syntaxis: "npm install mongoose",
        description: "or 'npm i mongoose', installs the mongoose library"
    },
    {
        syntaxis: "npm i cloudinary cors dotenv express express-validator jsonwebtoken mongoose mongoose-unique-validator multer multer-storage-cloudinary nodemon bcrypt",
        description: "installs all the specified libaries"
    }
];

connectDb()
.then(async () => {
    const allCommands = await Command.find().lean()

    if (!allCommands.length){
        console.log("[seed]: No commands found, continuing...");
    } else {
        console.log(`[seed]: ${allCommands.length} command(s) found.`);
		await Command.collection.drop();
		console.log("[seed]: Collection 'commands' succesfully removed");
    }
})
.catch((error) => console.log("There has been an error removing the commands ---> " + error))
.then( async () => {
    await Command.insertMany(commands)
    console.log("[seed]: New commands succesfully uploaded to the database");
})
.catch((error) => console.log("There has been an error inserting the commands ---> " + error))
.finally(() => mongoose.disconnect());
