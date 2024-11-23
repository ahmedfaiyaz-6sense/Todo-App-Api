const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todo_schema");
const userSchema = require("../schemas/user_schema");
const verify_jwt = require("../middlewares/verify_jwt");
const Todo = mongoose.model("Todo", todoSchema);
const todoRoute = express();

todoRoute.get("/all", async (req, res) => {
  try {
    const results = await Todo.find().populate('author');
    res.status(200).send({
      status: "Success",
      message: results,
    });
  } catch (error) {
    res.status(400).send({
      status: "Failed",
      message: error.message,
    });
  }
});
todoRoute.get("/title/:title", async (req, res) => {
  try {
    const result = await Todo.findOne({
      title: req.params.title,
    });
    res.status(201).send({
      status: "Success",
      message: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: error,
    });
  }
});

todoRoute.get("/:id", async (req, res) => {
  try {
    const result = await Todo.findById(req.params.id);
    res.status(201).send({
      status: "Success",
      message: result,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: error,
    });
  }
});
todoRoute.post("/batch_add_todos", async (req, res) => {
  try {
    const results = await Todo.insertMany(req.body);
    res.status(201).send({
      status: "Success",
      message: results,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err.message,
    });
  }
});
todoRoute.post("/add_todo", verify_jwt,async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
    content: req.body.content,
    author: req.userid
  });
  try {
    const response = await newTodo.save();

    res.status(201).send({
      status: "Success",
      message: response,
    });
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err.message,
    });
  }
});

todoRoute.put("/:id", async (req, res) => {
  try {
    const filter = { _id: req.params.id };
    const query = {};
    if (req.body?.title) {
      query.title = req.body.title;
    }
    if (req.body?.content) {
      query.content = req.body.content;
    }
    const result = await Todo.findOneAndUpdate(filter, query);
    if(result){
    res.status(200).send({
      status: "Success",
      message: result,
    });
    }else{
        res.status(400).send({
            status: "Failed",
        });
          
    }
  } catch (err) {
    res.status(400).send({
      status: "Failed",
      message: err,
    });
  }
});
todoRoute.delete("/:id",async (req, res) => {
    try{
        //console.log(req.params)
        const result = await Todo.findOneAndDelete({_id:req.params.id})
        if(result){
          res.status(200).send({
            status:"Success",
            message:result
            })
        }
        else{
            res.status(404).send({
                status:"Failed",
            })
        }

    }catch(err){
        res.status(400).send({
            status:"Failed",
            message:err
        })
    }
});
module.exports = todoRoute;
