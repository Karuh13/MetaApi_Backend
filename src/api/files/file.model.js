const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema(
    {

        name: {type: String, required: true, trim: true},
        libraries: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: "libraries"}],
        rute: {type: String, required: true, trim: true},
        description: {type: String, trim: true},
        type: {type: String, enum: ["file", "folder"], required: true},
        img: {type: String, default:"https://pbs.twimg.com/profile_images/1473729155506319360/TjcpeV6k_400x400.jpg", trim: true}
    },
    {
        timestamps: true
    }
);

const File = mongoose.model("files", fileSchema);

module.exports = File;