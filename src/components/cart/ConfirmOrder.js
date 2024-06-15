import React, { Fragment, useEffect } from 'react'
import { validateShipping } from './Shipping'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {
    const dispatch = useDispatch();
    const {shippingInfo,items } = useSelector(state => state.cartState)
    const {user } = useSelector(state => state.authState)
    const navigate = useNavigate();
    useEffect(()=>{
        validateShipping(shippingInfo,navigate)
    },[shippingInfo,navigate])

    const itemsPrice=items.reduce((acc,item)=>{return acc + item.quantity*item.price},0)
    let taxPrice=Number(0.05*itemsPrice)
    const shippingCharge=itemsPrice >=200 ?0:25;
    const totalPrice= itemsPrice+taxPrice+shippingCharge
    taxPrice =Number(taxPrice).toFixed(2)

    const processPayment=()=>
        { const userData={
            itemsPrice,
            shippingCharge,
            taxPrice,
            totalPrice,
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(userData))
        navigate('/payment')
        }

  return (
        <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-confirm">
                    <h4 className="mb-3">Shipping Info</h4>
                    <p><b>Name:</b>{user.name}</p>
                    <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
                    <p className="mb-4"><b>Address:</b> {shippingInfo.address}, {shippingInfo.city}, Chennai {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country} </p>
                    
                    <hr />
                    <h4 className="mt-4">Your Cart Items: </h4>

                    <hr />
                    {items.map(item=>
                        <Fragment key={item.product}><div className="cart-item my-1">
                        <div className="row">
                            <div className="col-4 col-lg-2">
                                <img src={item.image} alt={item.name} height="45" width="65"/>
                            </div>

                            <div className="col-5 col-lg-6">
                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                            </div>


                            <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                <p>{item.quantity}x ${item.price} = <b>${item.price*item.quantity}</b></p>
                            </div>

                        </div>
                    </div>
                    <hr /></Fragment>
                    )}

                </div>
                
                <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{itemsPrice}</span></p>
                            <p>Shipping: <span className="order-summary-values">{shippingCharge}</span></p>
                            <p>taxPrice:  <span className="order-summary-values">{taxPrice}</span></p>

                            <hr />

                            <p>Total: <span className="order-summary-values">{totalPrice.toFixed(2)}</span></p>

                            <hr />
                            <button  id="checkout_btn" className="btn btn-primary btn-block" onClick={processPayment}>Proceed to Payment</button>
                        </div>
                </div>
        </div>
  )
}

export default ConfirmOrder
