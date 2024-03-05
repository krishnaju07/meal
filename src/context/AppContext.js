import React, { createContext, useReducer, useContext } from 'react';

const AppContext = createContext();

const initialState = {
  categories: [],
  cart: [],
  orders: []
};


const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      };
      case "UPDATE_CART_ITEM_QUANTITY":
        const { itemId, newQuantity } = action.payload;
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
          ),
        };
    case 'PLACE_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        cart: []
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('Initial State:', state);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
