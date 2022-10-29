const express = require("express");
const File = require("./file.model");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const allFiles = await File.find().lean();
        return res.status(200).json(allFiles);
    } catch (error) {
        next(error);
    }
});

module.exports = router;