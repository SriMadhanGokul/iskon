import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, Twitter } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { SITE_NAV_LINKS } from '../data/pages.js';

const ICONS = { youtube: Youtube, instagram: Instagram, facebook: Facebook, x: Twitter };

export default function Footer() {
  const { contact, social, timings } = siteConfig;
  return (
    <footer className="mt-16 border-t-4 border-primary-dark bg-primary pb-20 text-maroon md:pb-0">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-lg font-semibold text-maroon">{siteConfig.brandName}</h2>
          <p className="mt-2 text-sm">{contact.address}</p>
          <p className="mt-2 text-sm"><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></p>
          <a className="mt-2 inline-block text-sm underline" href={contact.mapLink} target="_blank" rel="noopener noreferrer">View on map</a>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-maroon">Daily timings</h2>
          <ul className="mt-2 space-y-1 text-sm">{timings.map(([n, t]) => <li key={n} className="flex justify-between gap-4"><span>{n}</span><span>{t}</span></li>)}</ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-maroon">Explore</h2>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {SITE_NAV_LINKS.map(({ label, to }) => <li key={to}><Link to={to} className="hover:underline">{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-maroon">More links</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/donate">Donate</Link></li><li><Link to="/terms">Terms</Link></li><li><Link to="/privacy">Privacy</Link></li><li><Link to="/refund">Refund policy</Link></li>
          </ul>
          <div className="mt-4 flex gap-2">
            {Object.entries(social).filter(([, u]) => u).map(([k, u]) => {
              const Icon = ICONS[k];
              return <a key={k} href={u} target="_blank" rel="noopener noreferrer" aria-label={k} className="flex h-11 w-11 items-center justify-center rounded-full border border-maroon/40 hover:bg-white/30"><Icon size={18} /></a>;
            })}
          </div>
        </div>
      </div>
      <p className="border-t border-maroon/25 py-4 text-center text-sm">UKD Copyright © 2026 Srila Prabhupada’s ISKCON, Govardhan Dham - Jodhpur</p>
    </footer>
  );
}
