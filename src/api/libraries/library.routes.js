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

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const library = await Library.findById(id);
    return res.status(200).json(library);
  } catch (error) {
    next(error); //es necesario el return?
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const library = req.body;

    const newLibrary = new Library(library);
    const created = await newLibrary.save();
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const library = req.body;
      const libraryModify = new Library(library);
      libraryModify._id = id;
      const libraryUpdated = await Library.findByIdAndUpdate(id, libraryModify);
      return res.status(200).json({message: "The library has been modified succesfully", libraryModified: libraryUpdated});  
      
    } catch (error) {
      next(error);
    }
});

router.delete("/delete/:id", async (req, res, next) => {

    try {
        const id = req.params.id;
        const libraryToDelete = await Library.findByIdAndDelete(id);
        return res.status(200).json({message: "The library has been succesfully removed", deletedLibrary: libraryToDelete});
    } catch (error) {
        next(error);
    }

})

module.exports = router;