const jwt = require('jsonwebtoken');

// Generate and send token
const sendToken = (user, statusCode, res) => {
    const token = user.getjwtoken();
    
    const options={
        expires:new Date(
            Date.now()+process.env.COKKIE_EXPIRES_TIME *24*60*60*1000
        ),
        httpOnly:true
    }
    res
    .status(statusCode).cookie('token',token,options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
