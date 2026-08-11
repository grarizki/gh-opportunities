import { Link, Navigate, NavLink, Route, Routes, useParams } from "react-router-dom";
import { DOCS, FLAT } from "./data.js";
import { PAGES } from "./pages.jsx";

function Sidebar() {
  return (
    <nav className="docs-side" aria-label="Documentation">
      {DOCS.map((g) => (
        <div className="docs-group" key={g.group}>
          <h4>{g.group}</h4>
          {g.pages.map((p) => (
            <NavLink
              key={p.slug}
              to={`/docs/${p.slug}`}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {p.title}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  );
}

export function DocsIndex() {
  return <Navigate to="/docs/overview" replace />;
}

export function DocPage() {
  const { slug } = useParams();
  if (!slug || !(slug in PAGES)) {
    return (
      <div className="docs">
        <Sidebar />
        <main className="docs-content">
          <div className="notfound">
            <h1>404</h1>
            <p>No such doc page. Pick one from the sidebar.</p>
          </div>
        </main>
      </div>
    );
  }

  const idx = FLAT.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? FLAT[idx - 1] : null;
  const next = idx < FLAT.length - 1 ? FLAT[idx + 1] : null;

  return (
    <div className="docs">
      <Sidebar />
      <main className="docs-content" key={slug}>
        {PAGES[slug]}
        <div className="docs-meta">
          {prev ? <Link to={`/docs/${prev.slug}`}>Prev: {prev.title}</Link> : <span />}
          {next ? <Link to={`/docs/${next.slug}`}>Next: {next.title}</Link> : <span />}
          <a href="https://github.com/grarizki/gh-opportunities" target="_blank" rel="noreferrer">
            Edit on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}

export default function Docs() {
  return (
    <Routes>
      <Route index element={<DocsIndex />} />
      <Route path=":slug" element={<DocPage />} />
    </Routes>
  );
}
