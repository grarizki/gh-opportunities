import { lazy, Suspense, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav.jsx";
import { Footer } from "./components/Footer.jsx";
import { Landing } from "./landing/Landing.jsx";

const Docs = lazy(() => import("./docs/Docs.jsx"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function NotFound() {
  return (
    <div className="notfound">
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/" className="btn btn-primary">
        Back to overview
      </Link>
    </div>
  );
}

function DocsSuspense() {
  return (
    <Suspense fallback={<div className="docs-splash" />}>
      <Docs />
    </Suspense>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs/*" element={<DocsSuspense />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
