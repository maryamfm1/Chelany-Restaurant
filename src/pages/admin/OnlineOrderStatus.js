import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OnlineOrderStatus() {
  const [status, setStatus] = useState('available');

  useEffect(() => {
    axios.get(' https://api.chelanyrestaurant-berlin.de/api/settings/online-order')
      .then(res => setStatus(res.data.status))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    axios.post(' https://api.chelanyrestaurant-berlin.de/api/settings/online-order', { value: newStatus })  // 👈 full URL
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h3>Online Order Service Status</h3>
      <select value={status} onChange={handleChange}>
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>
    </div>
  );
}

export default OnlineOrderStatus;
