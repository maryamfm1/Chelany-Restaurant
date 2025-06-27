  import React, { useState } from "react";
  import { Link } from "react-router-dom";
  import "bootstrap/dist/css/bootstrap.min.css";

  function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    };

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white sticky-top shadow-sm">
        <div className="container d-flex align-items-center justify-content-between">

          {/* Left Links */}
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNavLeft">
            <ul className="navbar-nav me-auto mb-2 mb-md-0 d-flex flex-row gap-3">
              <li className="nav-item">
                <Link to="/" className="nav-link" style={{ fontWeight: "bold" }}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link"style={{ fontWeight: "bold" }}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/menu" className="nav-link"style={{ fontWeight: "bold" }}>
                  Menu
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo Center */}
          {!isOpen && (
            <Link to="/" className="navbar-brand mx-auto">
              <img src="/images/logo.jpg" alt="Logo" style={{ height: "45px" }} />
            </Link>
          )}

          {/* Right Links */}
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarNavRight">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0 d-flex flex-row gap-3">
              <li className="nav-item">
                <Link to="/reservation" className="nav-link"style={{ fontWeight: "bold" }}>
                  Reservation
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/order-online" className="nav-link"style={{ fontWeight: "bold" }}>
                  Order
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/gallery" className="nav-link"style={{ fontWeight: "bold" }}>
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          

          {/* Hamburger Toggle */}
          <button
            className="navbar-toggler"
            type="button" 
            onClick={toggleNavbar}
            aria-controls="navbarNavLeft navbarNavRight"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
    );
  }

  export default Navbar;
