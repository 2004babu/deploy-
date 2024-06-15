const express=require('express')
const router=express.Router();
const {isAuthendicateUser,autherizeRole}=require('../MiddleWares/authendicate');
const { newOrder, getsingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder,createReview,getReviews,deleteReview } = require('../Controller/orderController');

router.route('/order/new').post(isAuthendicateUser,newOrder)
router.route('/order/:id').get(isAuthendicateUser,getsingleOrder)
router.route('/myOrders').get(isAuthendicateUser,myOrders)


//Admin Routes  
router.route('/orders').get(isAuthendicateUser,autherizeRole('admin'),getAllOrders)
router.route('/order/:id').put(isAuthendicateUser,autherizeRole('admin'),updateOrder)
.delete(isAuthendicateUser,autherizeRole('admin'),deleteOrder)
router.route('/review/:id').put(isAuthendicateUser,createReview)
router.route('/reviews').get(isAuthendicateUser,autherizeRole('admin'),getReviews)
                        .delete(isAuthendicateUser,autherizeRole('admin'),deleteReview)


module.exports=router;