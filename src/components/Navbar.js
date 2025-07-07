import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [navCollapsed, setNavCollapsed] = useState(true);
  const searchInputRef = useRef(null);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const navbarCollapse = document.getElementById('navbarSupportedContent');
    if (!navbarCollapse) return;

    const handleHide = () => setNavCollapsed(true);
    const handleShow = () => setNavCollapsed(false);

    navbarCollapse.addEventListener('hide.bs.collapse', handleHide);
    navbarCollapse.addEventListener('show.bs.collapse', handleShow);

    return () => {
      navbarCollapse.removeEventListener('hide.bs.collapse', handleHide);
      navbarCollapse.removeEventListener('show.bs.collapse', handleShow);
    };
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // About click handler (updated for smooth scroll on home)
  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToId('about');
    } else {
      navigate('/', { state: { scrollToAbout: true } });
    }
  };

  // Contact click handler (aap ka pehle jaisa hi)
  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToId('footer-contact');
    } else {
      navigate('/', { state: { scrollToContact: true } });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-4">
      <div className="container-fluid position-relative">

        {/* Logo Center */}
        <div className="navbar-logo-center">
          <a className="navbar-brand" href="/">
            <img src="/images/logo.jpg" alt="Logo" height="50" />
          </a>
        </div>

        {/* Mobile Toggler */}
        <button
          className={`navbar-toggler ${navCollapsed ? 'collapsed' : ''}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={!navCollapsed}
          aria-label="Toggle navigation"
          onClick={() => {
            setSearchOpen(false);
            setNavCollapsed(!navCollapsed);
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Left Side Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link fw-bold">{t('navbar.home')}</Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link fw-bold">{t('navbar.menu')}</Link>
            </li>
            <li className="nav-item">
              <a href="/" onClick={handleAboutClick} className="nav-link fw-bold">
                {t('navbar.about')}
              </a>
            </li>
            <li className="nav-item">
              <a href="/" onClick={handleContactClick} className="nav-link fw-bold">
                {t('navbar.contact')}
              </a>
            </li>
            <li className="nav-item">
              <Link to="/order-online" className="nav-link fw-bold">{t('navbar.order')}</Link>
            </li>
          </ul>

          {/* Right Side: Gallery + Search + Language */}
          <ul className="navbar-nav ms-auto align-items-lg-center flex-row gap-3">
            {/* Gallery */}
            <li className="nav-item">
              <Link to="/gallery" className="nav-link fw-bold">{t('navbar.Gallery') || 'Gallery'}</Link>
            </li>

            {/* Search */}
            <li className="nav-item position-relative d-flex align-items-center">
              <button
                className="btn btn-link nav-link p-0 search-toggle"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Toggle search"
              >
                <i className="bi bi-search search-icon text-danger"></i>
              </button>
              {searchOpen && (
                <form className="search-form d-inline-block ms-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    ref={searchInputRef}
                    type="search"
                    className="form-control search-input border border-danger rounded-3"
                    placeholder={t("navbar.Search") || "Search..."}
                    autoComplete="off"
                  />
                </form>
              )}
            </li>

            {/* Language Switcher */}
            <li className="nav-item d-flex align-items-center">
              <Dropdown>
                <Dropdown.Toggle variant="light" className="language-switcher-dropdown border border-danger text-danger rounded-3">
                  🌐 {i18n.language.toUpperCase()}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => i18n.changeLanguage('en')}>🇬🇧 English</Dropdown.Item>
                  <Dropdown.Item onClick={() => i18n.changeLanguage('de')}>🇩🇪 Deutsch</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
