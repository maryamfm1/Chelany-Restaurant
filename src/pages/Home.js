import React from "react";
import HeroSection from "../components/HeroSection.js";
import AboutSection from "../components/AboutSection.js";
import "./Home.css";  // wrapper ke styles ke liye
import Footer from "../components/Footer.js";
 
 

const Home = () => {
  return (
    <div className="hero-about-wrapper">
      <HeroSection />
      <AboutSection />
      <Footer />
    
    </div>
  );
};

export default Home;
