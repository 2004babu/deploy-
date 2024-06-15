import React, { Fragment, useEffect, useState } from "react";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, clearUpdateOrder } from "../../slices/orderSlice";
import { Link } from "react-router-dom";
import {
  orderDetail as orderDetailAction,
  updateOrder,
} from "../../actions/orderAcitons";

const UpdateOrder = () => {
  const {
    isOrderUpdated = null,
    error = null,
    orderDetail,
    loading,
  } = useSelector((state) => state.orderState);
  const {
    user = {},
    orderItems = [],
    shippingInfo = {},
    totalPrice = 0,
    paymentInfo = {},

  } = orderDetail;
  const dispatch = useDispatch();
  const { id } = useParams();

  const [orderStatus, setOrderStatus] = useState("Processing");
  const [name, setName] = useState('');

  const isPaid = paymentInfo.status === "succeeded" ? true : false;

  const submitHandler = (e) => {
    const data = {};
    data.orderStatus=orderStatus
    dispatch(updateOrder(id, data));
    if(user.name){
        setName(user.name)
    }
  };
  
  useEffect(() => {
    if (isOrderUpdated) {
      toast("Order updated succeess.", {
        type: "success",
        onOpen: () => dispatch(clearUpdateOrder()),
      });
    }
    if (error) {
      toast(error, {
        type: "error",
        onOpen: () => dispatch(clearError()),
      });
    }
    dispatch(orderDetailAction(id));
  
  }, [error, isOrderUpdated, id, dispatch]);

  useEffect(()=>{
    if(orderDetail.orderStatus) {setOrderStatus(orderDetail.orderStatus)}
  },[orderDetail])
  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>
      <div className="col-12 col-md-10">
        <Fragment>
          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-8 mt-5 order-details">
              <h1 className="my-5">Order # {orderDetail._id}</h1>

              <h4 className="mb-4">Shipping Info</h4>
              <p>
                <b>Name:</b> {user.name ||name}
              </p>
              <p>
                <b>Phone:</b> {shippingInfo.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b>
                {shippingInfo.address}, {shippingInfo.city},{" "}
                {shippingInfo.postalCode}, {shippingInfo.state},{" "}
                {shippingInfo.country}
              </p>
              <p>
                <b>Amount:</b> ${totalPrice}
              </p>

              <hr />

              <h4 className="my-4">Payment</h4>
              <p className={isPaid ? "greenColor" : "redColor"}>
                <b>{isPaid ? "PAID" : "NOT PAID"}</b>
              </p>

              <h4 className="my-4">Order Status:</h4>
              <p
                className={
                  orderStatus && orderStatus.includes("Delivered")
                    ? "greenColor"
                    : "redColor"
                }
              >
                <b>{orderStatus}</b>
              </p>

              <h4 className="my-4">Order Items:</h4>

              <hr />
              <div className="cart-item my-1">
                {orderItems &&
                  orderItems.map((item,i) => (
                    <div key={i} className="row my-5">
                      <div key={i} className="col-4 col-lg-2">
                        <img key={i}
                          src={item.image}
                          alt={item.name}
                          height="45"
                          width="65"
                        />
                      </div>

                      <div className="col-5 col-lg-5">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>

                      <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p>${item.price}</p>
                      </div>

                      <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                        <p>{item.quantity} Piece(s)</p>
                      </div>
                    </div>
                  ))}
              </div>
              <hr />
            </div>
            <div className="col-12 col-lg-3 mt-5">
              <h4 className="my-4">Order Status</h4>
              <div className="form-group">
                <select
                  className="form-control"
                  onChange={(e) => setOrderStatus(e.target.value)}
                  value={orderStatus}
                  name="status"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
              <button
                disabled={loading}
                onClick={submitHandler}
                className="btn btn-primary btn-block"
              >
                Update Status
              </button>
            </div>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default UpdateOrder;
