import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import AmbientGlow from './components/AmbientGlow.jsx';
import Header from './components/Header.jsx';
import FestivalGifs from './components/FestivalGifs.jsx';
import Footer from './components/Footer.jsx';
import OfferDiya from './components/OfferDiya.jsx';
import { PAGE_BY_PATH, SITE_PAGES } from './data/pages.js';
// The landing page ships in the main bundle so the hero paints without waiting on another chunk.
import Home from './pages/Home.jsx';

const Donate = lazy(() => import('./pages/Donate.jsx'));
const DonationCheckout = lazy(() => import('./pages/DonationCheckout.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const InformationPage = lazy(() => import('./pages/InformationPage.jsx'));

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
    // reducedMotion="user": Framer skips movement for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <AmbientGlow />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">
        Skip to content
      </a>
      <ScrollTop />
      <OfferDiya />
      <FestivalGifs />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="container-page py-24 text-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/checkout" element={<DonationCheckout />} />
            {SITE_PAGES.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={<InformationPage page={PAGE_BY_PATH[page.path]} />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
