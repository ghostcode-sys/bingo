// global imports
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// local imports
const UserData = require("../models/user");

// route obj
const route = express.Router();

route.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const isUser = await UserData.findOne({ username: body.username });
    if (!isUser) {
      const data = new UserData({ ...body });
      const savedUser = await data.save();
      if (savedUser) {
        var token = jwt.sign({ userName: body.username }, process.env.JWTKEY);
        res.status(200).json({ data, token });
      }
    } else {
      res.status(204).send("User already exists");
    }
  } catch (error) {
    res.status(400).json({ error, msg: "error occurred at signup" });
  }
});

route.post("/login", async (req, res) => {
  try {
    const body = req.body;

    const isUser = await UserData.findOne({ username: body.username });
    if (isUser) {
      const isSafe = await bcrypt.compare(body.password, isUser.password);
      if (isSafe) {
        res.status(200).json({ msg: `hello ${isUser.name}`, name:isUser.name });
      } else {
        res.status(204).send("Error while logging in");
      }
    } else {
      res.status(204).send("Error while logging in");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
module.exports = route;
