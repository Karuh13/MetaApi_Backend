const express = require("express");
const File = require("./file.model");

const router = express.Router();

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

router.post("/create", async (req, res, next) => {
  try {
    const file = req.body;

    const newFile = new File(file);
    console.log(newFile);
    const created = await newFile.save();
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const file = req.body;
      const fileModify = new File(file);
      fileModify._id = id;
      const fileUpdated = await File.findByIdAndUpdate(id, fileModify);
      return res.status(200).json({message: "The file has been modified succesfully", fileModified: fileModify});  
      
    } catch (error) {
      next(error);
    }
  });
module.exports = router;
