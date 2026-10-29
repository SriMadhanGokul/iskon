import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import { CalendarDays, ChevronLeft, ChevronRight, Clock3, Download, ExternalLink, ImageIcon, X } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { DARSHAN_PHOTOS, DARSHAN_TYPES } from '../data/darshans.js';

const STRIP_DAYS = 7;

// Dates are YYYY-MM-DD strings in India time; arithmetic is done at UTC noon so it never slips a day.
const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
const toDate = (iso) => new Date(`${iso}T12:00:00Z`);
const addDays = (iso, days) => {
  const date = toDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
};
const format = (iso, options) => toDate(iso).toLocaleDateString('en-US', { timeZone: 'UTC', ...options });
const isValidDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value ?? '') && !Number.isNaN(toDate(value).getTime());

// Full-screen preview of one photo, with arrows and keys to step through the day's photos.
function Lightbox({ photos, index, onChange, onClose }) {
  const closeRef = useRef(null);
  const photo = photos[index];
  const step = (by) => onChange((index + by + photos.length) % photos.length);

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = overflow; };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') step(-1);
      if (event.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <div role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${photos.length}`} className="fixed inset-0 z-[70] flex flex-col bg-black/90 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white sm:px-6" onClick={(event) => event.stopPropagation()}>
        <p className="text-sm font-semibold">{index + 1} / {photos.length}</p>
        <div className="flex items-center gap-2">
          <a href={photo.full} download className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/20">
            <Download size={16} aria-hidden="true" /><span className="hidden sm:inline">Download</span>
          </a>
          {photo.postUrl && (
            <a href={photo.postUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-white/10 px-4 text-sm font-semibold transition hover:bg-white/20">
              <ExternalLink size={16} aria-hidden="true" /><span className="hidden sm:inline">Original post</span>
            </a>
          )}
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close preview" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
        <img src={photo.full} alt={photo.alt} className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl" onClick={(event) => event.stopPropagation()} />
        {photos.length > 1 && (
          <>
            <button type="button" onClick={(event) => { event.stopPropagation(); step(-1); }} aria-label="Previous photo" className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon shadow-lg transition hover:bg-white sm:left-6">
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <button type="button" onClick={(event) => { event.stopPropagation(); step(1); }} aria-label="Next photo" className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-maroon shadow-lg transition hover:bg-white sm:right-6">
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      {photo.credit && <p className="pb-4 text-center text-xs text-white/60">Photo: {photo.credit}</p>}
    </div>
  );
}

export default function Darshans() {
  const { brandName } = siteConfig;
  const today = todayIST();
  const dateInput = useRef(null);
  const stripRef = useRef(null);
  const [params, setParams] = useSearchParams();

  // Date, darshan type and open photo live in the URL, so a view can be shared or bookmarked.
  const requested = params.get('date');
  const date = isValidDate(requested) && requested <= today ? requested : today;
  const type = DARSHAN_TYPES.some(({ id }) => id === params.get('type')) ? params.get('type') : DARSHAN_TYPES[0].id;
  const photos = DARSHAN_PHOTOS[date]?.[type] ?? [];
  const openIndex = Number(params.get('photo'));
  const lightboxOpen = params.has('photo') && Number.isInteger(openIndex) && openIndex >= 0 && openIndex < photos.length;
  const typeInfo = DARSHAN_TYPES.find(({ id }) => id === type);

  const update = (changes) => {
    const next = { date, type, ...changes };
    const search = new URLSearchParams();
    if (next.date !== today) search.set('date', next.date);
    if (next.type !== DARSHAN_TYPES[0].id) search.set('type', next.type);
    if (next.photo !== undefined && next.photo !== null) search.set('photo', String(next.photo));
    setParams(search, { replace: next.photo !== undefined });
  };
  const goToDate = (iso) => { if (isValidDate(iso) && iso <= today) update({ date: iso }); };

  // Seven days ending a little after the chosen date, but never past today.
  const stripEnd = [addDays(date, 3), today].sort()[0];
  const strip = Array.from({ length: STRIP_DAYS }, (_, i) => addDays(stripEnd, i - STRIP_DAYS + 1));
  const photoCount = `${photos.length} photo${photos.length === 1 ? '' : 's'}`;

  // On narrow screens the strip scrolls sideways; keep the chosen day in view without moving the page.
  useEffect(() => {
    const container = stripRef.current;
    const chip = container?.querySelector('[aria-pressed="true"]');
    if (!chip) return;
    const left = chip.offsetLeft;
    if (left < container.scrollLeft || left + chip.offsetWidth > container.scrollLeft + container.clientWidth) {
      container.scrollLeft = left + chip.offsetWidth - container.clientWidth + 8;
    }
  }, [date]);

  return (
    <>
      <Helmet>
        <title>Darshans – {brandName}</title>
        <meta name="description" content="Browse daily Shringar and Mangala darshan photos by date, open a high-quality preview, and download or visit the original post." />
      </Helmet>

      <header className="relative flex h-[300px] items-end justify-center overflow-hidden rounded-b-3xl text-white sm:h-[375px]">
        <img src="/images/deity/radha-syamasundar-1280.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/40 to-transparent" />
        <div className="relative z-10 px-4 py-10 text-center sm:py-12">
          <h1 className="font-heading text-4xl font-semibold drop-shadow-lg sm:text-6xl">Darshans</h1>
          <nav aria-label="Breadcrumb" className="mt-3">
            <ol className="flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-white/90">
              <li><Link to="/" className="hover:text-gold">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/mandir" className="hover:text-gold">Mandir</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-gold">Darshans</li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="container-page py-6 sm:py-12">
        <div className="relative overflow-hidden rounded-[28px] border border-gold/70 bg-[radial-gradient(circle_at_15%_0%,rgba(255,153,51,0.16),transparent_32%),radial-gradient(circle_at_90%_20%,rgba(184,60,0,0.10),transparent_36%),linear-gradient(135deg,#fff,#FFF8F1)] p-3 shadow-[0_24px_60px_-30px_rgba(74,26,8,0.35)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="hidden items-center gap-2 rounded-full border border-gold/70 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark shadow-sm sm:inline-flex">
                <ImageIcon size={14} aria-hidden="true" /> Darshan Gallery
              </p>
              <div className="flex items-baseline justify-between gap-3 sm:block">
                <h2 className="font-heading text-xl font-semibold text-maroon sm:mt-3 sm:text-4xl">{typeInfo.label} Darshan</h2>
                <p className="text-xs font-semibold text-primary-dark sm:hidden">{photoCount}</p>
              </div>
              <p className="mt-2 hidden leading-7 text-maroon/75 sm:block">Browse daily darshan photos by date, open a high-quality preview, and download or visit the original post.</p>
            </div>

            <div role="radiogroup" aria-label="Darshan type" className="grid grid-cols-2 gap-1.5 rounded-2xl bg-white/80 p-1.5 shadow-inner shadow-maroon/5 lg:min-w-[420px]">
              {DARSHAN_TYPES.map(({ id, label, note }) => {
                const selected = id === type;
                return (
                  <button
                    key={id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => update({ type: id })}
                    className={`rounded-xl px-3 py-2 text-left transition sm:px-5 sm:py-4 ${selected ? 'bg-gradient-to-br from-primary-dark to-primary text-white shadow-[0_10px_24px_-10px_rgba(184,60,0,0.7)]' : 'text-maroon hover:bg-cream'}`}
                  >
                    <span className={`mb-3 hidden h-1.5 w-10 rounded-full sm:block ${selected ? 'bg-white/85' : 'bg-primary/30'}`} />
                    <span className="block text-center text-sm font-bold sm:text-left sm:text-base">{label}</span>
                    <span className={`mt-1 hidden text-xs font-medium sm:block ${selected ? 'text-white/85' : 'text-maroon/60'}`}>{note}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gold/60 bg-white/85 p-2 shadow-sm sm:mt-5 sm:p-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => goToDate(addDays(date, -1))} aria-label="Previous day" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-white text-primary-dark shadow-sm transition hover:bg-primary-dark hover:text-white">
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <div className="relative flex-1 md:flex-none">
                <button
                  type="button"
                  onClick={() => { try { dateInput.current?.showPicker(); } catch { dateInput.current?.focus(); } }}
                  className="flex min-h-10 w-full items-center justify-center gap-2 rounded-full border border-gold/70 bg-cream px-4 py-2 text-sm font-semibold text-maroon shadow-sm transition hover:bg-primary/15 md:min-w-[220px]"
                >
                  <CalendarDays size={16} className="text-primary-dark" aria-hidden="true" />
                  {format(date, { month: 'long', day: 'numeric', year: 'numeric' })}
                </button>
                <input
                  ref={dateInput}
                  type="date"
                  value={date}
                  max={today}
                  onChange={(event) => goToDate(event.target.value)}
                  aria-label="Choose a date"
                  tabIndex={-1}
                  className="pointer-events-none absolute inset-0 opacity-0"
                />
              </div>
              <button type="button" onClick={() => goToDate(addDays(date, 1))} disabled={date >= today} aria-label="Next day" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/70 bg-white text-primary-dark shadow-sm transition hover:bg-primary-dark hover:text-white disabled:pointer-events-none disabled:opacity-40">
                <ChevronRight size={18} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => goToDate(today)} disabled={date === today} className="h-10 shrink-0 rounded-full bg-primary/15 px-4 text-sm font-semibold text-primary-dark transition hover:bg-primary-dark hover:text-white disabled:opacity-60 md:hidden">Today</button>
            </div>
            <div className="hidden items-center gap-3 md:flex">
              <button type="button" onClick={() => goToDate(today)} disabled={date === today} className="rounded-full border border-gold/70 px-4 py-2 text-sm font-semibold text-primary-dark transition hover:bg-primary-dark hover:text-white disabled:pointer-events-none disabled:opacity-50">Today</button>
              <p className="rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary-dark">{photoCount}</p>
            </div>
          </div>

          <div ref={stripRef} className="relative -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {strip.map((day) => {
              const selected = day === date;
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => goToDate(day)}
                  aria-pressed={selected}
                  className={`min-w-[66px] shrink-0 rounded-2xl border px-3 py-2 text-left transition sm:min-w-[78px] ${selected ? 'border-primary-dark bg-primary-dark text-white shadow-[0_10px_24px_-10px_rgba(184,60,0,0.7)]' : 'border-gold/60 bg-white/85 text-maroon hover:bg-primary/15'}`}
                >
                  <span className={`block text-[10px] font-bold uppercase tracking-[0.12em] ${selected ? 'text-white/80' : 'text-primary-dark/80'}`}>{day === today ? 'Today' : format(day, { weekday: 'short' })}</span>
                  <span className="mt-0.5 block text-sm font-bold">{format(day, { month: 'short', day: 'numeric' })}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6">
          {photos.length ? (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, i) => (
                <li key={`${photo.id}-${i}`}>
                  <button type="button" onClick={() => update({ photo: i })} aria-label={`Open photo ${i + 1}: ${photo.alt}`} className="group block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-gold/60 bg-cream shadow-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-dark">
                    <img src={photo.thumb} alt="" loading="lazy" decoding="async" width="640" height="480" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-h-[42vh] items-center justify-center rounded-3xl border border-dashed border-primary/40 bg-primary/5 px-6 py-12 text-center">
              <div className="max-w-sm">
                <p className="mb-2 text-lg font-semibold text-maroon">No darshan images found</p>
                <p className="text-sm text-maroon/70">Try another date or switch between Shringar and Mangala darshan.</p>
              </div>
            </div>
          )}
        </div>

        <p className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-maroon/75">
          <Clock3 size={16} className="text-primary-dark" aria-hidden="true" />
          Planning to visit in person?
          <Link to="/darshan" className="font-semibold text-primary-dark underline underline-offset-4">See darshan and aarti timings</Link>
        </p>
      </section>

      {lightboxOpen && (
        <Lightbox photos={photos} index={openIndex} onChange={(i) => update({ photo: i })} onClose={() => update({ photo: null })} />
      )}
    </>
  );
}
