import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReservations, setSelectedReservations] = useState([]);

  const prevReservationsLength = useRef(0);
  const bellAudio = useRef(null);

  useEffect(() => {
    fetchReservations();

    const interval = setInterval(() => {
      fetchReservations();
    }, 2000); // 🔄 Refresh every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('https://api.chelanyrestaurant-berlin.de/api/reservations');
      const newReservations = response.data;

      if (prevReservationsLength.current < newReservations.length) {
        ringBell();
      }

      prevReservationsLength.current = newReservations.length;
      setReservations(newReservations);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setLoading(false);
    }
  };

  const ringBell = () => {
    if (bellAudio.current) {
      bellAudio.current.play();
      setTimeout(() => {
        bellAudio.current.play();
      }, 1500);
    }
  };

  const deleteSelectedReservations = async () => {
    if (selectedReservations.length === 0) {
      alert('Please select reservations to delete.');
      return;
    }
    if (!window.confirm('Are you sure you want to delete all selected reservations?')) return;

    try {
      await Promise.all(
        selectedReservations.map(id =>
          axios.delete(`https://api.chelanyrestaurant-berlin.de/api/reservations/${id}`)
        )
      );
      setReservations(prev => prev.filter(r => !selectedReservations.includes(r.id)));
      setSelectedReservations([]);
    } catch (err) {
      alert('Failed to delete some reservations.');
    }
  };

  const toggleSelectReservation = (id) => {
    setSelectedReservations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedReservations.length === reservations.length) {
      setSelectedReservations([]);
    } else {
      setSelectedReservations(reservations.map(r => r.id));
    }
  };

  if (loading) return <p style={centerText}>Loading reservations...</p>;
  if (reservations.length === 0) return <p style={centerText}>No reservations found.</p>;

  return (
    <div style={container}>
      {/* 🔔 Hidden bell sound */}
      <audio ref={bellAudio} src="/bell.mp3" preload="auto" />

      <h2 style={title}>Reservations List</h2>

      <button
        onClick={deleteSelectedReservations}
        disabled={selectedReservations.length === 0}
        style={{
          marginBottom: '15px',
          backgroundColor: 'red',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: selectedReservations.length === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        Delete Selected
      </button>

      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr style={headerRow}>
              <th style={th}>
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={selectedReservations.length === reservations.length && reservations.length > 0}
                />
              </th>
              <th style={th}>Name</th>
              <th style={th}>Email</th>
              <th style={th}>Phone</th>
              <th style={th}>Date & Time</th>
              <th style={th}>Guests</th>
              <th style={th}>Message</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r.id} style={row}>
                <td style={td}>
                  <input
                    type="checkbox"
                    checked={selectedReservations.includes(r.id)}
                    onChange={() => toggleSelectReservation(r.id)}
                  />
                </td>
                <td style={td}>{r.name}</td>
                <td style={td}>{r.email}</td>
                <td style={td}>{r.phone}</td>
                <td style={td}>{formatDateTime(r.date, r.time)}</td>
                <td style={td}>{r.guests}</td>
                <td style={td}>{r.message || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🔧 Helper function to format date/time
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return '-';
  const combined = `${dateStr}T${timeStr}`;
  const dt = new Date(combined);
  if (isNaN(dt)) return `${dateStr} ${timeStr}`;
  return dt.toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ✅ Styles used above (neeche define hone chahiye)

const container = {
  maxWidth: '1100px',
  margin: '40px auto',
  padding: '0 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
};

const title = {
  textAlign: 'center',
  marginBottom: '25px',
  fontWeight: '700',
  fontSize: '28px',
  color: '#2c3e50',
};

const centerText = {
  textAlign: 'center',
  marginTop: '40px',
  fontSize: '18px',
  color: '#666',
};

const tableWrapper = {
  overflowX: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const table = {
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0 10px',
};

const headerRow = {
  backgroundColor: '#ff7f7f',
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontSize: '14px',
};

const th = {
  padding: '15px 20px',
  textAlign: 'left',
  fontWeight: '600',
};

const row = {
  backgroundColor: '#f9f9f9',
  transition: 'background-color 0.3s ease',
  cursor: 'default',
  borderRadius: '8px',
};

const td = {
  padding: '15px 20px',
  fontSize: '15px',
  verticalAlign: 'middle',
};

export default Reservations;
