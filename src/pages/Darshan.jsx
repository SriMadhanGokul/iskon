import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import AartiTimings from '../components/AartiTimings.jsx';
import siteConfig from '../data/siteConfig.js';
import { photo } from '../lib/photo.js';

export default function Darshan() {
  const { brandName, contact, images, imageCredits } = siteConfig;
  const credit = imageCredits.about;

  return (
    <>
      <Helmet>
        <title>Darshan and aarti timings – {brandName}</title>
        <meta name="description" content="Daily darshan and aarti timings, and how to visit the Dham." />
      </Helmet>

      <header className="bg-maroon text-cream">
        <div className="container-page py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-gold">Darshan</p>
          <h1 className="font-heading text-3xl font-bold text-white sm:text-5xl">Daily darshan and aarti</h1>
          <p className="mt-4 max-w-2xl leading-7 text-cream/85">Timings are published by the temple. Please call ahead on festival days, when they can change.</p>
        </div>
      </header>

      <section className="container-page grid gap-8 py-12 sm:py-16 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 font-heading text-2xl font-semibold">Aarti timings</h2>
          <AartiTimings />
        </div>
        <figure className="overflow-hidden rounded-3xl border border-gold/70 shadow-soft">
          <img {...photo(images.about, '(min-width: 1024px) 50vw, 100vw')} alt="Samadhi Mandir of Srila Prabhupada in Mayapur" width="1200" height="800" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
          <figcaption className="bg-cream px-3 py-2 text-xs text-maroon/75">
            Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.title}</a> by {credit.author} · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.license}</a>
          </figcaption>
        </figure>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="grid gap-4 rounded-3xl bg-maroon p-6 text-cream sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
          <div>
            <p className="flex items-start gap-2 leading-7"><MapPin size={18} className="mt-1 shrink-0 text-gold" aria-hidden="true" /> {contact.address}</p>
            <p className="mt-2 flex items-center gap-2 text-cream/85"><Phone size={16} className="text-gold" aria-hidden="true" /> {contact.phone}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={contact.mapLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Get directions</a>
            <Link to="/visit" className="btn-secondary">Plan your visit <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
