import React, { useState } from 'react';
import { Form, Button, Card, Container } from 'react-bootstrap';
import axios from 'axios';                   // ✅ Axios import karo
import { useNavigate } from 'react-router-dom';  // ✅ Redirect ke liye

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');           // Error state for showing errors
  const navigate = useNavigate();                    // useNavigate hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');   // Reset error on new attempt

    try {
      // Backend API call karo (apna backend URL set karo agar alag ho)
      const response = await axios.post(' https://api.chelanyrestaurant-berlin.de/api/admin/login', {
        email,
        password,
      });

      // Login success - token localStorage mein save karo
      localStorage.setItem('authToken', response.data.token);

      // Dashboard pe redirect kar do
      navigate('/dashboard');
    } catch (err) {
      // Agar login fail ho to error message show karo
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow-lg">
        <h3 className="text-center mb-4">Admin Login</h3>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </Form.Group>

          {/* Error message show karo */}
          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <Button variant="danger" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminLogin;
