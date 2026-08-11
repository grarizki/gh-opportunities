import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand">
              <span className="brand-mark" style={{ width: 26, height: 26, fontSize: 15 }}>
                <svg viewBox="0 0 24 24" width={15} height={15} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l4 3-4 3M13 15h5" />
                </svg>
              </span>
              gh-opp
            </Link>
            <p className="footer-tagline">Find your next open-source contribution.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <Link to="/">Overview</Link>
            <Link to="/docs">Docs</Link>
            <Link to="/docs/install">Install</Link>
          </div>
          <div className="footer-col">
            <h4>Source</h4>
            <a href="https://github.com/grarizki/gh-opportunities" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://github.com/grarizki/gh-opportunities/blob/main/LICENSE" target="_blank" rel="noreferrer">
              MIT license
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>gh-opp v0.2.0 · Rust 1.88+</span>
          <span>
            <Icon name="github" size={14} />
            {" "}grarizki/gh-opportunities
          </span>
        </div>
      </div>
    </footer>
  );
}
