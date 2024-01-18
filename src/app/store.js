import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productSlice";
import authReducer from "../features/auth/authSlice";
import createReducer from "../features/cart/cartSlice";
import orderReducer from "../features/order/orderSlice"
import userReducer from "../features/user/userSlice"
import wishlistReducer from "../features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    cart: createReducer,
    order:orderReducer,
    user: userReducer,
    wishlist: wishlistReducer, 
  },
});
