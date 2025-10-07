import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-top">
          <nav className="footer-links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#">By-laws</a>
            <a href="#">Meeting Minutes</a>
            <a href="#">Notices</a>
            <a href="#">Terms of Use</a>
            <a href="#">Privacy Policy</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <strong>&copy; Vishal Sanjivini Home Owners Association</strong>.
          </div>
          <div className="credits">@ VSHOA 2025</div>
          <p>
            Website content created and maintained by the Vishal Sanjivini Home
            Owners Association.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
