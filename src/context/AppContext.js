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
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
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

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);