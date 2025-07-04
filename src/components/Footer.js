import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  // Added id="contact" for scroll target
  return (
    <footer id="contact" className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">

        <div id="footer-contact" className="row border-bottom border-secondary pb-4 mb-4">
          <div className="col-md-4 mb-3 d-flex align-items-center gap-2">
            <Phone size={20} />
            <span className="fs-6">{t("contact.phone")}</span>
          </div>

          <div className="col-md-4 mb-3 d-flex align-items-center gap-2">
            <Mail size={20} />
            <span className="fs-6">{t("contact.email")}</span>
          </div>

          <div className="col-md-4 mb-3 d-flex align-items-center gap-2">
            <MapPin size={20} />
            <a
              href="https://www.google.com/maps/place/Torstraße+221,+10115+Berlin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-decoration-none fs-6"
            >
              {t("contact.address")}
            </a>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 rounded overflow-hidden shadow-sm">
            <iframe
              title="Chelany Mitte Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.473129878188!2d13.3996059!3d52.5312524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e25a32dc3f%3A0x305c624676f438a4!2sChelany!5e0!3m2!1sen!2sde!4v1719922356693!5m2!1sen!2sde"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="row align-items-center border-top border-secondary pt-4">
          <div className="col-md-6 mb-3 d-flex align-items-center gap-3">
            <span className="fw-bold text-uppercase small">{t("followUs")}</span>
            <a
              href="https://www.instagram.com/chelany_restaurant/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-4"
              aria-label="Instagram"
            >
              <i className="bi bi-instagram"></i>
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100063776670459#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white fs-4"
              aria-label="Facebook"
            >
              <i className="bi bi-facebook"></i>
            </a>
          </div>

          <div className="col-md-6 text-md-end text-sm-start mt-3 mt-md-0 small text-light-emphasis">
            <em>{t("openingHours")}</em><br />
            <em className="fst-italic" style={{ fontSize: '0.85rem' }}>
              {t("hygieneNotice")}
            </em>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
