import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = ({
  phone = "+49 30 521 02 600",
  email = "info@chelanyrestaurant.de",
  address = "Mitte, Berlin, Germany",
  openingHours = "Monday – Sunday: 12:00 PM – 12:00 AM",
}) => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="top-row d-flex justify-content-between flex-wrap gap-3">
          <div className="contact-item d-flex align-items-center gap-2">
            <Phone size={16} />
            <span>{phone}</span>
          </div>
          <div className="contact-item d-flex align-items-center gap-2">
            <Mail size={16} />
            <span>{email}</span>
          </div>
          <div className="contact-item d-flex align-items-center gap-2">
            <MapPin size={16} />
            <span>{address}</span>
          </div>
        </div>

        <div className="bottom-row d-flex justify-content-between align-items-center mt-4 flex-wrap gap-3">
          <div className="newsletter d-flex align-items-center gap-2">
            <span className="fw-semibold text-uppercase small">
              Subscribe to Newsletter
            </span>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Email address"
            />
            <button className="btn btn-danger">→</button>
          </div>

          <div className="opening-hours small">
            Opening Hours: {openingHours}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
