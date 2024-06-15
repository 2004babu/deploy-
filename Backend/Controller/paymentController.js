const catchAsyncError=require( '../MiddleWares/catchAsyncError')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.processPayment=catchAsyncError(async(req,res,next)=>{

    const paymentIntent=await stripe.paymentIntents.create({
        description:"test payment",
        amount:req.body.amount,
        currency:'usd',
        metadata:{intergration_check :"accept_payment"},
        shipping:req.body.shipping
    })


    res.status(200).json({
        success:true,
        client_secret:paymentIntent.client_secret
    })
})
exports.sendStripeApi=catchAsyncError(async(req,res,next)=>{
    res.status(200).json({
        success:true,
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})
