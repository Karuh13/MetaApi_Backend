const express = require("express");
const File = require("./file.model");

const router = express.Router();

const { isAuth } = require('../../middlewares/auth');
const upload = require("../../middlewares/file");
const deleteFile = require("../../middlewares/deletefile");

router.get("/", async (req, res, next) => {
  try {
    const allFiles = await File.find().lean().populate("libraries");
    return res.status(200).json(allFiles);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const file = await File.findById(id).lean().populate("libraries");
    return res.status(200).json(file);
  } catch (error) {
    next(error); //es necesario el return?
  }
});

router.post("/create", [isAuth], upload.single("img"), async (req, res, next) => {
  try {
    const file = req.body;
    if(req.file) {
      file.img = req.file.path;
    }
    const newFile = new File(file);
    const created = await newFile.save();
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", [isAuth], upload.single("img"), async (req, res, next) => {
    try {
      const id = req.params.id;
      const file = req.body;
      const oldFile = await File.findById(id);
      if (req.file) {
        if (oldFile.img) {
          deleteFile(oldFile.img);
        }
        file.img = req.file.path;
      }
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
        deleteFile(fileToDelete.img);
        return res.status(200).json({message: "The file has been succesfully removed", deletedFile: fileToDelete});
    } catch (error) {
        next(error);
    }

})

module.exports = router;
