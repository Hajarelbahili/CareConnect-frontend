import { Link } from "react-router-dom";
import logo from "../../../assets/images/logogrand.png";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* =========================
            BRAND
        ========================= */}

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="CareConnect" className="footer-logo-image" />
          </Link>

          <p className="footer-description">
            CareConnect is your trusted partner in health. We connect you with
            the best doctors and the right care.
          </p>

          <div className="footer-socials">
            <a href="#" className="footer-social" aria-label="Facebook">
              f
            </a>

            <a href="#" className="footer-social" aria-label="Instagram">
              ◎
            </a>

            <a href="#" className="footer-social" aria-label="Twitter">
              𝕏
            </a>

            <a href="#" className="footer-social" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>

        {/* =========================
            QUICK LINKS
        ========================= */}

        <div className="footer-column">
          <h3 className="footer-title">Quick Links</h3>

          <ul className="footer-links">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/departments">Departments</Link>
            </li>

            <li>
              <Link to="/doctors">Doctors</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* =========================
            CONTACT
        ========================= */}

        <div className="footer-column">
          <h3 className="footer-title">Contact Us</h3>

          <div className="footer-contact">
            <div className="footer-contact-item">
              <span>
                123 Health Street,
                <br />
                Casablanca, Morocco
              </span>
            </div>

            <div className="footer-contact-item">
              <span>+212 6 12 34 56 78</span>
            </div>

            <div className="footer-contact-item">
              <span>contact@careconnect.ma</span>
            </div>

            <div className="footer-contact-item">
              {/* 
          <span className="footer-contact-icon">◷</span>
        */}
              <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            </div>
          </div>
        </div>

        {/* =========================
            NEWSLETTER
        ========================= */}

        <div className="footer-column footer-newsletter">
          <h3 className="footer-title">Newsletter</h3>

          <p className="footer-newsletter-text">
            Subscribe to get health tips and updates.
          </p>

          <form className="footer-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
            />

            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* =========================
          BOTTOM
      ========================= */}

      <div className="footer-bottom">
        <p>© 2024 CareConnect. All rights reserved.</p>

        <div className="footer-legal">
          <Link to="/privacy-policy">Privacy Policy</Link>

          <span className="footer-divider"></span>

          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
