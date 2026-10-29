import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Clock, Facebook, Instagram, Mail, Youtube } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.81 11.81 0 0 0 12.04 0C5.5 0 .16 5.33.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.33 11.89-11.89 0-3.18-1.24-6.16-3.49-8.41z" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64z" />
    </svg>
  );
}

const SOCIALS = [
  { key: 'youtube', label: 'YouTube', icon: Youtube },
  { key: 'instagram', label: 'Instagram', icon: Instagram },
  { key: 'x', label: 'X', icon: XIcon },
  { key: 'facebook', label: 'Facebook', icon: Facebook },
];

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

// Works out from the current India time whether darshan is open, and the window to show:
// the one we are in, or else the gap until the next opening.
function darshanStatus(now = new Date()) {
  const ist = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const minutes = ist.getHours() * 60 + ist.getMinutes();
  const windows = siteConfig.darshanHours;
  const open = windows.find(([from, to]) => minutes >= toMinutes(from) && minutes < toMinutes(to));
  if (open) return { open: true, range: `${open[0]} - ${open[1]}` };
  const next = windows.find(([from]) => toMinutes(from) > minutes) ?? windows[0];
  const prev = [...windows].reverse().find(([, to]) => toMinutes(to) <= minutes) ?? windows[windows.length - 1];
  return { open: false, range: `${prev[1]} - ${next[0]}` };
}

// Darshan open/closed pill. Hovering or tapping it opens the day's aarti timings.
function DarshanBadge() {
  const [status, setStatus] = useState(() => darshanStatus());
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const pointerRef = useRef(null);
  const listId = useId();
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setStatus(darshanStatus()), 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => { if (!boxRef.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, [open]);

  return (
    <div
      ref={boxRef}
      className="relative"
      onPointerEnter={(event) => { if (event.pointerType === 'mouse') setOpen(true); }}
      onPointerLeave={(event) => { if (event.pointerType === 'mouse') setOpen(false); }}
      onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}
    >
      <button
        type="button"
        onPointerDown={(event) => { pointerRef.current = event.pointerType; }}
        onClick={() => {
          // A mouse has already opened it on hover, so a click keeps it open; touch and keyboard toggle.
          setOpen((value) => (pointerRef.current === 'mouse' ? true : !value));
          pointerRef.current = null;
        }}
        aria-expanded={open}
        aria-controls={listId}
        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-maroon shadow-sm ring-1 ring-black/5 transition-colors hover:ring-primary/60 sm:px-4 sm:text-sm"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${status.open ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status.open ? 'bg-green-600' : 'bg-red-600'}`} />
        </span>
        Darshan {status.open ? 'Open' : 'Closed'}
        <span className="font-medium text-maroon/70">{status.range}</span>
        <ChevronDown size={14} aria-hidden="true" className={`text-maroon/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <div id={listId} className={`absolute right-0 top-full z-50 pt-2 transition-all duration-200 ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <div className="w-72 rounded-2xl border border-gold/60 bg-white p-2 shadow-[0_20px_45px_-15px_rgba(74,26,8,0.35)]">
          <p className="px-3 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary-dark">Daily timings</p>
          <ul>
            {siteConfig.timings.map(([name, time]) => (
              <li key={name} className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm">
                <Clock size={16} className="shrink-0 text-maroon/70" aria-hidden="true" />
                <span className="whitespace-nowrap font-semibold text-primary-dark">{name}</span>
                <span className="ml-auto whitespace-nowrap font-medium text-maroon">{time}</span>
              </li>
            ))}
          </ul>
          <Link to="/darshan" className="mt-1 flex items-center justify-between rounded-xl bg-cream px-3 py-2 text-xs font-semibold text-maroon hover:bg-primary/15">
            Timings change on festival days <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AnnouncementBar() {
  const { contact, social } = siteConfig;
  const socials = SOCIALS.filter(({ key }) => social[key]);

  return (
    <div className="relative z-50 border-b border-primary/20 bg-gradient-to-r from-cream via-[#FFEBD6] to-cream text-maroon">
      {/* Three columns across the full width: email at the left, phone in the centre, darshan status at the right. */}
      <div className="flex min-h-11 items-center justify-between gap-3 px-4 py-1.5 text-sm sm:grid sm:grid-cols-[1fr_auto_1fr] sm:px-8 lg:px-12">
        <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.email}`} className="flex items-center gap-2 justify-self-start transition-colors hover:text-primary-dark">
          <Mail size={18} aria-hidden="true" />
          <span className="hidden lg:inline">{contact.email}</span>
        </a>
        <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${contact.phone}`} className="flex items-center gap-2 justify-self-center font-medium transition-colors hover:text-primary-dark">
          <WhatsAppIcon className="h-[18px] w-[18px] text-[#25D366]" />
          <span className="hidden sm:inline">{contact.phone}</span>
        </a>
        <div className="flex items-center gap-4 justify-self-end">
          <DarshanBadge />
          {socials.length > 0 && (
            <ul className="hidden items-center gap-3 md:flex">
              {socials.map(({ key, label, icon: Icon }) => (
                <li key={key}>
                  <a href={social[key]} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-8 w-8 items-center justify-center rounded-full text-maroon/80 transition-colors hover:bg-white hover:text-primary-dark">
                    <Icon size={17} className="h-[17px] w-[17px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
