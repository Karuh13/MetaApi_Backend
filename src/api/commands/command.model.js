const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commandSchema = new Schema(
    {
        syntaxis: {type: String, required: true, trim: true},
        description: {type: String, required: true, trim: true}
    },
    {
        timestamps: true
    }
);

const Command = mongoose.model("commands", commandSchema);

module.exports = Command;
