import React, { useState } from "react";
import { Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./itemDetails.css";
import { useAppContext } from "../context/AppContext";

function ItemDetails({ meal, onBack, decrementItem, incrementItem }) {
  const { state, dispatch } = useAppContext();

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
        <div className="meal-image" style={{ textAlign: "center" }}>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
        <div className="meal-info">
          <Typography variant="h5" sx={{ textAlign: "left" }}>
            {meal.strMeal}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {meal.strInstructions}
          </Typography>
          <br/>
          <Typography variant="body1"  gutterBottom sx={{ textAlign: "left",fontWeight:900}}>
            Price: ₹{150}
          </Typography>
          <div className="quantity-controls">
            <IconButton onClick={() => decrementItem(meal)}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1">
              {state.cart.find((item) => item.idMeal === meal.idMeal)
                ?.quantity || 0}
            </Typography>
            <IconButton onClick={() => incrementItem(meal)}>
              <AddIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  );
}

export default ItemDetails;
