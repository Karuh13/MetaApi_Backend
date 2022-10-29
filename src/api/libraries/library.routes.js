const express = require("express");
const Library = require("./library.model");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const allLibraries = await Library.find().lean();
        return res.status(200).json(allLibraries);
    } catch (error) {
        next(error);
    }
});

module.exports = router;