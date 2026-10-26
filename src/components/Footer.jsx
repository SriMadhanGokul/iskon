import { Link } from 'react-router-dom';
import { Youtube, Instagram, Facebook, Twitter } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';

const ICONS = { youtube: Youtube, instagram: Instagram, facebook: Facebook, x: Twitter };

export default function Footer() {
  const { contact, social, timings } = siteConfig;
  return (
    <footer className="mt-16 bg-maroon pb-20 text-cream md:pb-0">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-gold">Gupt Vrindavan Dham</h2>
          <p className="mt-2 text-sm">{contact.address}</p>
          <p className="mt-2 text-sm"><a href={`tel:${contact.phoneHref}`}>{contact.phone}</a></p>
          <a className="mt-2 inline-block text-sm underline" href={contact.mapLink} target="_blank" rel="noopener noreferrer">View on map</a>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gold">Daily timings</h2>
          <ul className="mt-2 space-y-1 text-sm">{timings.map(([n, t]) => <li key={n} className="flex justify-between gap-4"><span>{n}</span><span>{t}</span></li>)}</ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gold">Links</h2>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/donate">Donate</Link></li><li><Link to="/terms">Terms</Link></li><li><Link to="/privacy">Privacy</Link></li>
          </ul>
          <div className="mt-4 flex gap-2">
            {Object.entries(social).filter(([, u]) => u).map(([k, u]) => {
              const Icon = ICONS[k];
              return <a key={k} href={u} target="_blank" rel="noopener noreferrer" aria-label={k} className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 hover:bg-gold/20"><Icon size={18} /></a>;
            })}
          </div>
        </div>
      </div>
      <p className="border-t border-gold/30 py-4 text-center text-sm">©2026 Gupt Vrindavan Dham</p>
    </footer>
  );
}
