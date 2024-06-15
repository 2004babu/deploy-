// import {
//   useElements,
//   useStripe,
//   CardCvcElement,
//   CardExpiryElement,
//   CardNumberElement,
// } from "@stripe/react-stripe-js";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { validateShipping } from "./Shipping";
// import { orderCompleted } from "../../slices/cartslice";

// const Payment = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   let orderInfo = sessionStorage.getItem("orderInfo")
//     ? JSON.parse(sessionStorage.getItem("orderInfo"))
//     : [];
//   const { user } = useSelector((state) => state.authState);
//   const { items: cartItems, shippingInfo } = useSelector(
//     (state) => state.cartState
//   );
//   console.log(orderInfo);

//   const paymentData = {
//     amount: 5000,
//     shipping: {
//       name: user.name,
//       address: {
//         city: shippingInfo.city,
//         postal_code: shippingInfo.postalCode,
//         country: shippingInfo.country,
//         state: shippingInfo.state,
//         line1: shippingInfo.address,
//       },
//       phone: shippingInfo.phoneNo,
//     },
//   };

//   const order = {
//     orderItems: cartItems,
//     shippingInfo,
//     itemsPrice: orderInfo.itemsPrice,
//     shippingPrice: orderInfo.shippingPrice,
//     taxPrice: orderInfo.taxPrice,
//     totalPrice: orderInfo.totalPrice,
//   };

//   // Validate the shipping info
//   useEffect(() => {
//     validateShipping(shippingInfo, navigate);
//   }, [shippingInfo, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     document.querySelector("#pay_btn").disabled = true;
//     try {
//       const { data } = await axios.post("/api/v1/payment/process", paymentData);
//       const clientSecret = data.client_secret;
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             name: user.name,
//             email: user.email,
//           },
//         },
//       });
//       if (result.paymentIntent) {
//         toast("Payment Success!", {
//           type: "success",
//           position: toast.POSITION.BOTTOM_CENTER,
//         });
//         // order.paymentInfo = {
//         //     id: result.paymentIntent.id,
//         //     status: result.paymentIntent.status
//         // }
//         dispatch(orderCompleted());
//         // dispatch(createOrder(order))

//         navigate("/order/success");
//       } else {
//         toast("Please Try again!", {
//           type: "warning",
//           position: toast.POSITION.BOTTOM_CENTER,
//         });
//       }
//       console.log(result);
//       if (result.error) {
//         toast(result.error.message, {
//           type: "error",
//           position: toast.POSITION.BOTTOM_CENTER,
//         });
//         document.querySelector("#pay_btn").disabled = false;
//       }
//     } catch (error) {}
//   };

//   return (
//     <div className="row wrapper">
//       <div className="col-10 col-lg-5">
//         <form onSubmit={handleSubmit} className="shadow-lg">
//           <h1 className="mb-4">Card Info</h1>
//           <div className="form-group">
//             <label htmlFor="card_num_field">Card Number</label>
//             <CardNumberElement
//               type="text"
//               id="card_num_field"
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="card_exp_field">Card Expiry</label>
//             <CardExpiryElement
//               type="text"
//               id="card_exp_field"
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="card_cvc_field">Card CVC</label>
//             <CardCvcElement
//               type="text"
//               id="card_cvc_field"
//               className="form-control"
//             />
//           </div>
//           <button id="pay_btn" type="submit" className="btn btn-block py-3">
//             Pay - {` $${orderInfo && orderInfo.totalPrice}`}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Payment;

// // const handleSubmit = async (e) => {
// //   e.preventDefault();
// //   document.querySelector('#pay_btn').disabled = true;

// //   try {
// //     const { data } = await axios.post('/api/v1/payment/process', paymentData);
// //     const clientSecret = data.client_secret;

// //     if (!stripe || !elements) {
// //       // Stripe.js has not yet loaded.
// //       toast('Stripe has not yet loaded', { type: 'error' });
// //       return;
// //     }

// //     const result = await stripe.confirmCardPayment(clientSecret, {
// //       payment_method: {
// //         card: elements.getElement(CardNumberElement),
// //         billing_details: {
// //           name: user.name,
// //           email: user.email,
// //         },
// //       },
// //     });

// //     if(result.error){
// //       toast(result.error.message, {
// //           type: 'error',
// //           position: toast.POSITION.BOTTOM_CENTER
// //       })
// //       document.querySelector('#pay_btn').disabled = false;
// //       }else{
// //       if((await result).paymentIntent.status === 'succeeded') {
// //           toast('Payment Success!', {
// //               type: 'success',
// //               position: toast.POSITION.BOTTOM_CENTER
// //           })
// //           // order.paymentInfo = {
// //           //     id: result.paymentIntent.id,
// //           //     status: result.paymentIntent.status
// //           // }
// //           dispatch(orderCompleted())
// //           // dispatch(createOrder(order))

// //           navigate('/order/success')
// //      } catch(error){
// //     toast('An error occurred. Please try again.', { type: 'error' });
// //     document.querySelector('#pay_btn').disabled = false;
// //   }

// // };

// // };


import { useElements, useStripe } from "@stripe/react-stripe-js"
import { CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartslice";
import {validateShipping} from './Shipping';

import { clearError as clearOrderError } from "../../slices/orderSlice";
import { createOrder } from "../../actions/orderAcitons";

export default function Payment() {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo')) 
    const { user } = useSelector(state => state.authState)
    const {items:cartItems, shippingInfo } = useSelector(state => state.cartState)
    const { error:orderError } = useSelector(state => state.orderState)

    let paymentData;

    console.log(orderInfo);
   if(orderInfo){
    
     paymentData = {
      amount : Math.round( orderInfo.totalPrice * 100) ,
      shipping :{
          name: user.name,
          address:{
              city: shippingInfo.city,
              postal_code : shippingInfo.postalCode,
              country: shippingInfo.country,
              state: shippingInfo.state,
              line1 : shippingInfo.address
          },
          phone: shippingInfo.phoneNo
      }
  }
   }

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    if(orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
        
    }

    useEffect(() => {
        validateShipping(shippingInfo, navigate)
        if(orderError) {
            toast(orderError, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearOrderError()) }
            })
            return
        }

    },[shippingInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#pay_btn').disabled = true;
        try {
            const {data} = await axios.post('/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if(result.error){
                toast(result.error.message, {
                    type: 'error'
                })
                document.querySelector('#pay_btn').disabled = false;
            }else{
                if((await result).paymentIntent.status === 'succeeded') {
                    toast('Payment Success!', {
                        type: 'success'
                    })
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(orderCompleted())
                    dispatch(createOrder(order))

                    navigate('/order/success')
                }else{
                    toast('Please Try again!', {
                        type: 'warning'
                    })
                }
            }


        } catch (error) {
            
        }
    }


     return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form onSubmit={submitHandler} className="shadow-lg">
                    <h1 className="mb-4">Card Info</h1>
                    <div className="form-group">
                    <label htmlFor="card_num_field">Card Number</label>
                    <CardNumberElement
                        type="text"
                        id="card_num_field"
                        className="form-control"
                       
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_exp_field">Card Expiry</label>
                    <CardExpiryElement
                        type="text"
                        id="card_exp_field"
                        className="form-control"
                       
                    />
                    </div>
                    
                    <div className="form-group">
                    <label htmlFor="card_cvc_field">Card CVC</label>
                    <CardCvcElement
                        type="text"
                        id="card_cvc_field"
                        className="form-control"
                        value=""
                    />
                    </div>
        
                
                    <button
                    id="pay_btn"
                    type="submit"
                    className="btn btn-block py-3"
                    >
                    Pay - { ` $${orderInfo && orderInfo.totalPrice}` }
                    </button>
        
                </form>
            </div>
        </div>
    )
}