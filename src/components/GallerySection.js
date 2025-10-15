import React from 'react';
import './GallerySection.css';  // ye file banao aur isi folder mein rakho
import { useTranslation } from 'react-i18next';
const GallerySection = () => {
     const { t } = useTranslation();
  const images = [
    { src: '/images/outside.jpg', alt: 'Restaurant Interior', shadowColor: 'rgba(209, 73, 91, 0.4)' },
    { src: '/images/baaar.jpg', alt: 'Chef at Work', shadowColor: 'rgba(168, 50, 62, 0.4)' },
    { src: '/images/drinks.jpg', alt: 'Team Collaboration', shadowColor: 'rgba(168, 50, 62, 0.3)' },
    { src: '/images/interior.jpg', alt: 'Bar Area', shadowColor: 'rgba(200, 70, 80, 0.3)' },
    { src: '/images/menn.jpeg', alt: 'Gallery 1', shadowColor: 'rgba(120, 120, 120, 0.2)' },
    { src: '/images/GOLLAB.jpeg', alt: 'Gallery 2', shadowColor: 'rgba(120, 120, 120, 0.2)' },
    { src: '/images/drink.jpg', alt: 'Gallery 3', shadowColor: 'rgba(120, 120, 120, 0.2)' },
    { src: '/images/baar.jpg', alt: 'Gallery 4', shadowColor: 'rgba(120, 120, 120, 0.2)' },
  ];

  return (
    <section id="gallery" className="container gallery-section mb-5">
      <h2 className="text-center mb-4" style={{ fontWeight: '900', fontSize: '2.5rem', color: '#7f4a45' }}>
      {t("navbar.Gallery")}
      </h2>
      <div className="gallery-grid">
        {images.map(({ src, alt, shadowColor }, i) => (
          <div
            key={i}
            className="gallery-item"
            style={{
              boxShadow: `10px 10px 30px ${shadowColor}, -5px -5px 15px rgba(255,255,255,0.7)`,
            }}
          >
            <img src={src} alt={alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
