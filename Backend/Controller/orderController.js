const { default: mongoose } = require('mongoose')
const catchAsyncError=require('../MiddleWares/catchAsyncError')
const Order=require('../model/orderModel')
const Product=require('../model/ProductModel')
const ErrorHandler = require('../util/errorHandler')



// getsingleOrder  -api/v1/order/new 

exports.newOrder=catchAsyncError(async(req,res,next)=>{

    
    const {
        orderItems,shippingInfo,itemsPrice,taxPrice,totalPrice,paymentAmount,paymentInfo,shippingPrice,orderStatus
    }=req.body

    const order= await Order.create({
        orderItems,shippingInfo,itemsPrice,taxPrice,totalPrice,paymentAmount,paymentInfo,shippingPrice,orderStatus,
        paidAt:Date.now(),
        user:req.user.id
    })
    
    if (!order) {
        return next(new ErrorHandler('Connot Create Order ......'))
    }
    await order.save({validateBeforeSave:true})
    res.status(200).json({
        success:true,
        order
    })
})


// getsingleOrder  -api/v1/order/:id
exports.getsingleOrder=catchAsyncError(async(req,res,next)=>{
      
    const order= await Order.findById(req.params.id).populate('user','name email')

    if (!order) {
      return  next(new ErrorHandler('connot Find Your Order ..',404))
    }
    
    res.status(200).json({
        success:true,
        order
    })
})


//   myOrder Lits  --api/v1/myOrders/:id
exports.myOrders=catchAsyncError(async(req,res,next)=>{
     const orders=await Order.find({user:req.user})
     if(!orders){
        return next(new ErrorHandler('connot found your Data ..'))
     }
     console.log(orders);
     res.status(200).json({
        success:true,
        count:orders.length,
        orders
     })
})


/////Admin Get All Orders  - api/v1/orders
exports.getAllOrders=catchAsyncError(async(req,res,next)=>{

    const orders=await Order.find();

    if(!orders){
        return next(new ErrorHandler('coonot find your Data '))
    }
let totalAmount=0;

orders.forEach(order => {
   totalAmount+= order.totalPrice
});
    res.status(200).json(
        
        {success:true,
            totalAmount,
            orders
        }
    )
})

// update Order api/v1/order/:id

exports.updateOrder=catchAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id);

    if(order.orderStatus=='Delivered'){
        return next(new ErrorHandler('order Has Been Alresdy Delivered!',400))
    }
console.log(order);
    order.orderItems.forEach(async orderItem=>{
       await updateStock( orderItem.product,orderItem.quantity);
      
    })
    order.orderStatus=req.body.orderStatus;
    order.deliveredAt=Date.now()
    await order.save()

    res.status(200).json({success:true,
        order
    });

})

async function updateStock(productId,quantity){
    const product =await Product.findById(productId);
    console.log(product);
    product.stock=product.stock - quantity;
    console.log("productMOdel",product);
   await  product.save({validateBeforeSave:false})
}


exports.deleteOrder=catchAsyncError(async(req,res,next)=>{

const order=await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        return next(new ErrorHandler('connnot Find Order ',404))
    } 
    res.status(200).json({
        success:true,
        message:"delete Suucesss",
        order
    })
})





// Create Reviews  api/v1/review

exports.createReview=catchAsyncError(async(req,res,next)=>{
    const {ratings,comment}=req.body;
    const {id:productId}=req.params;

    const product=await Product.findById(productId);
    console.log(req.body);
    if(!product){
        return next(new ErrorHandler('Not Found This Id '))
    }
    const review={
        user:req.user.id,
        ratings ,
        comment
    }
    //findig user Already exisits

    let isReviewed=product.reviews.find(review=>{
        return review.user.toString()===req.user.id.toString()
    })

    if (isReviewed) {
        // update Already Reviewed Data
        product.reviews.forEach(review=>{
            if(review.user.toString()==req.user.id.toString()){
                review.comment=comment
                review.ratings=ratings
                product.numOfReviews=product.reviews.length;
            }
        })
    }else{
        //  create new review 
        console.log(review);
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    product.ratings=product.reviews.reduce((acc,review)=>{
        return review.ratings + acc;
    },0)/product.reviews.length;

    product.ratings=isNaN(product.ratings)?0:product.ratings

    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        product
    })
})


// get Reviews  api/v1/reviews/?id=
exports.getReviews=catchAsyncError(async(req,res,next)=>
{
    const product=await Product.findById(req.query.id).populate('reviews.user','name email');

    if (!product) {
        return next(new ErrorHandler('not Found Your Product',400))
        
    }
    res.status(200).json({
        success:true,
        reviews:product.reviews
    })
})

exports.deleteReview=catchAsyncError(async(req,res,next)=>{
    const productId=req.query.productId.trim()
    const reviewId=req.query.id.trim();

    if(!mongoose.Types.ObjectId.isValid(productId)||!mongoose.Types.ObjectId.isValid(reviewId)){
        return next(new ErrorHandler('Invalid product ID or review ID', 400))
    }

    console.log(productId,reviewId);
    const product=await Product.findById(productId);
   console.log(product);
    if(!product.reviews.length){
        return next(new ErrorHandler('no reviews there this id ...'))
    }
    const reviews=product.reviews.filter((value)=>{

        return value._id.toString()!==reviewId.toString();
    })
    let numOfReviews=reviews.length;

    let ratings=reviews.reduce((acc,review)=>{
        return review.rating+acc;

    },0)/reviews.length;

    ratings=isNaN(ratings)?0:ratings;

    await Product.findByIdAndUpdate(productId,{
        reviews,
        numOfReviews,
        ratings
    },{new:true})
    res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        product
    });
})
// exports.newOrder=catchAsyncError(async(req,res,next)=>{
// })