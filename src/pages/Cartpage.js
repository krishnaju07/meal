import React, { useState } from "react";
import CartItem from "./CartItem";
import { Button, Typography, Grid, Divider } from "@mui/material";
import "./Cartpage.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CartPage = () => {
  const { state, dispatch } = useAppContext();
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
        dispatch({ type: "PLACE_ORDER", payload: state.cart });
        navigate("/OrdersListingPage");
      }, 2000);
    }, 1000);
  };

//   const handleRemoveItem = (mealId) => {
//     dispatch({
//         type: "REMOVE_FROM_CART",
//         payload: mealId, 
//       });
      
//   };

  const totalPrice = state.cart.reduce(
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
                //   onRemoveItem={handleRemoveItem}
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
                    <Typography variant="body1">
                      {item.strMeal} {}
                    </Typography>
                  </div>
                  <Typography variant="body1">
                    {`${item.price} * ${item.quantity} = ₹${
                      item.quantity * item.price
                    }`}
                  </Typography>
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
