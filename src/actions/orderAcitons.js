import axios from "axios";
import {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  deleteOrderRequest,
  orderDetailFail,
  orderDetailRequest,
  orderDetailSuccess,
  userOrdersFail,
  userOrdersRequest,
  userOrdersSuccess,
  deleteOrderFail,
  deleteOrderSuccess,
  updateOrderRequest,
  updateOrderSuccess,
  updateOrderFail,
} from "../slices/orderSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(createOrderRequest());
    const { data } = await axios.post("/api/v1/order/new", order);
    dispatch(createOrderSuccess(data.order));
  } catch (error) {
    dispatch(createOrderFail(error.response.data.message));
  }
};
export const userOrder = async (dispatch) => {
  try {
    dispatch(userOrdersRequest());
    const { data } = await axios.get("/api/v1/myOrders");
    dispatch(userOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(userOrdersFail(error.response.data.message));
  }
};
export const orderDetail = (id) => async (dispatch) => {
  try {
    console.log(id);
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/api/v1/order/${id}`);
    dispatch(orderDetailSuccess(data.order));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};

export const adminOrderDetail = async (dispatch) => {
  try {
    dispatch(orderDetailRequest());
    const { data } = await axios.get(`/api/v1/orders`);
    dispatch(orderDetailSuccess(data.orders));
  } catch (error) {
    dispatch(orderDetailFail(error.response.data.message));
  }
};

export const orderDelete = (id) => async (dispatch) => {
  try {
    dispatch(deleteOrderRequest());
    const { data } = await axios.delete(`/api/v1/order/${id}`);
    dispatch(deleteOrderSuccess(data.order));
  } catch (error) {
    dispatch(deleteOrderFail(error.response.data.message));
  }
};

////update Order 

export const updateOrder=(id,updateData)=>async(dispatch)=>{
    try {
        dispatch(updateOrderRequest());
        const { data } = await axios.put(`/api/v1/order/${id}`,updateData);
        dispatch(updateOrderSuccess(data.order));
      } catch (error) {
        dispatch(updateOrderFail(error.response.data.message));
      }
    
}