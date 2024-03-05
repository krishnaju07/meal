import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

const OrdersListingPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/orders');
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <List>
        {orders.map((order, index) => (
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
        ))}
      </List>
    </div>
  );
};

export default OrdersListingPage;
