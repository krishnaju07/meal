import React from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'; 

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(item.idMeal, newQuantity);
  };

  const handleRemove = () => {
    onRemoveItem(item.idMeal);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <img src={item.strMealThumb} alt={item.strMealThumb} style={{ width: '50px', marginRight: '10px' }} />
      <div style={{ flexGrow: 1 }}>
        <Typography variant="h6">{item.strMeal}</Typography>
        <Typography variant="subtitle1">Price: ${88}</Typography>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={() => handleQuantityChange(item.quantity - 1)}>
          <RemoveIcon />
        </IconButton>
        <Typography>{item.quantity}</Typography>
        <IconButton onClick={() => handleQuantityChange(item.quantity + 1)}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={handleRemove}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
