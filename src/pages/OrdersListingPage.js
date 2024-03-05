import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';

const OrdersListingPage = () => {
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
      {orders.map((order, index) => (
        <Box key={order.id} border={1} borderRadius={10} p={2} mb={2} boxShadow={3}>
          <List>
            <React.Fragment key={order.id}>
              <ListItem>
                <ListItemText primary={`Order ID: ${order.id}`} />
              </ListItem>
              <Divider />
              {order.items.map((item, itemIndex) => (
                <ListItem key={item.id}>
                  <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
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
