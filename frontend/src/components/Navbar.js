// NavBar.js
import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  if (isMobile) {
    return (
      <div className="mobile-navbar">
        <button className="mobile-navbar-button" onClick={handleButtonClick}>
          Navigation
        </button>
        {isMenuOpen && (
          <ul className="mobile-navbar-links">
            <li><a href="/" onClick={handleMenuClose}>Home</a></li>
            <li><a href="/about" onClick={handleMenuClose}>About</a></li>
            <li><a href="/projects" onClick={handleMenuClose}>Projects</a></li>
            <li><a href="/contact" onClick={handleMenuClose}>Contact</a></li>
          </ul>
        )}
      </div>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Hanfei Qu</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/projects">Projects</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
