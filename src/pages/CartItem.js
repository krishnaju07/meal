import React from 'react';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon

const CartItem = ({ item, onQuantityChange, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(item.id, newQuantity);
  };

  const handleRemove = () => {
    onRemoveItem(item.id);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <img src={item.image} alt={item.name} style={{ width: '50px', marginRight: '10px' }} />
      <div style={{ flexGrow: 1 }}>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="subtitle1">Price: ${item.price}</Typography>
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
          <DeleteIcon /> {/* Use DeleteIcon instead of "Remove" text */}
        </IconButton>
      </div>
    </div>
  );
};

export default CartItem;
