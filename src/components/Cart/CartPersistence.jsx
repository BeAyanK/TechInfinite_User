import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { loadCart, setLoading, setError } from "../../store/cartSlice";

const CartPersistence = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userId = auth.email ? auth.email.replace(/[@.]/g, "_") : null;

  
  useEffect(() => {
    const loadInitialCart = async () => {
      dispatch(setLoading(true));

      if (auth.isLoggedIn && userId) {
        try {
          const res = await axios.get(
            `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/carts/${userId}.json`
          );
          const cartData = res.data || {};
          dispatch(loadCart(cartData));
        } catch (err) {
          console.error("Error loading cart from Firebase:", err.message);
          dispatch(setError(err.message));
        }
      } else {
        // Guest user fallback
        const localCart = localStorage.getItem("guest_cart");
        if (localCart) {
          dispatch(loadCart(JSON.parse(localCart)));
        }
      }

      dispatch(setLoading(false));
    };

    loadInitialCart();
  }, [auth.isLoggedIn, userId, dispatch]);

  // Save cart 
  useEffect(() => {
    if (!cart.cartItems || cart.cartItems.length === 0) return;

    const saveCart = async () => {
      try {
        if (auth.isLoggedIn && userId) {
          await axios.put(
            `https://adapthomeadmin-default-rtdb.asia-southeast1.firebasedatabase.app/carts/${userId}.json`,
            cart
          );
        } else {
          localStorage.setItem("guest_cart", JSON.stringify(cart));
        }
      } catch (error) {
        console.error("Error saving cart:", error.message);
      }
    };

    saveCart();
  }, [cart, auth.isLoggedIn, userId]);

  return null; 
};

export default CartPersistence;
