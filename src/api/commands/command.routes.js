const express = require("express");
const Command = require("./command.model");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try{
        const allCommands = await Command.find().lean();
        return res.status(200).json(allCommands);
    } catch (error) {
        next(error);
    }
});

module.exports = router;