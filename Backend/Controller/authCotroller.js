const catchAsyncError=require('../MiddleWares/catchAsyncError');
const crypto = require("crypto");

const User=require('../model/userModel');
const ErrorHandler = require('../util/errorHandler');
const sendToken = require('../util/jwt');
const user = require('../model/userModel');
const sendEmail = require('../util/email');
// const { json } = require('body-parser');


//Register User - /api/v1/register

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const{name,email,password}=req.body

    let avatar;

    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    if (req.file) {
        avatar= `${BASE_URL}/uploads/user/${req.file.originalname}`
    }
    const newuser=await User.create({
        success:true,
        name,
        email,
        password,
        avatar
       
    });
    
    newuser.save()
    console.log('fuaygeof');
    sendToken(newuser,201,res)
   
})


//Login User - /api/v1/login

exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    // conso le.log(email,password);

    if(!email|| !password){
        return next(new ErrorHandler('please enter Email & Password..'))
    }
    const newuser=await User.findOne({email}).select('+password')
    if(!newuser){
        return next(new ErrorHandler('please enter Email & Password..'))
    }
    const isUser= await newuser.isValidPassword(password)
    if(!isUser){
        return next(new ErrorHandler('please enter Email & Password.. password not match'))
    }
    sendToken(newuser,201,res)

})


//Logout - /api/v1/logout

exports.logoutUser=(req,res,next)=>{
    
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    }).status(200).json({success:true,message:"Logouted........"})
}

//Forgot Password - /api/v1/password/forgot

exports.forgetPassword=catchAsyncError(async (req,res,next)=>{
    const newUser= await user.findOne({email: req.body.email});
    let BASE_URL = process.env.FRONTEND_URL;
    if(process.env.NODE_ENV === "Production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
        }
        
        if(!newUser){
            return next(new ErrorHandler('Not Found Your Email For Reset,. Enter COrrect Mail',401))
            }
            const resetToken=await  newUser.GetResetToken()
            // console.log(resetToken);
            await newUser.save({validateBeforeSave:false})
    const resetUrl=`${BASE_URL}/password/reset/${resetToken}`;
    const message=`Your Password reset url  as per follow \n\n
    ${resetUrl} \n\n if Have  not registered this mail,Then ignore it`
    try {
        sendEmail({
            email:newUser.email,
            subject:"Cart Password recovery",
            message
        })
        res.status(200).json({
            success:true,
            message:`Email Send To ${newUser.email}`
        })
    } catch (error) {
        newUser.resetPasswordToken=undefined;
        newUser.resetPasswordTokenExpire=undefined;
        await newUser.save({validateBeforeSave:false})
        return next(new ErrorHandler(error.message,500))
    }

})

// resetPassword -http://localhost:8000/api/v1/password/reset
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    console.log("token", req.body.token);
    let token = req.body.token;
    
    // Hash the token using SHA-256 and convert it to a hexadecimal string
    let resetPasswordToken= crypto.createHash('sha256').update(token).digest('hex'); 
    console.log(resetPasswordToken);

    // Find the user with the hashed reset token and a valid expiration date
    const findUser = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire: { $gt: Date.now() }
    });

    // Check if the user was found
    if (!findUser) {
console.log(findUser.name);
        return next(new ErrorHandler('Password ! token is invalid or expired', 400));
    }
    // Check if the password and confirm password fields match
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match. Check the confirm password field.', 400));
    }
    // Update the user's password and reset token fields
    findUser.password = req.body.password;
    findUser.resetPasswordToken = undefined;
    findUser.resetPasswordTokenExpire = undefined;

    // Save the updated user document
    await findUser.save({ validateBeforeSave: false });

    // Send a response with a token
    sendToken(findUser, 200, res);
});


// getUserProfile  -http://localhost:8000/api/v1/myprofile
exports.GetUserProfile=catchAsyncError(async(req,res,next)=>{
    const findedUser= await User.findById(req.user.id);

    if(!findedUser){
        next(new ErrorHandler('user profile not found..'))
    }
    res.status(200).json({
        success:true,
        user:findedUser
    })
});

// changePassWord -http://localhost:8000/api/v1/password/change

exports.ChangePassword=catchAsyncError(async (req,res,next)=>{
    const findedUser=await User.findById(req.user.id).select('+password');
    if (!req.body.oldPassword || !req.body.password ) {
        return next(new ErrorHandler('Enter oldpassword and password ',401))
        
    }
    if (! await findedUser.isValidPassword(req.body.oldPassword)) {
        return next(new ErrorHandler('Old PassWord Not match......',401))
    }

    findedUser.password=req.body.password;
    await findedUser.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        message:"password Changed ........"
    })
})

////////update Profile Details -http://localhost:8000/api/v1/update
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    if (!req.body.name|| !req.body.email) {
        return next(new ErrorHandler('Enter The Value Of Name and Email ..'))
    }

    let avatar;

    let newUserData={
        name:req.body.name,
        email:req.body.email,
        
    }
    let BASE_URL = process.env.BACKEND_URL;
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    if (req.file) {
        avatar= `${BASE_URL}/uploads/user/${req.file.originalname}`
        newUserData={...newUserData,avatar}
    }
    const findedUser=await User.findByIdAndUpdate(req.user.id,newUserData,{
        new :true,
        runValidators:true
    });
    res.status(200).json({
        success:true,
        messsage:"profile Details Changed .......",
        user:findedUser
    })
})

exports.getAllUsers=catchAsyncError(async(req,res,next)=>{
    const AllUsers=await User.find({});

    if (! AllUsers) {
        return  next(new ErrorHandler('connot get users .'))
    }
    res.status(200).json({
        success:true,
        usersCount:AllUsers.length,
        users:AllUsers
    })
})

///////admin roles  


exports.getUser=catchAsyncError(async(req,res,next)=>{
    const findedUser=await User.findById(req.params.id);

    if (! findedUser) {
        return  next(new ErrorHandler('connot find users .'))
    }
    res.status(200).json({
        success:true,
        user:findedUser
    });

  })
exports.UpdateUser=catchAsyncError(async(req,res,next)=>{

        const newUserData={
            name:req.body.name,
            email:req.body.email,
            role:req.body.role        
        }
        console.log(newUserData);
    const findedUser=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true
    });

    if (! findedUser) {
        return next(new ErrorHandler('connot find users .'))
    }
    res.status(200).json({
        success:true,
        user:findedUser
    });

})
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    const findedUser=await User.findByIdAndDelete(req.params.id);
    if (! findedUser) {
        return  next(new ErrorHandler('connot find users .'))
    }
    res.status(200).json({
        success:true,
        user:findedUser
        ,message:"delete Success "
    });
})