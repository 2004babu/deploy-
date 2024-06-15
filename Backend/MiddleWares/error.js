
const ErrorHandler = require("../util/errorHandler");

// require("dotenv").config();
module.exports = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;

  ///////development
  if (process.env.NODE_ENV == "development") {
    res.status(err.statuscode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });

    ///////production 
  } else if (process.env.NODE_ENV == "Production") {
    let message = err.message;
    let error = new Error(message);
///////mongoose validation 
    if (err.name == "ValidationError") {
      message = Object.values(err.errors).map((value) => value.message);
      error = new Error(message);
      error.statuscode=400
      
    }
    ///////mongoose object id error 
    if (err.name == "CastError") {
      
      message = `Resuorce Not Found :${err.path}`;
      error = new Error(message);
      error.statuscode=400
      
    }
  
    res.status(err.statuscode).json({
      success: false,
      message: error.message || "internal server Error",
    });
  } else {
    // Handle unexpected environment values
    res.status(err.statuscode).json({
      success: false,
      message: "An error occurred",
    });
  }
};
