const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userRoute = express();
const userSchema = require("../schemas/user_schema");
const jwt = require('jsonwebtoken');
const User = mongoose.model("User", userSchema);

userRoute.get("/:id", (req, res) => {});

userRoute.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send({
        status: "Failed",
        message: "Username already exists.",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      password: passwordHashed,
    });
    const response = await user.save();
    console.log(response);
    res.status(200).send({
      status: "Success",
      message: response,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error,
    });
  }
});
userRoute.post("/login", async (req, res) => {
  try {
    const response = await User.findOne({ username: req.body.username });

    const login_password = req.body.password;
    const hashed_password = response.password;
    if (
      !response ||
      (typeof login_password === "string" &&
        typeof req.body?.username === "string")
    ) {
      const match = bcrypt.compareSync(login_password, hashed_password);
      if (match) {

        
        res.send({
          status: "Success",
          message: "Login successfull",
        });
      } else {
        res.send({
          status: "Failed",
          message: "Login Failed",
        });
      }
    } else {
      res.send({
        status: "Failed",
      });
    }
  } catch (error) {
    res.status(404).send({
      status: "Failed",
      message: error,
    });
  }
});
userRoute.put("/:id", async (req, res) => {
  try {
    const existing_user = await User.findOne({username:req.body.username});
    console.log(existing_user)
    if (existing_user) {
      res.status(400).send({
        status: "Failed",
        message: "username already exists",
      });
    } else {
        const user = await User.findById(req.params.id);
        user.username=req.body.username
        const response = await user.save()
        console.log(response)
        if (response){
            res.status(201).send({
                status:"success",
                message:response
            })
        }else{
            res.status(400).send({
                status:"Failed",
                message:response
            })
        }
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: error,
    });
  }
});

userRoute.delete("/:id", (req, res) => {

});
module.exports = userRoute;
