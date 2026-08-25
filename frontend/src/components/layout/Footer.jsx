const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div>
          <h3>Quantum Sure Success</h3>

          <p>
            Personalized insights through our scan-based
            experience.
          </p>
        </div>

        <div className="footer__links">
          <a href="/">Home</a>
          <a href="/scans">Scans</a>
          <a href="/login">Login</a>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} Quantum Sure Success.
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;