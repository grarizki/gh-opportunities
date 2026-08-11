import { NavLink, Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";

export function Mark({ size = 26 }) {
  return (
    <span className="brand-mark" style={{ width: size, height: size, fontSize: size * 0.58 }}>
      <svg viewBox="0 0 24 24" width={size * 0.58} height={size * 0.58} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9l4 3-4 3M13 15h5" />
      </svg>
    </span>
  );
}

export function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <Mark />
          gh-opp
        </Link>
        <div className="nav-right">
          <nav className="nav-links">
            <NavLink to="/" end>
              Overview
            </NavLink>
            <NavLink to="/docs" end>
              Docs
            </NavLink>
          </nav>
          <div className="nav-actions">
            <a
              className="nav-gh"
              href="https://github.com/grarizki/gh-opportunities"
              target="_blank"
              rel="noreferrer"
              aria-label="gh-opp on GitHub"
            >
              <Icon name="github" />
              <span>GitHub</span>
            </a>
            <Link to="/docs/install" className="btn btn-primary btn-install">
              Install
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
