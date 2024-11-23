const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type:String,
    required: [true,'Title is required'],
    minLength:[3,"Title must be Greater than three characters."],
    unique: true
  },
  content: {
    type:String,
    required:[true,'Content is required'],
    minLength:[10,"Content must be greater than 10 characters."]
  
  },
  date: {
    type:String,
    default:Date.now()
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
});

module.exports= todoSchema