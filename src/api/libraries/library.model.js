const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const librarySchema = new Schema (
    {
        name: {type: String, enum: ["bcrypt", "cloudinary", "cors", "dotenv", "express", "express-validator", "jsonwebtoken", "mongoose", "mongoose-unique-validator", "multer", "multer-storage-cloudinary", "nodemon"], required:true},
        description: {type: String, required: true, trim: true},
        version:{type: String, trim: true, required: true},
        commands: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: "commands"}],
        img: {type: String, default:"https://pbs.twimg.com/profile_images/1473729155506319360/TjcpeV6k_400x400.jpg", trim:true},
    },
    {
        timestamps: true,
    }
);

const Library = mongoose.model("libraries", librarySchema);

module.exports = Library;