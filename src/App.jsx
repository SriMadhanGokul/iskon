import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import AmbientGlow from './components/AmbientGlow.jsx';
import Header from './components/Header.jsx';
import FestivalGifs from './components/FestivalGifs.jsx';
import Footer from './components/Footer.jsx';
import PhotoStrip from './components/PhotoStrip.jsx';
import OfferDiya from './components/OfferDiya.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import { PAGE_BY_PATH, SITE_PAGES } from './data/pages.js';
import { FESTIVAL_PAGE_BY_PATH } from './data/festivalPages.js';
// The landing page ships in the main bundle so the hero paints without waiting on another chunk.
import Home from './pages/Home.jsx';

const Donate = lazy(() => import('./pages/Donate.jsx'));
const DonationSevaPage = lazy(() => import('./pages/Donate.jsx').then((module) => ({ default: module.DonationSevaPage })));
const DonationCheckout = lazy(() => import('./pages/DonationCheckout.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const InformationPage = lazy(() => import('./pages/InformationPage.jsx'));
const Darshan = lazy(() => import('./pages/Darshan.jsx'));
const Darshans = lazy(() => import('./pages/Darshans.jsx'));
const DarshanUpload = lazy(() => import('./pages/DarshanUpload.jsx'));
const Bhajans = lazy(() => import('./pages/Bhajans.jsx'));
const BhajanCollection = lazy(() => import('./pages/BhajanCollection.jsx'));
const BhajanSong = lazy(() => import('./pages/BhajanSong.jsx'));
const Blogs = lazy(() => import('./pages/Blogs.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const FestivalPage = lazy(() => import('./pages/FestivalPage.jsx'));

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
      <WhatsAppButton />
      <FestivalGifs />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="container-page py-24 text-center">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/darshan" element={<Darshan />} />
            <Route path="/mandir/darshans" element={<Darshans />} />
            <Route path="/mandir/darshans/upload" element={<DarshanUpload />} />
            <Route path="/bhajans" element={<Bhajans />} />
            {['moods', 'categories', 'authors', 'festivals'].map((type) => (
              <Route key={type} path={`/bhajans/${type}/:slug`} element={<BhajanCollection type={type} />} />
            ))}
            <Route path="/bhajans/:slug" element={<BhajanSong />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/donate/checkout" element={<DonationCheckout />} />
            <Route path="/donate/:sevaId" element={<DonationSevaPage />} />
            {SITE_PAGES.map((page) => (
              <Route
                key={page.path}
                path={page.path}
                element={FESTIVAL_PAGE_BY_PATH[page.path]
                  ? <FestivalPage page={FESTIVAL_PAGE_BY_PATH[page.path]} />
                  : <InformationPage page={PAGE_BY_PATH[page.path]} />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <PhotoStrip />
      <Footer />
    </MotionConfig>
  );
}
