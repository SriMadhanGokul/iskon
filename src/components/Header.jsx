import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CalendarDays, ChevronDown, ChevronRight, Heart, Home as HomeIcon, Info, MapPin, Menu, Phone, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE_NAV_GROUPS, SITE_PAGES } from '../data/pages.js';
import useScrollHeader from '../hooks/useScrollHeader.js';

const moreLinks = [
  { label: 'Home', to: '/' },
  ...SITE_PAGES.map(({ title, path }) => ({ label: title, to: path })),
  { label: 'Donate', to: '/donate' },
];

// Mobile "More" menu: these four only. Visit lives here, Activities is removed from mobile.
const MORE_ITEMS = [
  { label: 'About us', to: '/about', icon: Info },
  { label: 'Plan your visit', to: '/visit', icon: MapPin },
  { label: 'Festivals', to: '/festivals', icon: CalendarDays },
  { label: 'Contact the temple', to: '/contact', icon: Phone },
];

const getDropdownLinks = (group) => {
  const seenPaths = new Set();
  return group.links.filter(({ to }) => {
    const [path, hash] = to.split('#');
    if (hash || path === group.to || seenPaths.has(path) || !SITE_PAGES.some((page) => page.path === path)) {
      return false;
    }
    seenPaths.add(path);
    return true;
  });
};

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

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState('');
  const { pathname } = useLocation();
  const { scrolled, hidden } = useScrollHeader();
  const tone = 'text-maroon';
  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-1 whitespace-nowrap text-[15px] font-medium transition-colors hover:text-primary-dark ${isActive ? 'text-primary-dark' : tone}`;

  useEffect(() => {
    setMoreOpen(false);
    setActiveGroup('');
  }, [pathname]);

  return (
    <>
      <ScrollProgress />
      <motion.header
        animate={{ y: hidden && !moreOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 border-b border-primary-dark/25 bg-primary shadow-[0_8px_30px_rgba(74,26,8,0.08)]"
      >
        <div className={`container-page flex items-center justify-between gap-4 transition-[min-height] duration-500 ${scrolled ? 'min-h-[56px]' : 'min-h-[60px]'}`}>
          <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="Hare Krishna home">
            <img src="/govardhan-dham-logo-96.webp" alt="" aria-hidden="true" width="96" height="96" className={`shrink-0 rounded-lg object-cover transition-all duration-500 ${scrolled ? 'h-9 w-9' : 'h-10 w-10'}`} />
            <span className="min-w-0">
              <span className={`block truncate font-heading text-lg font-bold transition-colors sm:text-xl ${tone}`}>Hare Krishna</span>
              <span className="hidden text-xs text-maroon/75 sm:block">A spiritual home in Jaipur</span>
            </span>
          </Link>
          <nav aria-label="Main navigation" className="hidden flex-1 items-center justify-center gap-14 px-10 xl:flex">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            {SITE_NAV_GROUPS.map((group) => {
              const links = getDropdownLinks(group);
              return (
                <div
                  key={group.to}
                  className="relative"
                  onMouseEnter={() => setActiveGroup(group.label)}
                  onMouseLeave={() => setActiveGroup('')}
                  onFocus={() => setActiveGroup(group.label)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setActiveGroup('');
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Escape') setActiveGroup('');
                  }}
                >
                  <NavLink to={group.to} className={linkClass} aria-haspopup={links.length ? 'true' : undefined} aria-expanded={links.length ? activeGroup === group.label : undefined}>
                    {group.label}{links.length > 0 && <ChevronDown size={18} strokeWidth={2.25} aria-hidden="true" />}
                  </NavLink>
                  {links.length > 0 && activeGroup === group.label && (
                    <div className="absolute left-0 top-full z-50 w-64 pt-3">
                      <div className="max-h-[75vh] overflow-y-auto rounded-2xl border border-primary/50 bg-cream p-2 shadow-soft">
                        {links.map((item) => (
                          <NavLink key={item.label} to={item.to} className={({ isActive }) => `block rounded-xl px-3 py-2 text-sm hover:bg-primary/20 ${isActive ? 'bg-primary/20 font-semibold text-saffron-dark' : 'text-maroon'}`}>
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          <Link to="/donate" className="shine-animation relative inline-flex h-10 shrink-0 items-center overflow-hidden rounded-full bg-primary-dark px-4 text-xs font-bold text-white shadow-soft ring-2 ring-white/60 transition-transform duration-500 hover:scale-[1.08] hover:bg-maroon sm:text-sm"><img src="/gifs/heart.gif" alt="" aria-hidden="true" width="150" height="150" className="-ml-5 -mr-2 h-14 w-14" />Donate now</Link>
          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            aria-label={moreOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={moreOpen}
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-primary/60 text-maroon transition-colors sm:inline-flex xl:hidden"
          >
            {moreOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {moreOpen && (
          <nav aria-label="More navigation" className="container-page border-t border-primary-dark/25 bg-primary py-2 xl:hidden">
            <ul className="divide-y divide-primary-dark/20">
              {MORE_ITEMS.map(({ label, to, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) => `flex min-h-14 items-center gap-4 px-1 py-2 transition-colors active:bg-gold/60 ${isActive ? 'text-saffron-dark' : 'text-maroon'}`}
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
      <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-primary-dark/25 bg-primary pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(74,26,8,0.1)] sm:hidden">
        <Link to="/" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><HomeIcon size={18} aria-hidden="true" />Home</Link>
        <Link to="/about" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><Info size={18} aria-hidden="true" />About us</Link>
        <Link to="/festivals" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><CalendarDays size={18} aria-hidden="true" />Festivals</Link>
        <button type="button" onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen} className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><Menu size={18} aria-hidden="true" />More</button>
        <Link to="/donate" className="flex min-h-16 flex-col items-center justify-center gap-1 bg-primary text-xs font-semibold text-maroon"><Heart size={18} aria-hidden="true" />Donate</Link>
      </nav>
    </>
  );
}
