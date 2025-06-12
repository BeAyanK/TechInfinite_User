import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  loading: false,
  error: null,
};

const calculateTotals = (cartItems) => {
  let totalAmount = 0;
  let totalQuantity = 0;
  cartItems.forEach((item) => {
    totalAmount += item.price * item.quantity;
    totalQuantity += item.quantity;
  });
  return { totalAmount, totalQuantity };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      const totals = calculateTotals(state.cartItems);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    },
    removeFromCart(state, action) {
      const id = action.payload;

      state.cartItems = state.cartItems.filter((i) => i.id !== id);
      const totals = calculateTotals(state.cartItems);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
    },
    increaseQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
        const totals = calculateTotals(state.cartItems);
        state.totalAmount = totals.totalAmount;
        state.totalQuantity = totals.totalQuantity;
      }
    },
    decreaseQty(state, action) {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        const totals = calculateTotals(state.cartItems);
        state.totalAmount = totals.totalAmount;
        state.totalQuantity = totals.totalQuantity;
      }
    },
    loadCart(state, action) {
      const data = action.payload || {};
      state.cartItems = Array.isArray(data.cartItems) ? data.cartItems : [];
      // Recalculate totals on load just to be safe
      const totals = calculateTotals(state.cartItems);
      state.totalAmount = totals.totalAmount;
      state.totalQuantity = totals.totalQuantity;
      state.isCartOpen = data.isCartOpen || false;
      state.loading = false;
      state.error = null;
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.isCartOpen = false;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  toggleCart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  loadCart,
  setLoading,
  setError,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
