import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { decreaseCartItem, increaseCartItem, removeItemFormCart } from '../../slices/cartslice';

const Cart = () => {
    const dispatch=useDispatch()
     const {items}=useSelector(state=>state.cartState);

     const Subtotal=()=>{
       return items.reduce((acc,value)=>{
            return acc +value.quantity
        },0)
     }
    
     const subtlemoney=()=>{
       return items.reduce((acc,value)=>{
            return acc +value.quantity*value.price
        },0)
     }
    
  return (
    <Fragment>
                {items.length==0 ?
                 <h2 className="mt-5">Your Cart Is empty</h2> :
                <Fragment>
                    
                    <h2 className="mt-5">Your Cart: <b>{items.length} items</b></h2>
                    {items.map(item=>
                          <div className="row d-flex justify-content-between" key={item.product}>
                          <div className="col-12 col-lg-8">
                              <hr />
                              <div className="cart-item">
                                  <div className="row">
                                      <div className="col-4 col-lg-3">
                                          <img src={item.image} alt="Laptop" height="90" width="115"/>
                                      </div>
          
                                      <div className="col-5 col-lg-3">
                                          <Link to={`/products/${item.product}`}>{item.name}</Link>
                                      </div>
          
          
                                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                          <p id="card_item_price">${item.price}</p>
                                      </div>
          
                                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                          <div className="stockCounter d-inline">
                                              <span className="btn btn-danger minus" onClick={()=>dispatch(decreaseCartItem(item.product))}>-</span>
                                              <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                              <span className="btn btn-primary plus" onClick={()=>dispatch(increaseCartItem(item.product))}>+</span>
                                          </div>
                                      </div>
          
                                      <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                          <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>dispatch(removeItemFormCart(item.product))}></i>
                                      </div>
          
                                  </div>
                              </div>
                              <hr />
                          </div>
          
                      </div>
                    )}
                          <div className="col-12 col-lg-3 my-4">
                              <div id="order_summary">
                                  <h4>Order Summary</h4>
                                  <hr />
                                  <p>Subtotal:  <span className="order-summary-values">{Subtotal()} (Units)</span></p>
                                  <p>Est. total: <span className="order-summary-values">${subtlemoney()}</span></p>
          
                                  <hr />
                                  <Link to={'/login?redirect=shipping'}>
                                  <button id="checkout_btn" className="btn btn-primary btn-block" >Check out</button>
                                  </Link>
                              </div>
                          </div>
                  
                    </Fragment>}
            
    </Fragment>
  )
}

export default Cart;
