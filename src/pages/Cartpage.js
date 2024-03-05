import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import CartItem from './CartItem';

const CartPage = ({ cartItems }) => {
  const [cart, setCart] = useState(cartItems);

  const handleQuantityChange = (itemId, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const handlePlaceOrder = () => {
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Typography variant="h6">Cart Items</Typography>
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
          />
        ))}
      </div>
      <div style={{ flex: 1 }}>
        <Typography variant="h6">Summary</Typography>
        <Typography variant="body1">Total Price: ${totalPrice.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={handlePlaceOrder}>Place Order</Button>
      </div>
    </div>
  );
};

export default CartPage;
