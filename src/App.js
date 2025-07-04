import './i18n.js'; // ✅ language init at top
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Home from "./pages/Home.js";
import Gallery from "./pages/Gallery.js";  // ✅ Gallery fix
import Reservation from "./pages/Reservation.js";
import OrderOnline from "./pages/Order.js";
import Menu from "./pages/Menu.js";
import { CartProvider } from "./CartContext.js";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/order-online" element={<OrderOnline />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
