import React from "react";
import "./AboutSection.css";  // external CSS file use karenge styling ke liye

const AboutSection = ({
  title = "WELCOME TO CHELANY RESTAURANT & BAR",
  description = 'where you experience the true taste of delicious food combined with exceptional hospitality. Our specialties include a perfect blend of traditional Berlin flavors and international dishes, crafted to satisfy every palate. Come and enjoy a place where great food meets warm moments and lasting memories.',
}) => {
  return (
    <section className="about-section">
      <div className="about-container">
        <h2 className="about-title">{title}</h2>
        <div className="separator"></div>
        <p className="about-description">{description}</p>
      </div>
    </section>
  );
};

export default AboutSection;
