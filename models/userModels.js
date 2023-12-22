const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 43,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  // here this will point the current user's Model document.
  this.password = await bcrypt.hash(this.password, salt);
});

// using instance method from mongoose library
UserSchema.methods.createJWT = function(){    
    return jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_LIFETIME,
    })
}

UserSchema.methods.comparePassword = async function(userPassword){
  const isMatched = await bcrypt.compare(userPassword, this.password);
  return isMatched;
}

module.exports = mongoose.model("User", UserSchema);
