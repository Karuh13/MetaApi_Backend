const express = require("express");
const File = require("./file.model");

const router = express.Router();

const { isAuth } = require('../../middlewares/auth');


router.get("/", async (req, res, next) => {
  try {
    const allFiles = await File.find().lean();
    return res.status(200).json(allFiles);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id);
    return res.status(200).json(file);
  } catch (error) {
    next(error); //es necesario el return?
  }
});

router.post("/create", [isAuth], async (req, res, next) => {
  try {
    const file = req.body;
    const newFile = new File(file);
    const created = await newFile.save();
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", [isAuth], async (req, res, next) => {
    try {
      const id = req.params.id;
      const file = req.body;
      const fileModify = new File(file);
      fileModify._id = id;
      const fileUpdated = await File.findByIdAndUpdate(id, fileModify);
      return res.status(200).json({message: "The file has been modified succesfully", fileModified: fileUpdated});  
      
    } catch (error) {
      next(error);
    }
});

router.delete("/delete/:id", [isAuth], async (req, res, next) => {

    try {
        const id = req.params.id;
        const fileToDelete = await File.findByIdAndDelete(id);
        return res.status(200).json({message: "The file has been succesfully removed", deletedFile: fileToDelete});
    } catch (error) {
        next(error);
    }

})

module.exports = router;
