const express = require("express");
const User = require("./user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt/jwt");
const { isAdmin } = require("../../middlewares/auth");
 

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = req.body;
    const newUser = new User(user);
    if (newUser.rol === "user") {
      const created = await newUser.save();
      return res.status(201).json(created);
    } else {
      return res
        .status(500)
        .json("You are not authorized to be an admin.");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {

    try {
        const userDB = await User.findOne({email: req.body.email});
        if (!userDB) {
            return res.status(404).json("User not found");
        }
        if (bcrypt.compareSync(req.body.password, userDB.password)){
            const token = generateSign(userDB._id, userDB.email);
            return res.status(200).json({token, userDB});
        } else {
            return res.status(200).json("Incorrect password");
        }
    } catch (error) {
        next(error);
    }

});

router.post("/logout", async (req, res, next) => {

  try {
      const token = null;
      return res.status(200).json(token);
  } catch (error) {
    next(error);
    }

});

/* router.put("/edit/:email", [isAdmin], async (req, res, next) => {
  try {
    const email = req.params.email
    const user = req.body;
    const userModify = new User(user);
    const oldUser = await User.find({email: email}).lean();
    console.log(oldUser);
    userModify._id = oldUser._id;
    const userUpdated = await User.findByIdAndUpdate(oldUser._id, userModify);
    return res.status(200).json({mensaje: "The user has been updated succesfully", userModified: userUpdated});
  } catch (error) {
    next(error)
  }
}); */

router.put("/edit/:id", [isAdmin], async (req, res, next) => {
  try {
    const id = req.params.id
    const user = req.body;
    const userModify = new User(user);
    userModify._id = id;
    const userUpdated = await User.findByIdAndUpdate(id, userModify);
    return res.status(200).json({message: "The user has been updated succesfully", userModified: userUpdated});
  } catch (error) {
    next(error)
  }
});

router.delete("/delete/:id", [isAdmin], async (req, res, next) =>  {
  try {
    const id = req.params.id;
    const userToDelete = await User.findByIdAndDelete(id);
    return res.status(200).json({message: "The user has been deleted succesfully", userDeleted: userToDelete});
  } catch (error) {
   next(error);
  }
});


module.exports = router;