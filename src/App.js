import './i18n.js'; // ✅ language init at top
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // ✅ PayPal SDK
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import Gallery from "./pages/Gallery.js";
import Reservation from "./pages/Reservation.js";
import OrderOnline from "./pages/Order.js";
import Menu from "./pages/Menu.js";
import { CartProvider } from "./CartContext.js";
import FloatingReservation from "./components/FloatingReservation.js";
import AdminLogin from './pages/admin/AdminLogin.js';
import  AdminDashboard from './pages/admin/AdminDashboard.js';
import ProtectedRoute from "./components/ProtectedRoute.js";  
import PrivacyPolicy from './components/PrivacyPolicy.js';



 

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
        <Route path="/login" element={<AdminLogin/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* Dashboard route ko ProtectedRoute mein wrap karo */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
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
        <PayPalScriptProvider options={{ "client-id": "AX7spZgthFeyQhErpRyL-axSAe18D0sVRVR3qhVRE1h9omZXjqdvKjUgeIG8UW36h-T_mbZhzSWx7W2Z" }}>
          <AppContent />
        </PayPalScriptProvider>
      </Router>
    </CartProvider>
  );
}

export default App;
  