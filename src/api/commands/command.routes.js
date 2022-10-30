const express = require("express");
const Command = require("./command.model");

const router = express.Router();

const { isAuth } = require('../../middlewares/auth');


router.get("/", async (req, res, next) => {
    try{
        const allCommands = await Command.find().lean();
        return res.status(200).json(allCommands);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const command = await Command.findById(id);
    return res.status(200).json(command);
  } catch (error) {
    next(error); //es necesario el return?
  }
});

router.post("/create", [isAuth], async (req, res, next) => {
  try {
    const command = req.body;

    const newCommand = new Command(command);
    const created = await newCommand.save();
    return res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

router.put("/edit/:id", [isAuth], async (req, res, next) => {
    try {
      const id = req.params.id;
      const command = req.body;
      const commandModify = new Command(command);
      commandModify._id = id;
      const commandUpdated = await Command.findByIdAndUpdate(id, commandModify);
      return res.status(200).json({message: "The command has been modified succesfully", commandModified: commandUpdated});  
    } catch (error) {
      next(error);
    }
});

router.delete("/delete/:id", [isAuth], async (req, res, next) => {

    try {
        const id = req.params.id;
        const commandToDelete = await Command.findByIdAndDelete(id);
        return res.status(200).json({message: "The command has been succesfully removed", deletedCommand: commandToDelete});
    } catch (error) {
        next(error);
    }

})


module.exports = router;