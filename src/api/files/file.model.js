const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fileSchema = new Schema(
    {

        name: {type: String, required: true},
        libraries: [{type: mongoose.Schema.Types.ObjectId, required: true, ref: "libraries"}],
        img: {type: String, defaul:"https://pbs.twimg.com/profile_images/1473729155506319360/TjcpeV6k_400x400.jpg"}
    },
    {
        timestamps: true
    }
);

const File = mongoose.model("files", fileSchema);

module.exports = File;