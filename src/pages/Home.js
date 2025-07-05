import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../components/HeroSection.js";
import AboutSection from "../components/AboutSection.js";
import VideoGallerySection from "../components/VideoGallerySection.js";
import FourRestaurantsSection from "../components/FourRestaurantsSection.js";
import "./Home.css";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToAbout) {
      const aboutEl = document.getElementById('about');
      if (aboutEl) {
        aboutEl.scrollIntoView({ behavior: 'smooth' });
      }
      // State clear kar do taake bar bar scroll na ho
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="hero-about-wrapper">
      <HeroSection />
      <AboutSection />
      <VideoGallerySection />
      <FourRestaurantsSection />
    </div>
  );
};

export default Home;
