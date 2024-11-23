const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [3, "Username must be Greater than or equal three characters."],
    maxLength: [10, "Username must be less than or equal 10 characters"],
    unique: true,
   
  },
  password: {
    type: String,
    required: [true, 'user password is required'],
    /*validate: {
      validator: (v)=>{
        return v.length >= 8;
      },
      message: (props) =>
        `${props.value} password must be hashed`,
    },*/
  
  },
});

module.exports = userSchema;