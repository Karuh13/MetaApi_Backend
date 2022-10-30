const express = require("express");
const Library = require("./library.model");

const router = express.Router();

const { isAuth } = require('../../middlewares/auth');
const upload = require("../../middlewares/file");
const deleteFile = require("../../middlewares/deletefile");

router.get('/', async (req, res, next) => {
    try {
        const allLibraries = await Library.find().lean().populate("commands");
        return res.status(200).json(allLibraries);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const library = await Library.findById(id).lean().populate("commands");
    return res.status(200).json(library);
  } catch (error) {
    next(error); //es necesario el return?
  }
});

router.post("/create", [isAuth], upload.single("img"), async (req, res, next) => {
  try {
    const library = req.body;
    if (req.file) {
      library.img = req.file.path;
    }
    const newLibrary = new Library(library);
    const created = await newLibrary.save();
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", [isAuth], upload.single("img"), async (req, res, next) => {
    try {
      const id = req.params.id;
      const library = req.body; //* cambiarlo para que solo modifique los campos que hemos pasado y el resto los deje como estaban.
      const libraryOld = await Library.findById(id);
      if (req.file) {
        if (libraryOld.img) {
          deleteFile(libraryOld.img);
        }
        library.img = req.file.path;
      }
      const libraryModify = new Library(library);
      libraryModify._id = id;
      const libraryUpdated = await Library.findByIdAndUpdate(id, libraryModify);
      return res.status(200).json({message: "The library has been modified succesfully", libraryModified: libraryUpdated});  
      
    } catch (error) {
      next(error);
    }
});

router.delete("/delete/:id", [isAuth], async (req, res, next) => {

    try {
        const id = req.params.id;
        const libraryToDelete = await Library.findByIdAndDelete(id);
        deleteFile(libraryToDelete.img);
        return res.status(200).json({message: "The library has been succesfully removed", deletedLibrary: libraryToDelete});
    } catch (error) {
        next(error);
    }

})

module.exports = router;