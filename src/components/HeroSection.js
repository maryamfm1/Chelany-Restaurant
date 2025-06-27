import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-container position-relative d-flex align-items-center justify-content-center text-center">
      <img
        src="/images/cb.jpg"
        alt="Background"
        className="hero-bg-img"
      />
      <div className="hero-overlay"></div>
      <div className="hero-text text-white position-absolute">
        <h1 className="hero-title" style={{ fontSize: "4rem" }} > Chaleny Restaurant</h1>
        
      </div>
    </div>
  );
};

export default HeroSection;
