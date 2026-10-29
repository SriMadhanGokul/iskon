import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CalendarDays, ChevronDown, ChevronRight, Heart, Home as HomeIcon, Info, MapPin, Menu, Phone, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useScrollHeader from '../hooks/useScrollHeader.js';
import AnnouncementBar from './AnnouncementBar.jsx';

// Mobile "More" menu: these four only. Visit lives here, Activities is removed from mobile.
const MORE_ITEMS = [
  { label: 'About us', to: '/about', icon: Info },
  { label: 'Plan your visit', to: '/visit', icon: MapPin },
  { label: 'Contact the temple', to: '/contact', icon: Phone },
];

// Desktop bar. Entries with `items` open a dropdown; the top label still links to `to`.
// `alignRight` opens the dropdown leftwards so it stays on screen near the right edge.
const DESKTOP_LINKS = [
  { label: 'Home', to: '/', end: true },
  { label: 'Darshan', to: '/mandir/darshans' },
  { label: 'Srila Prabhupada', to: '/prabhupada' },
  { label: 'Donation', to: '/donate' },
  { label: 'About', to: '/about', items: [
    { label: 'About the Dham', to: '/about' },
    { label: 'Explore the temple', to: '/mandir' },
    { label: 'Activities', to: '/activities' },
    { label: 'Festivals', to: '/festivals' },
    { label: 'Photo gallery', to: '/gallery' },
    { label: 'Blogs', to: '/blogs' },
  ] },
  { label: 'Contact us', to: '/contact', alignRight: true, items: [
    { label: 'Contact the temple', to: '/contact' },
    { label: 'Plan your visit', to: '/visit' },
    { label: 'Darshan & aarti timings', to: '/darshan' },
    { label: 'Get involved', to: '/get-involved' },
  ] },
];

const navText = (active) =>
  `inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-full px-2 text-base min-[1400px]:px-3 font-medium tracking-wide transition-colors ${active ? 'text-primary-dark' : 'text-maroon hover:text-primary-dark'}`;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-gradient-to-r from-primary-dark via-primary to-gold shadow-[0_0_10px_rgba(255,153,51,0.7)]"
    />
  );
}

// One desktop link. With `items` it opens a dropdown on hover, or on the chevron for keyboard and touch.
function NavItem({ label, to, end, items, alignRight, pathname }) {
  const [open, setOpen] = useState(false);
  const active = to === '/'
    ? pathname === '/'
    : pathname === to || pathname.startsWith(`${to}/`) || Boolean(items?.some((item) => item.to === pathname));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!items) {
    return <NavLink to={to} end={end} className={({ isActive }) => navText(isActive)}>{label}</NavLink>;
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
      onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
    >
      <div className={`${navText(active)} pr-1.5`}>
        <Link to={to}>{label}</Link>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={`${label} menu`}
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-primary/15"
        >
          <ChevronDown size={16} aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`absolute top-full z-50 pt-3 ${alignRight ? 'right-0' : 'left-1/2 -translate-x-1/2'} transition-all duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <ul className="min-w-56 rounded-2xl border border-gold/60 bg-white p-2 shadow-[0_20px_45px_-15px_rgba(74,26,8,0.35)]">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) => `flex items-center justify-between gap-4 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm transition-colors ${isActive ? 'bg-primary/15 font-semibold text-primary-dark' : 'text-maroon hover:bg-cream hover:text-primary-dark'}`}
              >
                {item.label}
                <ChevronRight size={14} aria-hidden="true" className="opacity-40" />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrolled } = useScrollHeader();

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <AnnouncementBar />
      <motion.header
        className={`sticky top-0 z-40 bg-primary backdrop-blur-md transition-shadow xl:bg-white/95 duration-300 ${scrolled ? 'shadow-[0_10px_30px_-12px_rgba(74,26,8,0.25)]' : 'shadow-[0_1px_0_rgba(74,26,8,0.08)]'}`}
      >
        <div className={`flex items-center justify-between gap-2 transition-[min-height] duration-300 sm:gap-4 ${scrolled ? 'min-h-[64px]' : 'min-h-[76px]'}`}>
          {/* The logo and name sit on a primary-colour block at the very left edge of the bar.
              Sizes step down on narrow phones so the Donate button still fits beside it. */}
          <Link to="/" className="flex shrink-0 items-center gap-1.5 self-stretch bg-primary pl-2 pr-2.5 min-[360px]:gap-2 min-[360px]:pl-2.5 min-[360px]:pr-3 min-[400px]:gap-3 min-[400px]:pl-3 min-[400px]:pr-4 sm:pl-5 sm:pr-6" aria-label="Govardhan Dham home">
            <img src="/govardhan-dham-logo-96.webp" alt="" aria-hidden="true" width="96" height="96" className={`shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-white/60 transition-all duration-300 ${scrolled ? 'h-9 w-9 sm:h-10 sm:w-10' : 'h-9 w-9 min-[360px]:h-10 min-[360px]:w-10 sm:h-12 sm:w-12'}`} />
            <span className="flex flex-col leading-none text-maroon">
              <span className="whitespace-nowrap text-[8.5px] font-semibold tracking-tight min-[360px]:text-[9px] min-[360px]:tracking-normal min-[400px]:text-[10px] sm:text-[11px]">Hare Krishna Mandir</span>
              <span className="whitespace-nowrap font-heading text-[14px] font-bold leading-tight min-[360px]:text-base min-[400px]:text-xl sm:text-[26px]">Govardhan Dham</span>
              <span className="whitespace-nowrap text-[8.5px] font-semibold tracking-tight min-[360px]:text-[9px] min-[360px]:tracking-normal min-[400px]:text-[10px] sm:text-[11px]">Srila Prabhupada’s ISKCON</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-center gap-2 xl:flex min-[1400px]:gap-6 2xl:gap-10">
            {DESKTOP_LINKS.map((link) => <NavItem key={link.label} {...link} pathname={pathname} />)}
          </nav>
          <div className="flex shrink-0 items-center gap-2 pr-2 min-[360px]:pr-2.5 min-[400px]:pr-3 sm:pr-5">
            {/* Same pill and beating heart at every size, a step smaller on phones. */}
            <Link to="/donate" className="shine-animation relative inline-flex h-9 items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-primary-dark to-[#d9531c] px-3 text-xs font-bold text-white shadow-[0_8px_20px_-6px_rgba(184,60,0,0.6)] transition-transform duration-300 hover:scale-[1.04] min-[360px]:h-10 min-[360px]:gap-2 min-[360px]:px-4 min-[360px]:text-[13px] sm:h-11 sm:px-5 sm:text-sm">
              <Heart aria-hidden="true" className="h-4 w-4 shrink-0 fill-white motion-safe:animate-heartbeat sm:h-[18px] sm:w-[18px]" />Donate Now
            </Link>
            <button
              type="button"
              onClick={() => setMoreOpen((open) => !open)}
              aria-label={moreOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={moreOpen}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-gold text-maroon transition-colors hover:bg-cream sm:inline-flex xl:hidden"
            >
              {moreOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {moreOpen && (
          <nav aria-label="More navigation" className="container-page border-t border-gold/60 bg-white py-2 xl:hidden">
            <ul className="divide-y divide-gold/50">
              {MORE_ITEMS.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMoreOpen(false)}
                    className={({ isActive }) => `flex min-h-14 items-center gap-4 px-1 py-2 transition-colors active:bg-cream ${isActive ? 'text-saffron-dark' : 'text-maroon'}`}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cream text-maroon"><Icon size={18} aria-hidden="true" /></span>
                    <span className="flex-1 text-[15px] font-semibold">{label}</span>
                    <ChevronRight size={18} className="text-maroon/60" aria-hidden="true" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </motion.header>

      {moreOpen && (
        <button type="button" aria-label="Close menu" onClick={() => setMoreOpen(false)} className="fixed inset-0 z-30 cursor-default bg-maroon/25 xl:hidden" />
      )}
      <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-primary-dark/25 bg-primary pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(74,26,8,0.1)] sm:hidden">
        <Link to="/" onClick={() => setMoreOpen(false)} className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><HomeIcon size={18} aria-hidden="true" />Home</Link>
        <Link to="/festivals" onClick={() => setMoreOpen(false)} className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><CalendarDays size={18} aria-hidden="true" />Festivals</Link>
        <button type="button" onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen} className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><Menu size={18} aria-hidden="true" />More</button>
        <Link to="/donate" onClick={() => setMoreOpen(false)} className="flex min-h-16 flex-col items-center justify-center gap-1 bg-primary text-xs font-semibold text-maroon"><Heart size={18} aria-hidden="true" />Donate</Link>
      </nav>
    </>
  );
}
