import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    items: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
      shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      :{}
  },
  reducers: {
    addCartItemRequest(state, action) {
      return {
        ...state,
        loading: true,
      };
    },
    addCartItemSuccess(state, action) {
      const item = action.payload;
      const isItemExist = state.items.find((i) => i.product === item.product);
      if (isItemExist) {
        state = {
          ...state,
          loading: false,
        };
      } else {
        state = {
          items: [...state.items, item],
          loading: false,
        };
        localStorage.setItem("cartItem", JSON.stringify(state.items));
      }

      return state;
    },
    increaseCartItem(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
        
          item.quantity = item.quantity + 1;
        }
        return item;
      });
      localStorage.setItem("cartItem", JSON.stringify(state.items));
    },
    decreaseCartItem(state, action) {
      state.items = state.items.map((item) => {
        if (item.product === action.payload) {
          
          item.quantity = item.quantity - 1;
        }
        return item;
      });
      localStorage.setItem("cartItem", JSON.stringify(state.items));
    },
    removeItemFormCart(state, action) {
      const filtered = state.items.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItem", JSON.stringify(filtered));

      return {
        ...state,
        items: filtered,
      };
    },
    saveShippingInfo(state,action){
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
        
        return{
                ...state,
                shippingInfo:action.payload
        }
    },
    orderCompleted(state, action) {
      localStorage.removeItem('cartItem');
      sessionStorage.removeItem('orderInfo');
      return {
        ...state,
          items: [],
          loading: false,
        
      }
  }
  },
});

const { reducer, actions } = cartSlice;

export const {
  addCartItemRequest,
  addCartItemSuccess,
  increaseCartItem,
  decreaseCartItem,
  removeItemFormCart,
  saveShippingInfo,
  orderCompleted
} = actions;

export default reducer;
