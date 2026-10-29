import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Building2, ChevronLeft, ChevronRight,
  Flower2, Gift, HandHeart, Heart, Hotel, Music2, MessageCircle, Utensils,
} from 'lucide-react';
import siteConfig from '../data/siteConfig.js';
import { photo } from '../lib/photo.js';
import { SITE_PAGES } from '../data/pages.js';
import BannerSlider from '../components/BannerSlider.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import TempleBento from '../components/TempleBento.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/Reveal.jsx';

const places = [
  { title: 'Gau Seva', text: 'Learn about compassionate cow care and ways to support animal welfare through seva.', icon: HandHeart, image: siteConfig.images.gauSeva, imageAlt: 'Vechur cow photographed in India', credit: siteConfig.imageCredits.gauSeva, to: '/mandir/gaushala' },
  { title: 'Bhoga & prasadam', text: 'A devotional fruit offering, one part of preparing prasadam for temple programmes and visitors.', icon: Utensils, image: siteConfig.images.prasadam, imageAlt: 'Fruit arranged as a devotional offering', credit: siteConfig.imageCredits.prasadam, to: '/activities/food-distribution' },
  { title: 'Harinama Kirtan', text: 'A glimpse of Hare Krishna devotees gathered in devotional music and chanting.', icon: Music2, image: siteConfig.images.kirtan, imageAlt: 'Hare Krishna devotees taking part in kirtan', credit: siteConfig.imageCredits.kirtan, to: '/activities/kirtan' },
  { title: 'Temple Gardens', text: 'A representative garden photo from ISKCON Mayapur; visit information for Gupt Vrindavan Dham is available below.', icon: Flower2, image: siteConfig.images.garden, imageAlt: 'Garden at ISKCON Mayapur', credit: siteConfig.imageCredits.garden, to: '/mandir/garden' },
];

const faqs = [
  { question: 'Where is Gupt Vrindavan Dham?', answer: `The temple is in Jagatpura, Jaipur. The address is ${siteConfig.contact.address}.` },
  { question: 'When can I attend darshan and aarti?', answer: 'Daily worship and class timings are listed below. Please contact the temple before travelling to confirm any festival or seasonal changes.' },
  { question: 'What can visitors do at the Dham?', answer: 'Visitors can attend darshan, join kirtan and spiritual programmes, learn about seva activities, and explore the temple grounds.' },
];

const festivalCards = SITE_PAGES.find(({ path }) => path === '/festivals')?.cards ?? [];

function IconCard({ title, text, index, image, imageAlt, credit, to }) {
  return (
    <StaggerItem as="article" className="card-lift group rounded-3xl border border-gold/80 bg-white p-5 shadow-soft sm:p-6">
      {image && (
        <figure className="-mx-5 -mt-5 mb-5 overflow-hidden rounded-t-3xl sm:-mx-6 sm:-mt-6">
          {to ? (
            <Link to={to} aria-label={`Learn more about ${title}`} className="block">
              <img {...photo(image, '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw')} alt={imageAlt} width="1200" height="800" loading="lazy" decoding="async" className="card-zoom aspect-[16/10] w-full object-cover" />
            </Link>
          ) : (
            <img {...photo(image, '(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw')} alt={imageAlt} width="1200" height="800" loading="lazy" decoding="async" className="card-zoom aspect-[16/10] w-full object-cover" />
          )}
          <figcaption className="bg-cream px-3 py-2 text-[11px] leading-4 text-maroon/75">
            Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{credit.title}</a> by {credit.author} · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.license}</a>
          </figcaption>
        </figure>
      )}
      <div className="mb-6 flex items-center justify-between">
        <span className="font-heading text-sm text-maroon/45">{String(index).padStart(2, '0')}</span>
      </div>
      <h3 className="text-lg font-semibold">{to ? <Link to={to} className="hover:text-saffron-dark">{title}</Link> : title}</h3>
      <p className="mt-2 text-sm leading-6 text-maroon/75">{text}</p>
      {to && <Link to={to} className="btn-outline mt-5 min-h-10 px-4 text-xs">Discover <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></Link>}
    </StaggerItem>
  );
}

function FestivalSlider() {
  const sliderRef = useRef(null);
  const move = (direction) => {
    sliderRef.current?.scrollBy({ left: direction * 360, behavior: 'smooth' });
  };

  return (
    <section className="bg-primary/10 py-16 sm:py-20" aria-labelledby="festival-slider-heading">
      <div className="container-page">
        <Reveal className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Life at the Dham</p>
            <h2 id="festival-slider-heading" className="font-heading text-3xl font-semibold sm:text-4xl">Festival celebrations</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-maroon/75">Explore devotional celebrations throughout the Vaishnava calendar.</p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={() => move(-1)} aria-label="Previous festivals" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-white text-maroon hover:bg-cream"><ChevronLeft size={20} aria-hidden="true" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next festivals" className="flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-white text-maroon hover:bg-cream"><ChevronRight size={20} aria-hidden="true" /></button>
          </div>
        </Reveal>
        <div ref={sliderRef} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4" aria-label="Festival guides">
          {festivalCards.map((festival) => (
            <article key={festival.to} className="card-lift group w-[min(82vw,22rem)] shrink-0 snap-start overflow-hidden rounded-3xl border border-gold/80 bg-white shadow-soft">
              <Link to={festival.to} aria-label={`Explore ${festival.title}`} className="block overflow-hidden">
                <img {...photo(festival.image.src, '(min-width: 640px) 352px, 82vw')} alt={festival.image.alt} width="1200" height="800" loading="lazy" decoding="async" className="card-zoom aspect-[16/10] w-full object-cover" />
              </Link>
              {festival.image.credit && (
                <p className="bg-cream px-3 py-2 text-[11px] leading-4 text-maroon/75">
                  Photo: <a href={festival.image.credit.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{festival.image.credit.title}</a> by {festival.image.credit.author} · <a href={festival.image.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{festival.image.credit.license}</a>
                </p>
              )}
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold">{festival.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-maroon/75">{festival.text}</p>
                <Link to={festival.to} className="btn-outline mt-4 min-h-10 px-4 text-xs">Explore festival <ArrowRight size={15} aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-2 flex justify-center sm:hidden">
          <button type="button" onClick={() => move(1)} className="btn-outline min-h-10 px-4 text-xs">More festivals <ChevronRight size={15} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { stats } = siteConfig;

  useEffect(() => {
    const targetId = window.location.hash.slice(1);
    if (targetId) {
      window.requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView();
      });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{siteConfig.brandName} – Krishna Temple in Jaipur</title>
        <meta name="description" content="Plan a visit to Gupt Vrindavan Dham in Jagatpura, Jaipur. Explore temple spaces, daily worship, spiritual programmes and ways to serve." />
        <meta property="og:title" content={`${siteConfig.brandName}, Jaipur`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1 className="sr-only">{siteConfig.name}, a Krishna temple in Jagatpura, Jaipur</h1>
      <BannerSlider />

      <section id="mandir" className="container-page scroll-mt-24 py-16 sm:py-20">
        <Reveal className="grid items-end gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Welcome to the Dham</p>
            <h2 className="max-w-2xl font-heading text-3xl font-semibold leading-tight sm:text-4xl">A place to gather, learn and serve</h2>
          </div>
          <p className="max-w-xl leading-7 text-maroon/80">Gupt Vrindavan Dham is a growing spiritual and cultural centre in Jaipur. Its programmes bring devotional practice, community service and the teachings of Krishna together.</p>
        </Reveal>
        <Stagger className="mt-8 grid gap-4 rounded-3xl bg-primary p-6 text-maroon shadow-[0_30px_60px_-30px_rgba(184,60,0,0.4)] sm:grid-cols-3 sm:p-8">
          <StaggerItem><p className="font-heading text-3xl font-semibold text-maroon">3.5 lakh</p><p className="mt-1 text-sm text-maroon/80">square feet planned for the temple and cultural centre</p></StaggerItem>
          <StaggerItem className="border-maroon/30 sm:border-l sm:pl-6"><p className="font-heading text-3xl font-semibold text-maroon">Jagatpura</p><p className="mt-1 text-sm text-maroon/80">a spiritual destination in Jaipur, Rajasthan</p></StaggerItem>
          <StaggerItem className="border-maroon/30 sm:border-l sm:pl-6"><p className="font-heading text-3xl font-semibold text-maroon">Daily seva</p><p className="mt-1 text-sm text-maroon/80">worship, learning and service for the community</p></StaggerItem>
        </Stagger>
      </section>

      <section className="bg-white/60 py-16 sm:py-20">
        <div className="container-page">
          <Reveal><SectionHeading title="Discover the Dham" sub="Choose a place or experience to learn more and plan your visit." /></Reveal>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {places.map((place, index) => <IconCard key={place.title} {...place} index={index + 1} />)}
          </Stagger>
        </div>
      </section>

      <section id="facilities" className="container-page scroll-mt-24 py-16 sm:py-20" aria-labelledby="facilities-heading">
        <Reveal>
          <SectionHeading title="Facilities at the Dham" sub="Spaces for guests, kirtan, prasadam and everyday devotional life." />
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Guest House', icon: Hotel, image: 'guestHouse', alt: 'Guest house room' },
            { title: 'Harinam Mandap', icon: Music2, image: 'kirtan', alt: 'Hare Krishna devotees taking part in kirtan' },
            { title: 'Vrindavan Garden', icon: Flower2, image: 'garden', alt: 'Garden at ISKCON Mayapur' },
          ].map(({ title, icon: Icon, image, alt }) => {
            const credit = siteConfig.imageCredits[image];
            return (
              <StaggerItem key={title} className="card-lift group overflow-hidden rounded-3xl border border-gold/80 bg-white shadow-soft">
                <figure className="overflow-hidden">
                  <img {...photo(siteConfig.images[image], '(min-width: 768px) 33vw, 100vw')} alt={alt} width="1200" height="800" loading="lazy" decoding="async" className="card-zoom aspect-[16/10] w-full object-cover" />
                  <figcaption className="bg-cream px-3 py-2 text-[11px] leading-4 text-maroon/75">
                    Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{credit.title}</a> by {credit.author} · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.license}</a>
                  </figcaption>
                </figure>
                <div className="flex items-center gap-3 p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-saffron/15 text-saffron-dark"><Icon size={20} aria-hidden="true" /></span>
                  <h3 className="font-semibold">{title}</h3>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Stagger className="mt-4 flex flex-wrap gap-3">
          {[
            { label: 'Banquet Halls', icon: Building2 },
            { label: 'Rasikam (Pure Sattvic Restaurant)', icon: Utensils },
            { label: 'Hare Krishna Gift Shop', icon: Gift },
            { label: 'Hinganiya Gau Shala', icon: HandHeart },
          ].map(({ label, icon: Icon }) => (
            <StaggerItem key={label} className="inline-flex items-center gap-2 rounded-full border border-gold bg-white px-4 py-2 text-sm font-medium shadow-soft">
              <Icon size={16} className="text-saffron-dark" aria-hidden="true" /> {label}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="programmes" className="container-page scroll-mt-24 pb-16 sm:pb-20" aria-labelledby="programmes-heading">
        <Reveal className="flex flex-col gap-5 rounded-[2rem] bg-maroon p-6 text-cream sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-gold">Programmes</p>
            <h2 id="programmes-heading" className="font-heading text-2xl font-semibold text-white sm:text-3xl">Festivals, bhajans and contests</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { label: 'Kartik Month', to: '/festivals' },
                { label: 'Vaishnav Bhajan', to: '/activities/kirtan' },
                { label: 'Gita Contest', to: '/contact' },
                { label: 'Shubharambh 2025', to: '/contact' },
              ].map(({ label, to }) => (
                <Link key={label} to={to} className="rounded-full border border-gold/50 px-4 py-2 text-sm transition-colors hover:bg-white/10">{label}</Link>
              ))}
            </div>
          </div>
          <a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-primary shrink-0 self-start sm:self-center">
            <MessageCircle size={17} aria-hidden="true" /> Join our WhatsApp community
          </a>
        </Reveal>
      </section>

      <section id="prabhupada" className="container-page scroll-mt-24 py-16 sm:py-20">
        <Reveal className="card-lift group grid overflow-hidden rounded-[2rem] border border-gold bg-cream md:grid-cols-[0.8fr_1.2fr]">
        <figure className="relative min-h-64 overflow-hidden bg-gold/30">
          <img {...photo(siteConfig.images.about, '(min-width: 768px) 460px, 100vw')} alt="Samadhi Mandir of Srila Prabhupada in Mayapur" width="1200" height="800" loading="lazy" decoding="async" className="card-zoom absolute inset-0 h-full w-full object-cover" />
          <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-primary/95 px-3 py-2 text-xs text-maroon backdrop-blur-sm">
            Photo: <a href={siteConfig.imageCredits.about.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.about.title}</a> by {siteConfig.imageCredits.about.author} · <a href={siteConfig.imageCredits.about.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{siteConfig.imageCredits.about.license}</a>
          </figcaption>
        </figure>
          <div className="p-7 sm:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">The inspiration</p>
            <h2 className="font-heading text-3xl font-semibold">A vision rooted in Krishna consciousness</h2>
            <p className="mt-4 leading-7 text-maroon/80">The Dham follows the teachings and devotional mission of Srila Prabhupada. Through worship, study and practical service, it aims to make spiritual life accessible to people and families across Jaipur.</p>
            <Link to="/prabhupada" className="btn-outline mt-6">Explore our programmes <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>

      <section className="bg-saffron/10 py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="grid items-end gap-5 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Be part of something meaningful</p>
              <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Ways to offer seva</h2>
              <p className="mt-3 max-w-2xl leading-7 text-maroon/80">Choose a service close to your heart. Every offering helps support the Dham’s devotional and community programmes.</p>
            </div>
            <Link to="/donate" className="btn-primary">View seva options <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
          <Stagger className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { title: 'Temple development', text: 'Contribute to the continued development of the temple and its shared spaces.', icon: Building2, seva: 'sqft', photoKey: 'hero', alt: 'Main gate of an ISKCON temple in Mayapur, shown as representative temple architecture' },
              { title: 'Anna Daan', text: 'Support prasadam and food-service efforts for visitors and the wider community.', icon: Utensils, seva: 'anna', photoKey: 'prasadam', alt: 'Fruit arranged as a devotional offering' },
              { title: 'Gau Seva', text: 'Help provide care and support for the temple’s cow-protection work.', icon: HandHeart, seva: 'gau', photoKey: 'gauSeva', alt: 'Vechur cow photographed in India' },
            ].map(({ title, text, icon: Icon, seva, photoKey, alt }) => {
              const credit = siteConfig.imageCredits[photoKey];
              return (
              <StaggerItem key={title} className="flex">
                <Link to={`/donate?seva=${seva}`} className="card-lift group flex w-full flex-col overflow-hidden rounded-3xl border border-gold bg-white shadow-soft">
                  <figure className="overflow-hidden">
                    <img {...photo(siteConfig.images[photoKey], '(min-width: 768px) 33vw, 100vw')} alt={alt} width="1200" height="800" loading="lazy" decoding="async" className="card-zoom aspect-[16/10] w-full object-cover" />
                    <figcaption className="bg-cream px-3 py-2 text-[11px] leading-4 text-maroon/75">
                      Photo: <a href={credit.url} target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">{credit.title}</a> by {credit.author} · <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">{credit.license}</a>
                    </figcaption>
                  </figure>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-saffron/15 text-saffron-dark transition-colors duration-300 group-hover:bg-saffron-dark group-hover:text-white"><Icon size={24} aria-hidden="true" /></span>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-maroon/75">{text}</p>
                    <span className="btn-primary mt-5 min-h-10 self-start px-4 text-xs">Donate now <ArrowRight size={15} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" /></span>
                  </div>
                </Link>
              </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <Reveal className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Temple development</p>
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl">A shared offering, one step at a time</h2>
            <p className="mt-4 leading-7 text-maroon/80">Support the ongoing square-foot seva and help bring the temple project closer to completion.</p>
            <Link to="/donate?seva=sqft" className="btn-primary mt-6">Contribute to the project</Link>
          </div>
          <div className="card-lift rounded-3xl border border-gold bg-white p-6 shadow-soft sm:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div><p className="font-semibold">Square Feet Seva</p><p className="mt-1 text-sm text-maroon/70">Temple project progress</p></div>
              <span className="rounded-full bg-saffron/20 px-3 py-1 text-sm font-semibold text-saffron-dark">{Math.round((stats.sqftRaised / stats.sqftTotal) * 100)}%</span>
            </div>
            <ProgressBar value={stats.sqftRaised} total={stats.sqftTotal} />
            <p className="mt-4 text-sm text-maroon/70">{stats.sqftRaised.toLocaleString('en-IN')} of {stats.sqftTotal.toLocaleString('en-IN')} square feet</p>
          </div>
        </Reveal>
      </section>

      <FestivalSlider />

      <section id="activities" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-page">
          <Reveal className="mb-8 grid items-end gap-4 md:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-saffron-dark">Daily life at the Dham</p>
              <h2 className="font-heading text-3xl font-semibold sm:text-4xl">Worship, programmes &amp; notices</h2>
              <p className="mt-3 max-w-2xl leading-7 text-maroon/80">Today&rsquo;s darshan schedule, regular programmes and the latest from the temple, all in one place.</p>
            </div>
            <Link to="/activities" className="btn-outline">All programmes <ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
          <TempleBento />
        </div>
      </section>

      <section className="bg-saffron/10 py-16 sm:py-20">
        <div className="container-page">
          <Reveal><SectionHeading title="Visitor questions" sub="A few helpful details before you make your way to the temple." /></Reveal>
          <Reveal className="mx-auto max-w-3xl divide-y divide-gold/80 rounded-3xl border border-gold bg-white px-5 shadow-soft sm:px-7">
            {faqs.map(({ question, answer }, index) => (
              <details key={question} className="group py-5" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">
                  <span><span className="mr-3 text-sm text-saffron-dark">{String(index + 1).padStart(2, '0')}</span>{question}</span>
                  <span className="text-xl text-saffron-dark transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="max-w-2xl pl-9 pt-3 text-sm leading-6 text-maroon/75">{answer}</p>
              </details>
            ))}
          </Reveal>
          <div className="mt-8 text-center">
            <Link to="/donate" className="btn-outline"><Heart size={16} aria-hidden="true" /> Find a way to serve</Link>
            <span className="ml-3 inline-flex items-center gap-1 text-sm text-maroon/70"><HandHeart size={16} aria-hidden="true" /> You are welcome at the Dham</span>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <Reveal className="relative grid items-center gap-6 overflow-hidden rounded-[2rem] bg-primary px-6 py-10 text-maroon sm:px-10 md:grid-cols-[1fr_auto]">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.45),transparent_65%)]" aria-hidden="true" />
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-maroon/80">Get involved</p>
            <h2 className="font-heading text-3xl font-semibold text-maroon">Share your time in service</h2>
            <p className="mt-3 max-w-2xl leading-7 text-maroon/85">Volunteers help welcome visitors and support educational, devotional and community-service programmes at the Dham.</p>
          </div>
          <Link to="/contact" className="btn-outline justify-self-start md:justify-self-end">Contact the temple <ArrowRight size={16} aria-hidden="true" /></Link>
        </Reveal>
      </section>
    </>
  );
}
