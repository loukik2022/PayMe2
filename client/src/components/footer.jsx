import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <p>&copy; {new Date().getFullYear()} PayMe. Made by Loukik.</p>
      </div>
    </footer>
  );
};

export default Footer;
