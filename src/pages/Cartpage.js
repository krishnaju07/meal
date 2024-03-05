import React, { useState } from "react";
import CartItem from "./CartItem";
import { Button, Typography, Grid, Divider } from "@mui/material";
import "./Cartpage.css"; 
import {  useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CartPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 10, quantity: 1, image: "image1.jpg" },
    { id: 2, name: "Item 2", price: 20, quantity: 2, image: "image2.jpg" },
  ]);
  const { state,dispatch } = useAppContext();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch({
      type: "UPDATE_CART_ITEM_QUANTITY",
      payload: { itemId, newQuantity },
    });
  };

  const handlePlaceOrder = () => {
    setTimeout(() => {
      setShowSuccessMessage(true);

      setTimeout(() => {
        navigate('/OrdersListingPage')
      }, 2000); 
    }, 2000); 
  };

  const handleRemoveItem = (itemId) => {
    // Dispatch an action to remove the item from the cart
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: itemId,
    });
    
    // Update the local state of items if needed
    setItems(items.filter((item) => item.id !== itemId));
  };

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Grid container spacing={2}>
      {showSuccessMessage ? (
        <div className="order-success-animation">
          <Typography variant="body1">Order placed successfully!</Typography>
        </div>
      ) : (
        <>
          <Grid item xs={12} lg={8}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {state.cart.map((item) => (
                <CartItem
                  key={item.idMeal}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          </Grid>
          <Grid item xs={12} lg={4}>
            <div
              style={{
                borderLeft: "1px solid #ccc",
                borderRight: "1px solid #ccc",
                borderTop: "1px solid #ccc",
                borderBottom: "1px solid #ccc",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              <Typography variant="h6">Summary</Typography>
              <Divider />
              {state.cart.map((item) => (
                <div
                  key={item.idMeal}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1">{item.strMeal} {}</Typography>
                  </div>
                  <Typography variant="body1">₹{88}</Typography>
                </div>
              ))}
              <Divider />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "8px",
                }}
              >
                <Typography variant="body1">Total:</Typography>
                <Typography variant="body1">₹{totalPrice}</Typography>
              </div>
              <div style={{ textAlign: "right", marginTop: "16px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </div>{" "}
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default CartPage;
