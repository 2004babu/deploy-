import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    loading: false,
    orderDetail: {},
    userOrders: [],
    error: null,
    isOrderDeleted: false,
    isOrderUpdeted: false,
  },
  reducers: {
    createOrderRequest(state) {
      state.loading = true;
    },
    createOrderSuccess(state, action) {
      state.loading = false;
      state.orderDetail = action.payload;
    },
    createOrderFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    userOrdersRequest(state) {
      state.loading = true;
    },
    userOrdersSuccess(state, action) {
      state.loading = false;
      state.userOrders = action.payload;
    },
    userOrdersFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    orderDetailRequest(state) {
      state.loading = true;
    },
    orderDetailSuccess(state, action) {
      state.loading = false;
      state.orderDetail = action.payload;
    },
    orderDetailFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    deleteOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderDeleted: true,
      };
    },
    deleteOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearDeleteOrder(state, action) {
      return {
        ...state,
        isOrderDeleted: false,
      };
    },
    updateOrderRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },
    updateOrderSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isOrderUpdeted: true,
        orderDetail:action.payload
      };
    },
    updateOrderFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    clearUpdateOrder(state, action) {
      return {
        ...state,
        isOrderUpdeted: false,
      };
    },
  },
});

const { actions, reducer } = orderSlice;

export const {
  createOrderFail,
  createOrderRequest,
  createOrderSuccess,
  clearError,
  userOrdersFail,
  userOrdersRequest,
  userOrdersSuccess,
  orderDetailFail,
  orderDetailSuccess,
  orderDetailRequest,
  deleteOrderFail,
  deleteOrderRequest,
  deleteOrderSuccess,
  clearDeleteOrder,
  clearUpdateOrder,
  updateOrderFail,
  updateOrderRequest,
  updateOrderSuccess,
} = actions;

export default reducer;
