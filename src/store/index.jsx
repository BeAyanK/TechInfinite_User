import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import cartReducer from './cartSlice'
import addressReducer from './addressSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer,
    address:addressReducer,
  },
});

export default store;
