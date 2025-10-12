import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <nav className="footer-links">
            <a href="#">By-laws</a>
            <a href="#">Meeting Minutes</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <strong>&copy; 2025 Vishal Sanjivini Homeowners Association</strong>
          </div>
          <div className="credits">
            All rights reserved. Vishal Sanjivini Homeowners Association (VSHOA)
          </div>
          <p>
            This website is developed and maintained by the Vishal Sanjivini Homeowners Association.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
