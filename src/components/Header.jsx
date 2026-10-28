import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CalendarDays, Heart, Home as HomeIcon, MapPin, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE_NAV_LINKS, SITE_PAGES } from '../data/pages.js';
import useScrollHeader from '../hooks/useScrollHeader.js';

const primaryLinks = SITE_NAV_LINKS.filter(({ to }) =>
  ['/about', '/mandir', '/activities', '/festivals', '/visit'].includes(to),
);
const moreLinks = [
  { label: 'Home', to: '/' },
  ...SITE_PAGES.map(({ title, path }) => ({ label: title, to: path })),
  { label: 'Donate', to: '/donate' },
];

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-saffron-dark via-saffron to-gold shadow-[0_0_10px_rgba(255,155,51,0.7)]"
    />
  );
}

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrolled, hidden } = useScrollHeader();
  // Only the home page has a photo hero for the header to float over.
  const overHero = pathname === '/' && !scrolled && !moreOpen;
  const tone = overHero ? 'text-cream' : 'text-maroon';
  const linkClass = ({ isActive }) =>
    `whitespace-nowrap text-sm font-medium transition-colors hover:text-saffron ${isActive ? (overHero ? 'text-gold' : 'text-saffron-dark') : tone}`;

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <motion.header
        animate={{ y: hidden && !moreOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ${
          overHero
            ? 'border-transparent bg-transparent'
            : 'border-gold/50 bg-cream/75 shadow-[0_8px_30px_rgba(74,26,8,0.08)] backdrop-blur-[12px] backdrop-saturate-150'
        }`}
      >
        <div className={`container-page flex items-center justify-between gap-4 transition-[min-height] duration-500 ${scrolled ? 'min-h-[60px]' : 'min-h-[72px]'}`}>
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Hare Krishna home">
            <img src="/govardhan-dham-logo-96.webp" alt="" aria-hidden="true" width="96" height="96" className={`shrink-0 rounded-lg object-cover transition-all duration-500 ${scrolled ? 'h-10 w-10' : 'h-12 w-12'}`} />
            <span className="min-w-0">
              <span className={`block truncate font-heading text-lg font-bold transition-colors sm:text-xl ${overHero ? 'text-white' : 'text-maroon'}`}>Hare Krishna</span>
              <span className={`hidden text-xs transition-colors sm:block ${overHero ? 'text-cream/75' : 'text-maroon/70'}`}>A spiritual home in Jaipur</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-5 xl:flex">
            {primaryLinks.map((item) => <NavLink key={item.to} to={item.to} className={linkClass}>{item.label}</NavLink>)}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
              onFocus={() => setMoreOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setMoreOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setMoreOpen(false);
              }}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={moreOpen}
                onClick={() => setMoreOpen((open) => !open)}
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-saffron ${moreOpen ? 'text-saffron-dark' : tone}`}
              >
                More <span aria-hidden="true">⌄</span>
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full z-50 w-[min(42rem,calc(100vw-2rem))] pt-3">
                  <div className="grid max-h-[75vh] grid-cols-2 gap-1 overflow-y-auto rounded-2xl border border-gold bg-white p-3 shadow-soft sm:grid-cols-3">
                    {moreLinks.map((item) => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        className={({ isActive }) => `rounded-xl px-3 py-2 text-sm hover:bg-cream ${isActive ? 'font-semibold text-saffron-dark' : 'text-maroon'}`}
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
          <Link to="/donate" className="shine-animation relative inline-flex h-10 shrink-0 items-center overflow-hidden rounded-full bg-saffron-dark px-4 text-xs font-bold text-white shadow-soft ring-2 ring-saffron/30 transition-transform duration-500 hover:scale-[1.08] hover:bg-maroon sm:text-sm"><img src="/gifs/heart.gif" alt="" aria-hidden="true" width="150" height="150" className="-ml-5 -mr-2 h-14 w-14" />Donate now</Link>
          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            aria-label={moreOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={moreOpen}
            className={`hidden h-11 w-11 items-center justify-center rounded-full border transition-colors sm:inline-flex xl:hidden ${overHero ? 'border-gold/60 text-cream' : 'border-gold text-maroon'}`}
          >
            {moreOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {moreOpen && (
          <nav aria-label="More navigation" className="container-page grid max-h-[65vh] grid-cols-2 gap-2 overflow-y-auto border-t border-gold/70 py-4 sm:grid-cols-3 xl:hidden">
            {SITE_NAV_LINKS.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-xl px-3 py-3 text-sm ${isActive ? 'bg-saffron/20 font-semibold text-saffron-dark' : 'bg-white text-maroon'}`}>{item.label}</NavLink>
            ))}
          </nav>
        )}
      </motion.header>

      <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-gold bg-cream/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(74,26,8,0.1)] backdrop-blur sm:hidden">
        <Link to="/" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><HomeIcon size={18} aria-hidden="true" />Home</Link>
        <Link to="/mandir" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><span aria-hidden="true">ॐ</span>Temple</Link>
        <Link to="/activities" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><CalendarDays size={18} aria-hidden="true" />Activities</Link>
        <Link to="/visit" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><MapPin size={18} aria-hidden="true" />Visit</Link>
        <button type="button" onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen} className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><Menu size={18} aria-hidden="true" />More</button>
        <Link to="/donate" className="flex min-h-16 flex-col items-center justify-center gap-1 bg-saffron-dark text-xs font-semibold text-white"><Heart size={18} aria-hidden="true" />Donate</Link>
      </nav>
    </>
  );
}
