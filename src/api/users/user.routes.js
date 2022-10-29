const express = require("express");
const User = require("./user.model");
const router = express.Router();
const bcrypt = require("bcrypt");
/* const { generateSign } = require("../../utils/jwt/jwt"); */

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

module.exports = router;