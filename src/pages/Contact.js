import React from 'react';

const Contact = () => {
  return (
    <div 
      style={{ 
        backgroundColor: '#fff8f0', 
        color: '#5a2a27', 
        fontFamily: "'Poppins', sans-serif", 
        minHeight: '100vh', 
        padding: '4rem 1rem' 
      }} 
      className="container"
    >
      <h1 
        className="text-center fw-bold mb-4"
        style={{
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
        Contact Us
      </h1>
      <p className="text-center mb-5" style={{ fontSize: '1.25rem', fontStyle: 'italic', color: '#7f4a45' }}>
        Have questions? Reach out to us anytime
      </p>

      <div className="row justify-content-center">
        <div className="col-md-6" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#5a2a27' }}>
          <p><strong>Address:</strong> 
            Brunnenstraße 58, 10119 Berlin, Germany
          </p>
          <p><strong>Phone:</strong> +49 30 2930 3343</p>
          <p><strong>Email:</strong> info@chelanyrestaurant-berlin.de</p>
          <p><strong>Opening Hours:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li>Monday - Sunday: 12:00 PM - 11:00 PM</li>
          </ul>

          <div className="mt-4 d-flex gap-4 justify-content-start" style={{ fontSize: '2rem' }}>
            <a
              href="https://www.facebook.com/ChelanyMitte"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{ color: '#3b5998', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d1495b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#3b5998')}
            >
              <i className="fab fa-facebook-square"></i>
            </a>
            <a
              href="https://www.instagram.com/chelany_mitte/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: '#e1306c', transition: 'color 0.3s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#d1495b')}
              onMouseLeave={e => (e.currentTarget.style.color = '#e1306c')}
            >
              <i className="fab fa-instagram-square"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
