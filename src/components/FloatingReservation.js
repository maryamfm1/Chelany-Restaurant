import React from "react";
import "./FloatingReservationButton.css";
import { FaCalendarAlt, FaInstagram, FaFacebookF } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function FloatingReservation() {
  const navigate = useNavigate();

  const goToReservation = () => {
    navigate("/reservation");
  };

  return (
    <div className="floating-reservation-container">
      {/* Reservation Icon */}
      <button
        className="icon-button reservation-icon"
        title="Reserve table"
        onClick={goToReservation}
      >
        <FaCalendarAlt />
      </button>

      {/* Instagram Icon */}
      <a
        href="https://www.instagram.com/chelany_restaurant/"
        className="icon-button"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
      >
        <FaInstagram />
      </a>

      {/* Facebook Icon */}
      <a
        href="https://www.facebook.com/people/Chelany-2/100063776670459/"
        className="icon-button"
        target="_blank"
        rel="noopener noreferrer"
        title="Facebook"
      >
        <FaFacebookF />
      </a>
    </div>
  );
}
