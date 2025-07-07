import './i18n.js'; // ✅ language init at top
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import Gallery from "./pages/Gallery.js";
import Reservation from "./pages/Reservation.js";
import OrderOnline from "./pages/Order.js";
import Menu from "./pages/Menu.js";
import { CartProvider } from "./CartContext.js";
import FloatingReservation from "./components/FloatingReservation.js";
import AdminDashboard from './pages/admin/AdminDashboard.js';
import AdminLogin from './pages/admin/AdminLogin.js';
import AdminRegister from './pages/admin/AdminRegister.js';

// ✅ Wrapper component to use `useLocation`
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/order-online" element={<OrderOnline />} />
        <Route path="/menu" element={<Menu />} />

        {/* ✅ Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>

      {/* ✅ Only show on customer-side routes */}
      {!isAdminRoute && <FloatingReservation />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
