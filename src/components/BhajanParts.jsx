import { useEffect, useId, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Music, Search, X } from 'lucide-react';
import { WHATSAPP_CHANNEL, searchSongs, songPath } from '../data/bhajans.js';

// Shared building blocks for the bhajan pages.

export function SectionHeading({ badge, title, text, children }) {
  return (
    <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        {badge && <p className="inline-flex rounded-full bg-maroon px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold">{badge}</p>}
        <h2 className="mt-3 font-heading text-3xl font-bold text-maroon sm:text-4xl">{title}</h2>
        {text && <p className="mt-2 max-w-2xl text-maroon/75">{text}</p>}
      </div>
      {children}
    </div>
  );
}

export function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm font-semibold">
        {items.map(({ label, to }, i) => (
          <li key={label} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={15} aria-hidden="true" className="opacity-60" />}
            {to ? <Link to={to} className="opacity-80 hover:opacity-100 hover:underline">{label}</Link> : <span aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Round composer photo, or initials when the live site has no picture.
export function Avatar({ name, image, className = 'h-20 w-20' }) {
  if (image) return <img src={image} alt="" loading="lazy" decoding="async" className={`${className} shrink-0 rounded-full object-cover ring-2 ring-gold`} />;
  const initials = name.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('');
  return <span aria-hidden="true" className={`${className} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark font-heading text-2xl font-bold text-white ring-2 ring-gold`}>{initials}</span>;
}

// Coloured tile linking to a mood, category or festival collection.
export function CollectionTile({ to, title, subtitle, gradient, icon: Icon = Music, className = '' }) {
  return (
    <Link to={to} className={`group relative flex min-h-40 flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br p-5 text-white shadow-soft transition-transform duration-300 hover:-translate-y-1 sm:min-h-48 ${gradient} ${className}`}>
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 -right-8 h-40 w-40 rounded-full border-[18px] border-white/10 transition-transform duration-500 group-hover:scale-110" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-8 h-28 w-28 rounded-full border-[10px] border-white/10" />
      <span className="relative">
        <span className="block font-heading text-xl font-bold leading-tight sm:text-2xl">{title}</span>
        <span className="mt-1 block text-sm text-white/85">{subtitle}</span>
      </span>
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-dark shadow"><Icon size={18} aria-hidden="true" /></span>
    </Link>
  );
}

// Card for one song: title, composer and verse count.
export function SongCard({ song }) {
  return (
    <Link to={songPath(song)} className="card-lift group flex min-w-0 items-center gap-3 rounded-2xl border border-gold/70 bg-white p-3 shadow-soft">
      {song.image
        ? <img src={song.image} alt="" loading="lazy" decoding="async" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
        : <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/80 to-primary-dark text-white"><Music size={22} /></span>}
      <span className="min-w-0">
        <span className="block truncate font-semibold text-maroon group-hover:text-primary-dark">{song.title}</span>
        <span className="block truncate text-sm text-maroon/65">{song.author}</span>
      </span>
    </Link>
  );
}

// Search box with a dropdown of matching songs. Enter opens the first match.
export function BhajanSearch({ placeholder = 'Search by title, composer, category or mood…', className = '' }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const listId = useId();
  const navigate = useNavigate();
  const results = query.trim() ? searchSongs(query).slice(0, 8) : [];

  useEffect(() => {
    const close = (event) => { if (!boxRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);

  const go = (song) => { setOpen(false); setQuery(''); navigate(songPath(song)); };

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <form role="search" onSubmit={(event) => { event.preventDefault(); if (results[0]) go(results[0]); }} className="flex items-center gap-2 rounded-full border border-gold bg-white p-1.5 pl-5 shadow-soft focus-within:ring-2 focus-within:ring-primary">
        <Search size={18} className="shrink-0 text-maroon/50" aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
          placeholder={placeholder}
          aria-label="Search bhajans"
          aria-controls={listId}
          aria-expanded={open && Boolean(query.trim())}
          className="min-w-0 flex-1 bg-transparent py-2 text-maroon outline-none placeholder:text-maroon/45 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="flex h-8 w-8 items-center justify-center rounded-full text-maroon/60 hover:bg-cream"><X size={16} aria-hidden="true" /></button>}
        <button type="submit" className="rounded-full bg-primary-dark px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon">Search</button>
      </form>
      {open && query.trim() && (
        <ul id={listId} className="absolute inset-x-0 top-full z-30 mt-2 max-h-96 overflow-y-auto rounded-2xl border border-gold/70 bg-white p-2 text-left shadow-[0_20px_45px_-15px_rgba(74,26,8,0.35)]">
          {results.map((song) => (
            <li key={song.slug}>
              <button type="button" onClick={() => go(song)} className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-cream">
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-maroon">{song.title}</span>
                  <span className="block truncate text-xs text-maroon/60">{song.author} · {song.verseCount} verses</span>
                </span>
                <ChevronRight size={16} className="shrink-0 text-primary-dark" aria-hidden="true" />
              </button>
            </li>
          ))}
          {results.length === 0 && <li className="px-3 py-3 text-sm text-maroon/65">No bhajans match “{query.trim()}”.</li>}
        </ul>
      )}
    </div>
  );
}

// The live site asks for an email here; this build has no mailing list, so it links to the
// temple's WhatsApp channel instead.
export function StayConnected() {
  return (
    <section className="container-page py-12">
      <div className="flex flex-col gap-6 rounded-[2rem] bg-gradient-to-r from-maroon via-[#7a2a0c] to-primary-dark px-6 py-10 text-white sm:px-12 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl">Stay connected</h2>
          <p className="mt-3 max-w-xl text-white/85">Get updates on new songs, mantras and devotional content on the temple’s WhatsApp channel.</p>
        </div>
        <a href={WHATSAPP_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-8 font-bold uppercase tracking-wide text-primary-dark transition-transform hover:scale-105">Join the channel</a>
      </div>
    </section>
  );
}
