import React from 'react';
import { Typography, Button } from '@mui/material';

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  const handleIncrement = () => {
    onQuantityChange(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onQuantityChange(item.id, item.quantity - 1);
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <Typography variant="subtitle1">{item.name}</Typography>
      <Typography variant="body1">Price: ${item.price}</Typography>
      <div>
        <Button variant="outlined" onClick={handleDecrement}>-</Button>
        <Typography variant="body1">{item.quantity}</Typography>
        <Button variant="outlined" onClick={handleIncrement}>+</Button>
        <Button variant="contained" color="error" onClick={() => onRemoveItem(item.id)}>Remove</Button>
      </div>
    </div>
  );
};

export default CartItem;
