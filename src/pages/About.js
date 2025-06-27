import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#fff8f0', color: '#5a2a27', fontFamily: "'Poppins', sans-serif" }} className="aboutus-container py-5">
      <div className="container">
        <h1
          className="text-center mb-5"
          style={{
            fontWeight: '900',
            fontSize: '3rem',
            color: 'transparent',
            background: 'linear-gradient(90deg, #d1495b, #a8323e)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textShadow: '1px 1px 3px rgba(0,0,0,0.1)'
          }}
        >
          About Chelany Mitte Restaurant
        </h1>

        <div className="row align-items-center gy-4">
          {/* Left side images */}
          <div className="col-md-6 d-flex gap-4 justify-content-center">
            <img
              src="/images/resturant.webp"
              alt="Chelany Restaurant Interior"
              style={{
                width: '48%',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '15px 15px 30px rgba(209, 73, 91, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.7)',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.3s ease',
              }}
              className="img-fluid"
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotate(-2deg) scale(1)'}
            />

            <img
              src="/images/bg.jpg"
              alt="Chef Cooking"
              style={{
                width: '48%',
                height: 'auto',
                borderRadius: '15px',
                boxShadow: '15px 15px 30px rgba(168, 50, 62, 0.4), -10px -10px 20px rgba(255, 255, 255, 0.7)',
                transform: 'rotate(2deg)',
                transition: 'transform 0.3s ease',
              }}
              className="img-fluid"
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'rotate(2deg) scale(1)'}
            />
          </div>

          {/* Right side text content */}
          <div className="col-md-6">
            <p
              className="mb-4"
              style={{
                fontSize: '1.3rem',
                fontStyle: 'italic',
                color: '#7f4a45',
                fontWeight: '500',
                lineHeight: '1.7',
                borderLeft: '4px solid #d1495b',
                paddingLeft: '15px',
                marginBottom: '3rem'
              }}
            >
              At Chelany Mitte, we bring you authentic Pakistani flavors in the heart of Berlin. 
              Our passion is to deliver traditional recipes with fresh ingredients and a modern touch.
            </p>

            <h3
              style={{
                color: '#a8323e',
                fontWeight: '800',
                marginBottom: '1rem',
                borderBottom: '2px solid #a8323e',
                paddingBottom: '5px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}
            >
              Our Story
            </h3>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.75', color: '#5a2a27', fontWeight: '400' }}>
              Founded in 2020, Chelany Mitte was born out of a love for Pakistani cuisine and culture. 
              We believe in quality, warmth, and an unforgettable dining experience for every guest.
            </p>

            <h3
              style={{
                color: '#a8323e',
                fontWeight: '800',
                marginTop: '3rem',
                marginBottom: '1rem',
                borderBottom: '2px solid #a8323e',
                paddingBottom: '5px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}
            >
              Our Mission
            </h3>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.75', color: '#5a2a27', fontWeight: '400' }}>
              To bring the true taste of Pakistan to Berlin by offering handcrafted dishes, 
              exceptional hospitality, and a cozy atmosphere.
            </p>

            <h3
              style={{
                color: '#a8323e',
                fontWeight: '800',
                marginTop: '3rem',
                marginBottom: '1rem',
                borderBottom: '2px solid #a8323e',
                paddingBottom: '5px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}
            >
              Why Choose Us?
            </h3>
            <ul
              style={{
                fontSize: '1.15rem',
                color: '#5a2a27',
                paddingLeft: '25px',
                listStyleType: 'none',
                fontWeight: '500',
                lineHeight: '1.8',
              }}
            >
              <li style={{ position: 'relative', paddingLeft: '25px', marginBottom: '12px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#d1495b',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
                Fresh & Authentic Ingredients
              </li>
              <li style={{ position: 'relative', paddingLeft: '25px', marginBottom: '12px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#d1495b',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
                Experienced Chefs with Traditional Recipes
              </li>
              <li style={{ position: 'relative', paddingLeft: '25px', marginBottom: '12px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#d1495b',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
                Warm & Friendly Ambiance
              </li>
              <li style={{ position: 'relative', paddingLeft: '25px', marginBottom: '12px' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '4px',
                    width: '15px',
                    height: '15px',
                    backgroundColor: '#d1495b',
                    borderRadius: '50%',
                    display: 'inline-block',
                  }}
                />
                Great Location in Berlin Mitte
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
