import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { useAppContext } from '../context/AppContext';

const OrdersListingPage = () => {
    const { state, dispatch } = useAppContext();
  const [orders, setOrders] = useState([
    {
      id: 1,
      items: [
        { id: 1, name: 'Product 1', quantity: 2 },
        { id: 2, name: 'Product 2', quantity: 1 }
      ]
    },
    {
      id: 2,
      items: [
        { id: 3, name: 'Product 3', quantity: 3 },
        { id: 4, name: 'Product 4', quantity: 2 }
      ]
    }
  ]);

  return (
    <div>
      <Typography variant="h6" gutterBottom style={{ marginBottom: '20px' }}>Orders</Typography>
      {state.orders.map((order, index) => (
        <Box key={order.idMeal} border={1} borderRadius={10} p={2} mb={2} boxShadow={3}>
          <List>
            <React.Fragment key={order.idMeal}>
              <ListItem>
                <ListItemText primary={`Order ID: ${order.idMeal}`} />
              </ListItem>
              <Divider />
              {state.orders.map((item, itemIndex) => (
                <ListItem key={item.idMeal}>
                  <ListItemText primary={item.strMeal} secondary={`Quantity: ${item.quantity}`} />
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
