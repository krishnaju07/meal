import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";

const OrdersListingPage = () => {
  const { state } = useAppContext();

  return (
    <div>
      <Typography variant="h6" gutterBottom style={{ marginBottom: "20px" }}>
        Orders
      </Typography>
      {state.orders.map((order, index) => (
        <Box
          key={index}
          border={1}
          borderRadius={10}
          p={2}
          mb={2}
          boxShadow={3}
        >
          <List>
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText primary={`Order ID: ${"000" + index + 1}`} />
              </ListItem>
              <Divider />
              {order.map((meal, mealIndex) => (
                <ListItem key={meal.idMeal}>
                  <ListItemText
                    primary={meal.strMeal}
                    secondary={`Quantity: ${meal.quantity}`}
                  />
                </ListItem>
              ))}
            </React.Fragment>
          </List>
        </Box>
      ))}
    </div>
  );
};

export default OrdersListingPage;
