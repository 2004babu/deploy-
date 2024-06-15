const express=require('express');
const { sendStripeApi, processPayment } = require('../Controller/paymentController');
const {isAuthendicateUser}=require('../MiddleWares/authendicate')
const router=express.Router();

router.route('/stripeapi').get(isAuthendicateUser,sendStripeApi)
router.route('/payment/process').post(isAuthendicateUser,processPayment) 


module.exports = router;