import React, { useState } from 'react';
import { Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './itemDetails.css';

function ItemDetails({ meal, onBack }) {
  const [quantity, setQuantity] = useState(1);


  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!meal) {
    return null;
  }

  return (
    <>
      <div className="back-button">
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <div className="meal-details-container">
        <div className="meal-image" style={{ textAlign: 'center' }}>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <div className="meal-info">
          <Typography variant="h5" sx={{ textAlign: 'left' }}>{meal.strMeal}</Typography>
          <Typography variant="body1" gutterBottom>{meal.strInstructions}</Typography>
          <Typography variant="body1" gutterBottom sx={{ textAlign: 'left' }}>Price: ₹{quantity * 150}</Typography>
          <div className="quantity-controls">
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">{meal.quantity || 0}</Typography>
            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetails;
