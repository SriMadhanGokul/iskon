import { useEffect, useState } from 'react';
import { CalendarDays, Home as HomeIcon, MapPin, Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { SITE_NAV_LINKS, SITE_PAGES } from '../data/pages.js';

const primaryLinks = SITE_NAV_LINKS.filter(({ to }) =>
  ['/about', '/mandir', '/activities', '/festivals', '/visit'].includes(to),
);
const moreLinks = [
  { label: 'Home', to: '/' },
  ...SITE_PAGES.map(({ title, path }) => ({ label: title, to: path })),
  { label: 'Donate', to: '/donate' },
];

function linkClass({ isActive }) {
  return `whitespace-nowrap text-sm font-medium transition-colors hover:text-saffron-dark ${isActive ? 'text-saffron-dark' : 'text-maroon'}`;
}

export default function Header() {
  const [moreOpen, setMoreOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gold/70 bg-cream/95 backdrop-blur">
        <div className="container-page flex min-h-[72px] items-center justify-between gap-4">
          <Link to="/" className="min-w-0" aria-label="Gupt Vrindavan Dham home">
            <span className="block truncate font-heading text-lg font-bold text-maroon sm:text-xl">Gupt Vrindavan Dham</span>
            <span className="hidden text-xs text-maroon/70 sm:block">A spiritual home in Jaipur</span>
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
                className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-saffron-dark ${moreOpen ? 'text-saffron-dark' : 'text-maroon'}`}
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
          <Link to="/donate" className="hidden rounded-full bg-saffron px-5 py-2.5 text-sm font-semibold text-maroon transition-colors hover:bg-gold sm:inline-flex">Donate</Link>
          <button
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            aria-label={moreOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={moreOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold text-maroon xl:hidden"
          >
            {moreOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>

        {moreOpen && (
          <nav aria-label="More navigation" className="container-page grid max-h-[65vh] grid-cols-2 gap-2 overflow-y-auto border-t border-gold/70 py-4 sm:grid-cols-3 xl:hidden">
            {SITE_NAV_LINKS.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `rounded-xl px-3 py-3 text-sm ${isActive ? 'bg-saffron/20 font-semibold text-saffron-dark' : 'bg-white text-maroon'}`}>{item.label}</NavLink>
            ))}
            <Link to="/donate" className="rounded-xl bg-white px-3 py-3 text-sm text-maroon">Donate</Link>
          </nav>
        )}
      </header>

      <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-gold bg-cream/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(74,26,8,0.1)] backdrop-blur sm:hidden">
        <Link to="/" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><HomeIcon size={18} aria-hidden="true" />Home</Link>
        <Link to="/mandir" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><span aria-hidden="true">ॐ</span>Temple</Link>
        <Link to="/activities" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><CalendarDays size={18} aria-hidden="true" />Activities</Link>
        <Link to="/visit" className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><MapPin size={18} aria-hidden="true" />Visit</Link>
        <button type="button" onClick={() => setMoreOpen((open) => !open)} aria-expanded={moreOpen} className="flex min-h-16 flex-col items-center justify-center gap-1 text-xs text-maroon"><Menu size={18} aria-hidden="true" />More</button>
      </nav>
    </>
  );
}
