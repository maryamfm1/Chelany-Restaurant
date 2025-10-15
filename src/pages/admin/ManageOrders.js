import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import QRCode from 'qrcode';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [lastSeenOrderIds, setLastSeenOrderIds] = useState([]);
  const [isBellActive, setIsBellActive] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);

  const audioRef = useRef(null);
  const playCountRef = useRef(0);
  const lastSeenOrderIdsRef = useRef([]);

  // Orders fetch karne ka function
  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://api.chelanyrestaurant-berlin.de/api/orders');
      const processedOrders = response.data.map(order => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items,
        total_price: Number(order.total_price)
      }));

      const currentOrderIds = processedOrders.map(o => o.order_id);

      // Bell logic
      if (!isBellActive) {
        const unseenOrderExists = currentOrderIds.some(id => !lastSeenOrderIdsRef.current.includes(id));
        if (unseenOrderExists) {
          setIsBellActive(true);
          if (audioRef.current) {
            playCountRef.current = 0;
            audioRef.current.loop = false;

            const playBell = () => {
              playCountRef.current++;
              audioRef.current.play().catch(err => console.error('Audio play error:', err));
            };

            audioRef.current.onended = null;

            audioRef.current.onended = () => {
              if (playCountRef.current < 2) {
                playBell();
              } else {
                setIsBellActive(false);
                audioRef.current.onended = null;
                setLastSeenOrderIds(currentOrderIds);
                lastSeenOrderIdsRef.current = currentOrderIds;
              }
            };

            playBell();
          }
        } else {
          setLastSeenOrderIds(currentOrderIds);
          lastSeenOrderIdsRef.current = currentOrderIds;
        }
      } else {
        lastSeenOrderIdsRef.current = currentOrderIds;
      }

      setOrders(processedOrders);
      setLoading(false);
    } catch (err) {
      setError('Error fetching orders');
      setLoading(false);
    }
  };

  // Multiple orders delete function
  const deleteSelectedOrders = async () => {
    if (selectedOrders.length === 0) {
      alert('Please select orders to delete.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete all selected orders?')) return;

    try {
      await Promise.all(
        selectedOrders.map(order_id =>
          axios.delete(`https://api.chelanyrestaurant-berlin.de/api/orders/${order_id}`)
        )
      );
      setOrders(prev => prev.filter(order => !selectedOrders.includes(order.order_id)));
      setSelectedOrders([]);
    } catch (err) {
      alert('Failed to delete some orders.');
    }
  };

  // Checkbox toggle functions
  const toggleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map(o => o.order_id));
    }
  };

  // Print order function (popup stays open until manually closed)
  const printOrder = async (order) => {
    try {
      const qrPayload = JSON.stringify({
        order_id: order.order_id,
        name: order.name,
        address: order.address,
        phone: order.phone,
        payment_method: order.payment_method,
        total_price: order.total_price,
        items: order.items,
      });

      const qrDataUrl = await QRCode.toDataURL(qrPayload);

      const printContent = `
        <html>
          <head>
            <title>Order Receipt</title>
            <style>
              @media print { @page { size: 80mm auto; margin:5mm; } body { width:80mm; } }
              body { font-family:Arial,sans-serif; padding:10px; line-height:1.3; font-size:12px; color:#333; }
              h2 { text-align:center; margin:5px 0 10px; font-size:16px; font-weight:700; }
              ul { padding-left:20px; margin:8px 0; list-style:none; }
              ul li { margin-bottom:3px; }
              .section { margin-bottom:6px; font-size:12px; }
              .logo { text-align:center; margin-bottom:10px; }
              .footer-text { font-size:10px; color:gray; margin-top:10px; text-align:center; font-style:italic; }
              .summary-line { display:flex; justify-content:space-between; font-weight:700; font-size:14px; margin-top:10px; border-top:1px solid #ddd; padding-top:5px; }
              .qr-code { text-align:center; margin-top:10px; }
              .qr-code img { width:120px; height:120px; }
            </style>
          </head>
          <body>
            <div class="logo"><img src="/logoo.jpg" width="120" /></div>
            <h2>Order Receipt</h2>
            <div class="section"><strong>Order ID:</strong> ${order.order_id}</div>
            <div class="section"><strong>Name:</strong> ${order.name}</div>
            <div class="section"><strong>Address:</strong> ${order.address}</div>
            <div class="section"><strong>Contact:</strong> ${order.phone}</div>
            <div class="section"><strong>Payment:</strong> ${order.payment_method}</div>
            <div class="section"><strong>Order Time:</strong> ${new Date(order.created_at).toLocaleString()}</div>
            <div class="section">
              <strong>Items:</strong>
              <ul>${order.items.map(item => `<li>${item.name} x ${item.quantity} - €${item.price.toFixed(2)}${item.instructions ? ` (${item.instructions})` : ''}</li>`).join('')}</ul>
            </div>
            <div class="summary-line"><span>Sales 7% excl. VAT 7%.</span><span>Total: €${order.total_price.toFixed(2)}</span></div>
            <div class="qr-code"><img src="${qrDataUrl}" /><p style="font-size:10px;margin-top:5px;">Scan to view order details</p></div>
            <hr />
            <div class="footer-text">Thank you for your order!</div>
            <script>
              window.onload = function() {
                window.print();
              };
            </script>
          </body>
        </html>
      `;

      const newWindow = window.open('', '_blank', 'width=600,height=600,scrollbars=yes');
      if (!newWindow) {
        alert("Popup blocker ne print window rok di.");
        return;
      }
      newWindow.document.write(printContent);
      newWindow.document.close();
      newWindow.focus();
      // Note: Ab window automatically close nahi hogi, user khud close karega.
    } catch (err) {
      console.error(err);
      alert("QR Code generate karne mein problem hui.");
    }
  };

  // Auto fetch orders every 5 seconds
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => {
      clearInterval(interval);
      if (audioRef.current) audioRef.current.onended = null;
    };
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '10px' }}>
      <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Manage Orders</h3>

      <button
        onClick={deleteSelectedOrders}
        disabled={selectedOrders.length === 0}
        style={{
          marginBottom: '15px',
          backgroundColor: selectedOrders.length === 0 ? '#ccc' : '#d9534f',
          color: 'white',
          padding: '8px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: selectedOrders.length === 0 ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s ease'
        }}
      >
        Delete Selected
      </button>

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '16px', marginTop: '30px' }}>No orders found.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-striped" style={{ width: '100%', fontSize: '14px', borderCollapse: 'collapse', minWidth: '900px' }}>
            <thead style={{ backgroundColor: '#343a40', color: 'white' }}>
              <tr>
                <th><input type="checkbox" onChange={toggleSelectAll} checked={selectedOrders.length === orders.length && orders.length > 0} /></th>
                <th>Order ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Order Time</th>
                <th>Contact</th>
                <th>Payment Method</th>
                <th>Items</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.order_id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ textAlign: 'center' }}>
                    <input type="checkbox" checked={selectedOrders.includes(order.order_id)} onChange={() => toggleSelectOrder(order.order_id)} />
                  </td>
                  <td>{order.order_id}</td>
                  <td>{order.name}</td>
                  <td>{order.address}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td>{order.phone}</td>
                  <td>{order.payment_method}</td>
                  <td>
                    <ul style={{ paddingLeft: '15px', margin: 0 }}>
                      {order.items.map((item, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>
                          {item.name} x {item.quantity} - €{item.price.toFixed(2)}
                          {item.instructions ? `: ${item.instructions}` : ''}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 'bold' }}>€{order.total_price.toFixed(2)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button onClick={() => printOrder(order)} style={{ padding:'6px 12px', backgroundColor:'#d9534f', border:'none', color:'white', borderRadius:'4px', cursor:'pointer' }}>Print</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Hidden audio for bell sound */}
      <audio ref={audioRef} src="/bell-sound.mp3" preload="auto" />
    </div>
  );
};

export default ManageOrders;
