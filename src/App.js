import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.js";

import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Reservation from "./pages/Reservation.js";
import OrderOnline from "./pages/Order.js";
import Menu from "./pages/Menu.js";

import { CartProvider } from "./CartContext.js";  // <-- CartProvider import karo

function App() {
  return (
    <CartProvider>  {/* Wrap poore app ko CartProvider se */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/order-online" element={<OrderOnline />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
