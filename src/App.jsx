import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Donate = lazy(() => import('./pages/Donate.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <ScrollTop />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="container-page py-24 text-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
