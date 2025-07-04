import React from "react";
import "./AboutSection.css";
import { useTranslation } from 'react-i18next';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2 className="about-title">{t("welcomeMessage")}</h2>
        <div className="separator"></div>
        <p className="about-description">{t("welcomeDescription")}</p>
      </div>
    </section>
  );
};

export default AboutSection;
