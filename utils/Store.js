import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [], shippingAddress: {}, paymentMethod: '' },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_REMOVE_ITEM': {
      const cartRemove = action.payload;
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== cartRemove.slug
      );
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_RESET': {
      Cookies.remove('cart');
      return { ...state, cart: { cartItems: [] } };
    }

    case 'CART_CLEAR_ITEMS': {
      Cookies.set(
        'cart',
        JSON.stringify({
          ...state.cart,
          cartItems: [],
        })
      );
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      const shippingAddress = {
        ...state.cart.shippingAddress,
        ...action.payload,
      };
      Cookies.set('cart', JSON.stringify({ ...state.cart, shippingAddress }));
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress,
        },
      };
    }

    case 'SAVE_PAYMENT_METHOD': {
      const paymentMethod = action.payload;
      Cookies.set('cart', JSON.stringify({ ...state.cart, paymentMethod }));
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod,
        },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
