import React, { useState } from 'react';
import axios from 'axios';

function OrderStatus() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  const checkStatus = async () => {
    try {
      const res = await axios.get(`/api/order-status/${orderId}`);
      setOrder(res.data.order);
      setError('');
    } catch (err) {
      setError('Order not found');
      setOrder(null);
    }
  };

  const cancelOrder = async () => {
    try {
      const res = await axios.post('/api/cancel-order', { order_id: orderId });
      alert(res.data.message);
      setOrder(prev => ({ ...prev, status: 'cancelled' }));
    } catch (err) {
      alert('Cancel failed');
    }
  };

  return (
    <div>
      <h2>Check Your Order Status</h2>
      <input
        type="text"
        placeholder="Enter your Order ID"
        value={orderId}
        onChange={e => setOrderId(e.target.value)}
      />
      <button onClick={checkStatus}>Check Status</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {order && (
        <div>
          <h3>Order Status: {order.status}</h3>
          <p>Name: {order.name}</p>
          <p>Total Price: {order.total_price}€</p>

          {order.status === 'pending' && (
            <button onClick={cancelOrder}>Cancel Order</button>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
