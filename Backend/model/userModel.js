const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name  "],
  },
  email: {
    type: String,
    required: [true, "Please Enter E-mail  "],
    validate: [validate.isEmail, "please Enter Valid E-Mail"],
    unique: [true],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password  "],
    // maxLength:[6,"password Connot Exceed 6 letters"],
    select: false,
  },
  avatar: {
    type: String,
    
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordTokenExpire: Date,
  user:mongoose.Schema.Types.ObjectId,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});
userSchema.pre("save", async function (next) {
  if(!this.isModified('password')){
    next()
  }
  // console.log("ismodified",this.isModified('password'));
  this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.getjwtoken = function () {
  return jsonwebtoken.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};
userSchema.plugin(uniqueValidator, {
  message: "Error, expected {PATH} to be unique. {VALUE} already exists",
});

userSchema.methods.isValidPassword = async function (enteredpassword) {
  return await bcrypt.compare(enteredpassword, this.password);
};

userSchema.methods.GetResetToken=async function(next){
  console.log('GetResetToken');
  //getnerate Token
 const token= await crypto.randomBytes(20).toString('hex');
//  get and set the this.resetPasswordToken
 this.resetPasswordToken= crypto.createHash('sha256').update(token).digest('hex'); 

 console.log("token  : ",token,"rese: ",this.resetPasswordToken);
//  set expires  date
 this.resetPasswordTokenExpire= Date.now() +30*60*1000;

 return token;

}

const user = mongoose.model("user", userSchema);
module.exports = user;

