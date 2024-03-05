import React, { useState } from "react";
import CartItem from "./CartItem";
import { Button, Typography, Grid, Divider } from "@mui/material";
import "./Cartpage.css"; // Import CSS file for animation

const CartPage = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 10, quantity: 1, image: "image1.jpg" },
    { id: 2, name: "Item 2", price: 20, quantity: 2, image: "image2.jpg" },
    // Add more items as needed
  ]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handlePlaceOrder = () => {
    setTimeout(() => {
      // Show the success message
      setShowSuccessMessage(true);

      // Navigate to the success page after some delay
      setTimeout(() => {
        // history.push("/order-success");
      }, 2000); // Change the delay as needed
    }, 2000); // Change the timeout duration as needed
  };

  const handleRemoveItem = (itemId) => {
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
              {items.map((item) => (
                <CartItem
                  key={item.id}
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
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="body1">{item.name}</Typography>
                  </div>
                  <Typography variant="body1">₹{item.price}</Typography>
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
