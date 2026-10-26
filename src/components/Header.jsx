import { Link, useLocation } from 'react-router-dom';
import { BookOpen, House, Landmark, Menu, Sparkles } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';

const NAV = [
  { label: 'Mandir', id: 'mandir', icon: Landmark },
  { label: 'Prabhupada', id: 'prabhupada', icon: BookOpen },
  { label: 'Activities', id: 'activities', icon: Sparkles },
  { label: 'More', id: 'visitor-info', icon: Menu },
];

const sectionLink = (id) => `/#${id}`;

export default function Header() {
  const { pathname, hash } = useLocation();
  const homePath = pathname === '/';

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gold/60 bg-cream/95 shadow-soft backdrop-blur">
        <div className="container-page flex min-h-[76px] items-center justify-between gap-4">
          <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3" aria-label={`${siteConfig.name} home`}>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-maroon text-lg font-bold text-gold sm:h-11 sm:w-11" aria-hidden="true">ॐ</span>
            <span className="min-w-0 whitespace-nowrap font-heading text-xs font-bold leading-tight sm:text-xl">{siteConfig.name}<span className="mt-0.5 hidden font-body text-xs font-normal text-maroon/70 sm:block">ISKCON · Jagatpura, Jaipur</span></span>
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV.map(({ label, id }) => (
              <Link key={id} to={sectionLink(id)} aria-current={hash === `#${id}` ? 'location' : undefined} className={`rounded-full px-3 py-2 text-sm transition-colors hover:bg-gold/30 hover:text-saffron-dark ${hash === `#${id}` ? 'font-semibold text-saffron-dark' : 'font-medium'}`}>{label}</Link>
            ))}
          </nav>
          <Link to="/donate" className="btn-primary shrink-0 px-4 sm:px-5">Donate <span className="hidden sm:inline">Now</span></Link>
        </div>
      </header>
      <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/70 bg-cream/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(74,26,8,0.08)] backdrop-blur lg:hidden">
        <ul className="mx-auto grid max-w-xl grid-cols-5">
          <li>
            <Link to="/" aria-current={homePath && !hash ? 'page' : undefined} className={`flex min-h-[64px] min-w-0 w-full flex-col items-center justify-center gap-1 px-0.5 text-center text-[10px] leading-tight ${homePath && !hash ? 'font-semibold text-saffron-dark' : 'text-maroon'}`}>
              <House size={19} aria-hidden="true" /><span className="max-w-full break-words">Home</span>
            </Link>
          </li>
          {NAV.map(({ label, id, icon: Icon }) => (
            <li key={id}>
              <Link to={sectionLink(id)} aria-current={hash === `#${id}` ? 'location' : undefined} className={`flex min-h-[64px] min-w-0 w-full flex-col items-center justify-center gap-1 px-0.5 text-center text-[9px] leading-tight whitespace-nowrap transition-colors hover:text-saffron-dark ${hash === `#${id}` ? 'font-semibold text-saffron-dark' : 'text-maroon'}`}>
                <Icon size={19} aria-hidden="true" /><span>{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
