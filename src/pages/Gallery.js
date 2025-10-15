import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <main className="body-offset cm-default" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Hero Section */}
      <section className="hero-section-one d-flex justify-content-center align-items-center py-5" style={{ backgroundColor: '#b22222', color: '#fff', minHeight: '220px' }}>
        <h1 style={{ fontWeight: '900', fontSize: '3rem', letterSpacing: '4px', textTransform: 'uppercase', textShadow: '2px 2px 5px rgba(0,0,0,0.3)' }}>
          {t('about_title') || 'Welcome to Chelany Mitte Restaurant'}
        </h1>
      </section>

      {/* About Intro Section with background & padding */}
      <section className="container mandala-bg-1 text-center pb-5 pt-4 pt-md-5 mb-4 mb-md-5">
        <p
          style={{
            fontSize: '1.3rem',
            fontStyle: 'italic',
            color: '#7f4a45',
            fontWeight: '500',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#fff8f0',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(209, 73, 91, 0.3)',
          }}
        >
          {/* About Chelany Mitte - updated authentic description */}
          At Chelany Mitte Restaurant Berlin, you will find authentic Pakistani flavors, where every dish is prepared in a traditional way, using fresh ingredients, right in the heart of Berlin
        </p>
      </section>

      {/* Image Gallery Section with 4 images in grid */}
      <section className="container vier-restaurants-main position-relative mb-5">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))',
            gap: '25px',
            justifyItems: 'center',
          }}
        >
          {[
            {
              src: '/images/resturant.webp',
              alt: 'Chelany Mitte Restaurant Interior',
              rotation: -3,
              shadowColor: 'rgba(209, 73, 91, 0.4)',
            },
            {
              src: '/images/bg.jpg',
              alt: 'Our Chef Cooking',
              rotation: 3,
              shadowColor: 'rgba(168, 50, 62, 0.4)',
            },
            {
              src: '/images/collab.png',
              alt: 'Team Collaboration',
              rotation: 1,
              shadowColor: 'rgba(168, 50, 62, 0.3)',
            },
            {
              src: '/images/baar.jpg',
              alt: 'Bar and Drinks Area',
              rotation: -1,
              shadowColor: 'rgba(200, 70, 80, 0.3)',
            },
          ].map(({ src, alt, rotation, shadowColor }, i) => (
            <img
              key={i}
              src={src}
              alt={alt}
              style={{
                width: '100%',
                maxWidth: '320px',
                borderRadius: '20px',
                boxShadow: `10px 10px 30px ${shadowColor}, -5px -5px 15px rgba(255,255,255,0.7)`,
                transform: `rotate(${rotation}deg)`,
                transition: 'transform 0.4s ease, box-shadow 0.4s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.1)';
                e.currentTarget.style.boxShadow = `15px 15px 40px ${shadowColor}, -5px -5px 20px rgba(255,255,255,0.9)`;
                e.currentTarget.style.zIndex = 10;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = `rotate(${rotation}deg) scale(1)`;
                e.currentTarget.style.boxShadow = `10px 10px 30px ${shadowColor}, -5px -5px 15px rgba(255,255,255,0.7)`;
                e.currentTarget.style.zIndex = 1;
              }}
            />
          ))}
        </div>
      </section>

      {/* Mission & Story Section with Dark Yellow Background */}
      <section className="bg-darkyellow overflow-hidden py-5 py-md-5 position-relative" style={{ backgroundColor: '#f5e3d3', color: '#5a2a27' }}>
        <div className="container">
          {/* Story */}
          <div className="mb-5">
            <h2 style={{ borderBottom: '4px solid #a8323e', paddingBottom: '8px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '2rem' }}>
              Our Story
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.75', maxWidth: '720px', marginTop: '1rem' }}>
            Chelany Mitte Berlin was started in 2020 to bring the authenticity of Pakistani cuisine to the people of Berlin. We aim to give our guests a memorable experience every time.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h2 style={{ borderBottom: '4px solid #a8323e', paddingBottom: '8px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '2rem' }}>
              Our Mission
            </h2>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.75', maxWidth: '720px', marginTop: '1rem' }}>
            Our mission is to preserve the authentic taste of Pakistani food and hospitality in Berlin, so that every guest feels at home.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="gruppen bg-darkyellow py-5" style={{ backgroundColor: '#b22222', color: '#fff' }}>
        <div className="container text-center">
          <h2 style={{ fontWeight: '900', fontSize: '2.5rem', marginBottom: '2rem', letterSpacing: '3px', textTransform: 'uppercase', textShadow: '1px 1px 4px rgba(0,0,0,0.3)' }}>
            Why Choose Chelany Mitte?
          </h2>
          <ul
            style={{
              listStyle: 'none',
              maxWidth: '720px',
              margin: '0 auto',
              paddingLeft: 0,
              fontSize: '1.3rem',
              fontWeight: '600',
              lineHeight: '2.2',
              textAlign: 'left',
              color: '#fff',
            }}
          >
            {[
              'Authentic Pakistani flavors using traditional recipes.',
              'Fresh, high-quality ingredients sourced locally and imported.',
              'Warm and cozy atmosphere in the heart of Berlin.',
              'Friendly staff committed to exceptional hospitality.',
            ].map((point, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: '1.2rem',
                  position: 'relative',
                  paddingLeft: '35px',
                  cursor: 'default',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f8c4c0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#fff')}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '8px',
                    width: '22px',
                    height: '22px',
                    backgroundColor: '#fdeee9',
                    borderRadius: '50%',
                    boxShadow: '0 0 12px #fdeee9',
                  }}
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
