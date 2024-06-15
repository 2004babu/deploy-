const jwt = require('jsonwebtoken');
const catchAsyncError=require('../MiddleWares/catchAsyncError')
const ErrorHandler=require('../util/errorHandler')
const User =require('../model/userModel')
exports.isAuthendicateUser=catchAsyncError(async(req,res,next)=>{
    
    const { token  }  = req.cookies;
    if (!token) {
    return next(new ErrorHandler('Login First this To Handle .....',401))        
    }

    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id);

    next()
})

exports.autherizeRole=(...roles)=>{
    return(req,res,next)=>{       
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} not allowed ......only admins Can `,401))
        }
        next()
    }
    
}
