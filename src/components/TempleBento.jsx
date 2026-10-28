import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BookOpen, Clock3, HandHeart, MapPin, Megaphone, Music2, Phone, Utensils } from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { photo } from '../lib/photo.js';
import { Stagger, StaggerItem } from './Reveal.jsx';

const toMinutes = (time) => {
  const [, h, m, period] = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
  return ((Number(h) % 12) + (period.toUpperCase() === 'PM' ? 12 : 0)) * 60 + Number(m);
};

// Minutes since midnight at the temple (IST), whatever the visitor's own time zone.
const templeNow = () => {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (type) => Number(parts.find((p) => p.type === type).value);
  return get('hour') * 60 + get('minute');
};

function useNextTiming() {
  const [now, setNow] = useState(templeNow);
  useEffect(() => {
    const timer = setInterval(() => setNow(templeNow()), 60000);
    return () => clearInterval(timer);
  }, []);
  const index = siteConfig.timings.findIndex(([, time]) => toMinutes(time) > now);
  return index === -1 ? 0 : index;
}

function Credit({ credit }) {
  return (
    <p className="relative mt-3 text-[10px] leading-4 text-cream/70">
      Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">{credit.title}</a> · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">{credit.license}</a>
    </p>
  );
}

// A photo tile: image zooms on hover, text sits on a dark gradient for contrast.
function PhotoTile({ to, image, alt, credit, icon: Icon, title, text, className }) {
  return (
    <StaggerItem className={`card-lift group relative isolate flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-[1.75rem] border border-gold/60 p-6 text-cream ${className}`}>
      <img {...photo(image, '(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw')} alt={alt} width="1200" height="800" loading="lazy" decoding="async" className="card-zoom absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-maroon via-maroon/60 to-maroon/5" aria-hidden="true" />
      <span className="mb-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-gold backdrop-blur-md"><Icon size={21} aria-hidden="true" /></span>
      <h3 className="mt-10 font-heading text-2xl font-semibold text-white">
        <Link to={to} className="after:absolute after:inset-0 after:content-['']">{title}</Link>
      </h3>
      <p className="mt-1.5 max-w-md text-sm leading-6 text-cream/85">{text}</p>
      <ArrowUpRight size={20} className="absolute right-5 top-5 text-gold transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      <Credit credit={credit} />
    </StaggerItem>
  );
}

function TextTile({ to, icon: Icon, title, text, className = '' }) {
  return (
    <StaggerItem className={`card-lift group relative flex flex-col rounded-[1.75rem] border border-gold/70 bg-white/80 p-6 backdrop-blur-sm ${className}`}>
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-saffron/15 text-saffron-dark transition-colors duration-300 group-hover:bg-saffron-dark group-hover:text-white"><Icon size={21} aria-hidden="true" /></span>
      <h3 className="mt-5 text-lg font-semibold">
        <Link to={to} className="after:absolute after:inset-0 after:content-['']">{title}</Link>
      </h3>
      <p className="mt-1.5 flex-1 text-sm leading-6 text-maroon/75">{text}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-saffron-dark">Learn more <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" /></span>
    </StaggerItem>
  );
}

export default function TempleBento() {
  const next = useNextTiming();
  const { timings, announcements, contact, images, imageCredits } = siteConfig;

  return (
    <Stagger className="grid auto-rows-[minmax(13rem,auto)] gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StaggerItem id="visitor-info" className="relative scroll-mt-24 overflow-hidden rounded-[1.75rem] border border-primary/60 bg-primary p-6 text-maroon md:col-span-2 lg:row-span-2 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.4),transparent_65%)]" aria-hidden="true" />
        <div className="relative flex items-center justify-between gap-3">
          <h3 className="flex items-center gap-2 font-heading text-2xl font-semibold text-maroon"><Clock3 size={22} className="text-maroon" aria-hidden="true" /> Daily darshan</h3>
          <span className="rounded-full border border-maroon/40 px-3 py-1 text-xs text-maroon">IST</span>
        </div>
        <ul className="relative mt-5 divide-y divide-white/10">
          {timings.map(([name, time], i) => {
            const isNext = i === next;
            return (
              <li key={name} className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors ${isNext ? 'bg-white/55 text-maroon shadow-[0_0_24px_-6px_rgba(255,255,255,0.6)]' : 'text-maroon/85'}`}>
                <span className="flex items-center gap-2">
                  {isNext && <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-dark opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-primary-dark" /></span>}
                  {name}
                  {isNext && <span className="rounded-full bg-primary/30 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">Next</span>}
                </span>
                <span className="font-medium tabular-nums">{time}</span>
              </li>
            );
          })}
        </ul>
        <p className="relative mt-4 text-xs text-maroon/80">Timings can change on festival days.</p>
      </StaggerItem>

      <PhotoTile
        to="/activities/kirtan"
        image={images.kirtan}
        alt="Hare Krishna devotees taking part in kirtan"
        credit={imageCredits.kirtan}
        icon={Music2}
        title="Harinama Kirtan"
        text="Join devotees in the congregational chanting of the holy names."
        className="md:col-span-2"
      />

      <TextTile to="/activities/education" icon={BookOpen} title="Gita & Bhagavatam" text="Timeless teachings through classes and discussion." />

      <PhotoTile
        to="/annadhan"
        image={images.prasadam}
        alt="Fruit arranged as a devotional offering"
        credit={imageCredits.prasadam}
        icon={Utensils}
        title="Annadhan"
        text="Prasadam and food seva for visitors and the community."
      />

      <StaggerItem className="relative overflow-hidden rounded-[1.75rem] border border-gold/70 bg-gradient-to-br from-white/90 to-gold/30 p-6 backdrop-blur-sm md:col-span-2">
        <h3 className="flex items-center gap-2 font-heading text-xl font-semibold"><Megaphone size={20} className="text-saffron-dark" aria-hidden="true" /> Announcements</h3>
        <ul className="mt-4 space-y-2">
          {announcements.map(({ tag, date, text, to }) => (
            <li key={tag}>
              <Link to={to} className="group flex items-start gap-3 rounded-2xl border border-transparent p-3 transition-colors duration-300 hover:border-saffron/40 hover:bg-white/70">
                <span className="mt-0.5 shrink-0 rounded-full bg-saffron-dark px-2.5 py-1 text-[11px] font-semibold text-white">{date}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{tag}</span>
                  <span className="block text-sm leading-6 text-maroon/75">{text}</span>
                </span>
                <ArrowRight size={16} className="mt-1 shrink-0 text-saffron-dark transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </StaggerItem>

      <PhotoTile
        to="/activities/cow-protection"
        image={images.gauSeva}
        alt="Vechur cow photographed in India"
        credit={imageCredits.gauSeva}
        icon={HandHeart}
        title="Gau Seva"
        text="Compassionate care for cows."
      />

      <StaggerItem className="card-lift relative flex flex-col overflow-hidden rounded-[1.75rem] border border-primary/60 bg-primary p-6 text-maroon">
        <MapPin size={24} className="text-maroon" aria-hidden="true" />
        <h3 className="mt-4 font-heading text-xl font-semibold text-maroon">Visit the Dham</h3>
        <p className="mt-1.5 flex-1 text-sm leading-6 text-maroon/85">{contact.address}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-maroon transition-colors hover:bg-gold">Directions <ArrowUpRight size={15} aria-hidden="true" /></a>
          <a href={`tel:${contact.phoneHref}`} aria-label="Call the temple" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-maroon/40 text-maroon transition-colors hover:bg-white/30"><Phone size={16} aria-hidden="true" /></a>
        </div>
      </StaggerItem>
    </Stagger>
  );
}
